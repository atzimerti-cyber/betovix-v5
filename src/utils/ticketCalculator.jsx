import _ from 'lodash';

export function calculate(ticketSettings, ticket, amounts) {
    if (!ticket) return;
    if (!ticket.points) return;

    try {
        let newTicket = _.cloneDeep(ticket);

        //01.clearTicket
        clear(newTicket);

        //02.set systems
        setSystems(newTicket, ticketSettings);

        //04.set betType
        //setTicketType(newTicket);

        //05.stakes
        setStakes(newTicket, amounts);

        if (!newTicket.permutations) throw 'Permutations not set';
        var permutations = newTicket.permutations,
            stakes = newTicket.stakes,
            pointFactor,
            event,
            point,
            i,
            j,
            maxWins = 0.0,
            maxWinsNet = 0.0,
            totalPrice = 0.0,
            totalBets = 0;
        //06.init totaltax
        newTicket.metrics.totaltax = 0;
        newTicket.metrics.wintax = 0;
        newTicket.metrics.bettax = 0;
        newTicket.stakes.netsystems = {};
        newTicket.stakes.netpoints = {};

        //01. calculate systems first
        var totalFactor = 0;
        for (let system in newTicket.systems) {
            let systemsCount = newTicket.systems[system];
            ////CHANGED IMPORTANT:: from stakes to netstakes
            var systemStake = parseFloat(stakes.systems[system]); //0; //RESET HERE NOOB

            if (stakes.systems[system]) {
                systemStake = parseFloat(stakes.systems[system]);
            }

            var systemFactor = getCombinationsOfSystem(permutations, system); //NEW::
            if (!systemFactor || !_isNumber(systemFactor) || systemFactor <= 0) throw 'INVALID_SYSTEM_FACTOR';
            newTicket.systemFactors[system] = systemFactor;

            if (!systemStake || !_isNumber(systemStake)) continue;

            maxWins += systemStake * systemFactor;

            totalPrice += systemsCount * systemStake;
            totalBets += systemsCount;
            newTicket.returns.systems[system] = systemStake * systemFactor;

            totalFactor += systemFactor;
        }

        //02. add stake of events
        for (j = 0; j < newTicket.points.length; j++) {
            point = newTicket.points[j];
            let pointStake = parseFloat(stakes.points[point.FieldId]);

            if (!pointStake || !_isNumber(pointStake)) continue;
            pointFactor = point.Odd;
            if (!pointFactor || !_isNumber(pointFactor) || pointFactor <= 0) throw 'INVALID_POINT_FACTOR';

            var wins = pointFactor * pointStake;
            maxWins += wins;
            totalPrice += pointStake;
            totalBets += 1;
            newTicket.returns.points[point.FieldId] = pointFactor * pointStake;

            totalFactor += pointFactor;
        }

        let MAX_WIN = 10000;
        if (ticketSettings) MAX_WIN = ticketSettings.TicketSettings.MAX_WIN;

        newTicket.metrics.maxWins = Math.min(MAX_WIN, maxWins);
        newTicket.metrics.totalPrice = totalPrice;
        newTicket.metrics.numberOfBets = totalBets;

        var totalStakedCols = totalStakedColumns(newTicket);
        // var totalOdds = getTotalOdds(newTicket);
        var pricePerCol = totalPrice / totalStakedCols;
        // var winPerCol = newTicket.metrics.maxWins / totalStakedCols;

        var tax = ticketSettings.Taxes;
        var bettaxPerc = 0;
        var netStake = totalPrice;
        var bettax = 0;
        if (tax && tax.BetActive) {
            bettaxPerc = 1 + tax.BetAmount / 100;
            netStake = totalPrice / bettaxPerc;
            bettax = totalPrice - netStake;
        }

        var potentialWins;
        if (newTicket.type == 'System') {
            potentialWins = totalFactor * pricePerCol;
        } else if (newTicket.type == 'Multiple') {
            potentialWins = totalFactor * netStake;
        } else {
            potentialWins = newTicket.metrics.maxWins;
        }

        var bonus = getBonusParoli(newTicket, potentialWins, ticketSettings);
        var grossWins = Math.min(MAX_WIN, potentialWins + bonus);
        var finalWins = grossWins;
        var wintax = 0;
        if (tax && tax.WinActive) {
            var netWins = grossWins;
            if (tax.WinMethod === 'OnNet') {
                netWins = netWins - netStake;
            }
            if (netWins / totalStakedCols > tax.MinimumApply) {
                wintax = (netWins * tax.WinAmount) / 100;
            }
            finalWins = grossWins - wintax;
        }

        newTicket.metrics.totaltax = bettax + wintax;
        newTicket.metrics.betAmount = totalPrice;
        newTicket.metrics.netStake = netStake;
        newTicket.metrics.grossWins = grossWins;

        newTicket.metrics.potentialWins = potentialWins;
        newTicket.metrics.bettax = bettax;
        newTicket.metrics.wintax = wintax;
        newTicket.metrics.finalWins = finalWins;
        newTicket.metrics.bonusParoliExtra = bonus;

        return newTicket;
    } catch (error) {
        return null;
    }
}

function totalStakedColumns(ticket) {
    var total = 0;

    for (var sys in ticket.stakes.systems) {
        var stake = ticket.stakes.systems[sys];
        if (_isNumber(stake)) {
            var cols = ticket.systems[sys];
            total += cols;
        }
    }
    for (let j = 0; j < ticket.points.length; j++) {
        var point = ticket.points[j];
        var pointStake = parseFloat(ticket.stakes.points[point.FieldId]);
        if (!_isNumber(pointStake)) continue;

        total += 1;
    }
    return total;
}

function getTotalOdds(ticket) {
    var total = 0;

    for (var sys in ticket.stakes.systems) {
        var stake = ticket.stakes.systems[sys];
        if (_isNumber(stake)) {
            var odds = ticket.systemFactors[sys];
            total += odds;
        }
    }
    for (let j = 0; j < ticket.points.length; j++) {
        var point = ticket.points[j];
        var pointStake = parseFloat(ticket.stakes.points[point.FieldId]);
        if (!_isNumber(pointStake)) continue;

        total += point.Odd;
    }
    return total;
}

function clear(ticket) {
    if (!ticket.metrics) return;

    ticket.metrics.numberOfBets = 0;
    ticket.metrics.maxWins = 0;
    ticket.metrics.totalPrice = 0;
    ticket.stakes.points = {};
    ticket.stakes.systems = {};
    ticket.stakes.total = 0;
    ticket.returns.points = {};
    ticket.returns.systems = {};
    ticket.systemFactors = {};
    ticket.permutations = [];
    ticket.combinations = {};
    ticket.systems = {};
}

function setSystems(ticket, ticketSettings) {
    var permutations, combinations, systems;

    //01. create permutations
    permutations = getPermutations(ticket, ticketSettings);
    ticket.permutations = permutations;

    //02. get combinations
    combinations = getCombinations(permutations, ticket, ticketSettings);
    ticket.combinations = combinations;

    //03. get systems
    systems = getSystems(permutations);
    ticket.systems = systems;
    ticket.systemsArr = Object.keys(ticket.systems).map(function (i, j) {
        return parseInt(i);
    });
    ticket.systemsMax = ticket.systemsArr.pop();

    removeInvalidStakes(ticket);
}

function removeInvalidStakes(ticket) {
    //remove stakes from systems
    for (var i in ticket.stakes.systems) {
        if (!ticket.systems[i]) {
            delete ticket.stakes.systems[i];
        }
    }

    //remove stakes from points
    for (var i in ticket.stakes.points) {
        var found = ticket.points.find(function (p) {
            return p.FieldId == i;
        });
        if (!found) {
            delete ticket.stakes.points[i];
        }
    }
}

function getPermutations(ticket, ticketSettings) {
    var results = { codes: [], result: [], counter: 0, system: {} },
        eventOdds;

    //01. convert ticket.event to  2d Array()
    eventOdds = _getEventOdds(ticket.points);

    //02. create permutations
    _createPermutations(ticket, eventOdds, results, ticketSettings);

    return results.result;
}

function _getEventOdds(points) {
    var i,
        matchId,
        results = [],
        result,
        matches = points.map(function (p) {
            return p.MatchId;
        }),
        matchIds = matches.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }); //Distinct Matches

    for (i = 0; i < matchIds.length; i++) {
        matchId = matchIds[i];
        result = points
            .filter(function (p) {
                return p.MatchId == matchId;
            })
            .map(function (p) {
                return p.Odd;
            });

        results.push(result);
    }
    return results;
}

function _createPermutations(ticket, eventOdds, results, ticketSettings) {
    var h, i, tmp, perm;

    let MAX_ALLOWED_SYSTEM_POINTS = 12;

    if (ticketSettings) {
        MAX_ALLOWED_SYSTEM_POINTS = parseInt(ticketSettings.TicketSettings.MAX_ALLOWED_SYSTEM_POINTS);
    }

    //IMPORTANT WHEN 12 POINTS PASSED CALC ONLY MULTIPLE
    if (ticket.points.length > MAX_ALLOWED_SYSTEM_POINTS) {
        var perm = [];
        for (i = 0; i < eventOdds.length; i++) {
            perm.push(eventOdds[i][0]);
        }
        results.result.push(perm);
    } else {
        if (eventOdds.length > 0) {
            for (h = 0; h < eventOdds.length; h++) {
                for (i = 0; i < eventOdds[h].length; i++) {
                    results.codes[results.counter] = eventOdds[h][i];
                    perm = results.codes.slice(0);
                    results.result.push(perm);

                    tmp = eventOdds.slice(h);
                    tmp.shift();
                    results.counter++;
                    _createPermutations(ticket, tmp, results, ticketSettings);
                }
            }
        }
        results.codes.pop();
        results.counter--;
    }
}

function getCombinations(permutations, ticket, ticketSettings) {
    if (!permutations) throw 'permutation are not valid';

    var numberOfCombinations = permutations.length,
        m,
        n,
        combinations = new Array(),
        minCombId = 0,
        maxCombId = 0,
        minOdd,
        maxOdd,
        len;

    ticket.sumGrossPerMinApply = {}; //IMPORTANT:: NEW:: //used to get correct value for min apply in Taxes

    //03. calculate factor and combinations
    for (m = 0; m < numberOfCombinations; m++) {
        len = permutations[m].length;

        for (n = 0; n < len; n++) {
            if (n == 0) combinations[m] = 1.0;
            combinations[m] *= permutations[m][n];
        }
        if (m == 0 || combinations[m] < minOdd) {
            minOdd = combinations[m];
            minCombId = m;
        }
        if (m == 0 || combinations[m] > maxOdd) {
            maxOdd = combinations[m];
            maxCombId = m;
        }

        //NEW
        var tax = ticketSettings.Taxes;
        if (tax) {
            var pWins = ticket.stakes.netsystems ? ticket.stakes.netsystems[len] : ticket.stakes.systems[len];
            if (pWins && tax.MinimumApply < pWins * combinations[m]) {
                if (!ticket.sumGrossPerMinApply[len]) ticket.sumGrossPerMinApply[len] = 0;
                ticket.sumGrossPerMinApply[len] += pWins * combinations[m];
            }
        }
    }

    return combinations;
}

function getSystems(permutations) {
    var combLen,
        systems = {};

    for (let m = 0; m < permutations.length; m++) {
        combLen = permutations[m].length;

        if (!systems[combLen]) systems[combLen] = 0;
        systems[combLen] += 1;
    }
    return systems;
}

function setStakes(ticket, amounts) {
    //01.initControls
    //initControls();

    //set system stakes, get total stake
    let total = 0;
    if (ticket.type === 'System') {
        Object.keys(amounts).forEach((key) => {
            if (!ticket.systems[key]) return;
            const amount = parseFloat(amounts[key]);

            total = total + ticket.systems[key] * amount;

            ticket.stakes.systems[key] = amount;
        });
    } else if (ticket.type === 'Multiple') {
        Object.keys(amounts).forEach((key) => {
            total = total + amounts[key];
        });
        ticket.stakes.systems[ticket.systemsMax] = total;
    } else {
        Object.keys(amounts).forEach((key) => {
            total = total + amounts[key];

            ticket.stakes.points[key] = amounts[key];
        });
    }
    ticket.stakes.total = total;
}

function getCombinationsOfSystem(permutations, system, maxSystemFaxtors) {
    if (!permutations) throw 'permutation are not valid';
    if (!system) throw 'system is not valid';

    var numberOfCombinations = permutations.length,
        m,
        n,
        totalFactor = 0.0,
        len,
        permVal,
        combination;

    //01. calculate factor for all combinations of the system
    for (m = 0; m < numberOfCombinations; m++) {
        len = permutations[m].length;
        if (system != len) continue;
        combination = 1.0;
        for (n = 0; n < len; n++) {
            permVal = parseFloat(permutations[m][n]);
            combination *= permVal;
        }

        totalFactor += combination;
    }
    //NEW::
    if (maxSystemFaxtors && maxSystemFaxtors[system]) {
        totalFactor = Math.min(totalFactor, maxSystemFaxtors[system]);
    }

    return totalFactor;
}

function getBonusParoli(ticket, potentialWins, ticketSettings) {
    //calculate paroli Bonus
    var bp = ticketSettings.BonusParoli;
    if (bp && bp.Active && ticket.type == 'Multiple' && potentialWins > 0) {
        var categ = 0;

        var pointsCount = ticket.points.filter(function (p) {
            return p.Odd >= bp.MinOdd;
        }).length; //IMPORTANT::

        var max = 0;
        for (var key in bp.Multiples) {
            var parts = key.split(' ');
            var num = parseInt(parts[1]);
            if (num > max) max = num;
        }
        if (pointsCount > max) {
            categ = bp.Multiples['Multiple ' + max];
        } else {
            categ = bp.Multiples['Multiple ' + pointsCount];
        }

        if (categ > 0) {
            //add bonus
            var extra = (potentialWins * categ) / 100;
            if (extra > bp.MaxWinBonus) extra = bp.MaxWinBonus; //IMPORTANT::

            ticket.metrics.bonusParoliExtra = _.round(extra, 2);
            ticket.metrics.bonusParoliCateg = categ;
            return extra;
        }
    }
    ticket.metrics.bonusParoliExtra = 0;
    ticket.metrics.bonusParoliCateg = 0;
    return 0;
}

function _isNumber(n) {
    n = parseFloat(n);
    return Number(n) === n;
}
