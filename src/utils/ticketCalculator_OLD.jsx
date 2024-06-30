import _ from 'lodash';

export function calculate(ticketSettings, ticket) {
    if (!ticket) return;
    if (!ticket.points) return;

    try {
        let newTicket = _.cloneDeep(ticket);

        setSystems(newTicket, ticketSettings);

        if (!newTicket.permutations) throw 'Permutations not set';

        let MAX_WIN = 10000;
        if (ticketSettings) MAX_WIN = ticketSettings.TicketSettings.MAX_WIN;

        var permutations = newTicket.permutations,
            stakes = newTicket.stakes,
            systemFactor,
            pointFactor,
            point,
            i,
            j,
            maxWins = 0.0,
            totalPrice = 0.0,
            totalBets = 0;

        //init totaltax
        newTicket.metrics.totaltax = 0;
        newTicket.metrics.wintax = 0;
        newTicket.metrics.bettax = 0;

        newTicket.stakes.netsystems = {};
        newTicket.stakes.netpoints = {};

        applyBetTaxes(newTicket, ticketSettings);

        //01. calculate systems first
        var maxSystemFaxtors = getMaxFactorsPerSystem(newTicket, ticketSettings); //NEW::
        for (let system in newTicket.systems) {
            let systemsCount = newTicket.systems[system];
            //CHANGED IMPORTANT:: from stakes to netstakes
            var systemStake = 0; //RESET HERE NOOB
            if (stakes.netsystems[system]) {
                systemStake = parseFloat(stakes.netsystems[system]);
            } else if (stakes.systems[system]) {
                systemStake = parseFloat(stakes.systems[system]);
            }

            systemFactor = getCombinationsOfSystem(permutations, system, maxSystemFaxtors); //NEW::
            if (!systemFactor || !_isNumber(systemFactor) || systemFactor <= 0) throw 'INVALID_SYSTEM_FACTOR';
            newTicket.systemFactors[system] = systemFactor;

            if (!systemStake || !_isNumber(systemStake)) continue;

            var wins = systemStake * systemFactor;
            maxWins += wins;
            totalPrice += systemsCount * systemStake;
            totalBets += systemsCount;
            newTicket.returns.systems[system] = systemStake * systemFactor;
        }

        //02. add stake of events
        for (j = 0; j < newTicket.points.length; j++) {
            point = newTicket.points[j];
            //CHANGED IMPORTANT:: from stakes to netstakes
            var pointStake = 0;
            if (stakes.netpoints[point.FieldId]) {
                pointStake = parseFloat(stakes.netpoints[point.FieldId]);
            } else if (stakes.points[point.FieldId]) {
                pointStake = parseFloat(stakes.points[point.FieldId]);
            }

            if (!pointStake) continue;
            if (!_isNumber(pointStake)) continue;

            pointFactor = point.Odd;
            if (!pointFactor) throw 'INVALID_POINT_FACTOR';
            if (!_isNumber(pointFactor)) throw 'INVALID_POINT_FACTOR';
            if (pointFactor <= 0) throw 'INVALID_POINT_FACTOR';

            var wins = pointFactor * pointStake;
            maxWins += wins;
            totalPrice += pointStake;
            totalBets += 1;
            newTicket.returns.points[point.FieldId] = pointFactor * pointStake;
        }

        newTicket.metrics.maxWins = Math.min(MAX_WIN, maxWins);
        newTicket.metrics.totalPrice = totalPrice;
        newTicket.metrics.numberOfBets = totalBets;

        //apply win taxes
        applyWinTaxes(newTicket, ticketSettings);

        //set total taxes
        newTicket.metrics.totaltax = newTicket.metrics.bettax + newTicket.metrics.wintax;
        newTicket.metrics.betAmount = totalPrice + newTicket.metrics.bettax;
        newTicket.metrics.netStake = totalPrice;

        return newTicket;
    } catch (error) {
        return null;
    }
}

function setSystems(ticket, ticketSettings) {
    let MAX_ALLOWED_SYSTEM_POINTS = 12;

    if (ticketSettings) {
        MAX_ALLOWED_SYSTEM_POINTS = parseInt(ticketSettings.TicketSettings.MAX_ALLOWED_SYSTEM_POINTS);
    }

    //00. reset systems
    ticket.systems = {};
    ticket.systemsArr = [];
    ticket.systemsMax = 0;

    //01. create permutations
    const permutations = getPermutations(ticket, MAX_ALLOWED_SYSTEM_POINTS);
    ticket.permutations = permutations;

    // //02. get combinations
    const combinations = getCombinations(permutations, ticket, ticketSettings);
    ticket.combinations = combinations;

    // //03. get systems
    const systems = getSystems(permutations);
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

function getPermutations(ticket, MAX_ALLOWED_SYSTEM_POINTS) {
    let results = { codes: [], result: [], counter: 0, system: {} };

    //01. convert ticket.event to  2d Array()
    let eventOdds = _getEventOdds(ticket.points);

    //02. create permutations
    _createPermutations(ticket, eventOdds, results, MAX_ALLOWED_SYSTEM_POINTS);

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

function _createPermutations(ticket, eventOdds, results, MAX_ALLOWED_SYSTEM_POINTS) {
    var h, i, tmp, perm;

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
                    _createPermutations(ticket, tmp, results, MAX_ALLOWED_SYSTEM_POINTS);
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
        len,
        maxWins;

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
            var pWins = ticket.stakes.netsystems[len] || ticket.stakes.systems[len];
            if (pWins && tax.MinimumApply < pWins * combinations[m]) {
                if (!ticket.sumGrossPerMinApply[len]) ticket.sumGrossPerMinApply[len] = 0;
                ticket.sumGrossPerMinApply[len] += pWins * combinations[m];
            }
        }
    }

    return combinations;
}

function getSystems(permutations) {
    let combLen;
    let systems = {};

    for (let m = 0; m < permutations.length; m++) {
        combLen = permutations[m].length;

        if (!systems[combLen]) systems[combLen] = 0;
        systems[combLen] += 1;
    }
    return systems;
}

function applyBetTaxes(ticket, ticketSettings) {
    if (!ticketSettings) return;

    //TAX
    var tax = ticketSettings.Taxes;
    if (!tax || !tax.BetActive) return;

    for (system in ticket.systems) {
        var systemsCount = ticket.systems[system];
        var systemStake = parseFloat(ticket.stakes.systems[system]);

        if (!_isNumber(systemStake)) continue;
        ticket.stakes.netsystems[system] = clearStakeTaxes(systemStake, tax);
        ticket.metrics.bettax += (systemStake - ticket.stakes.netsystems[system]) * systemsCount;
    }

    //02. add stake of events
    for (j = 0; j < ticket.points.length; j++) {
        var point = ticket.points[j];
        var pointStake = parseFloat(ticket.stakes.points[point.FieldId]);

        if (!_isNumber(pointStake)) continue;

        ticket.stakes.netpoints[point.FieldId] = clearStakeTaxes(pointStake, tax);
        ticket.metrics.bettax += pointStake - ticket.stakes.netpoints[point.FieldId];
    }

    ticket.metrics.bettax = _.round(ticket.metrics.bettax, 2);
}

function clearStakeTaxes(stake, tax) {
    //calculate bet taxes
    if (!tax) return stake;
    if (!tax.BetActive) return stake;

    //Find bettax
    var totalStake = stake;
    if (totalStake > 0) {
        var vat = parseFloat(tax.BetAmount);
        var type = tax.BetAmountType;

        if (type == 'Value') {
            return stake - vat;
        } else if (type == 'Percent') {
            if (tax.BetMethod == 'VAT') {
                var vatA = vat / 100;
                var vatB = 1 + vatA;
                var netamount = totalStake / vatB;
                var vatAmount = netamount * vatA;

                return stake - vatAmount;
            } else if (tax.BetMethod == 'Normal') {
                var value = (totalStake / 100) * vat;
                // value = R2((value * 100) / 100); // round 2 decimals
                value = _.round(value, 2);

                return stake - value;
            }
        }
    }

    return stake;
}

//NEW::
//When we cap the ticket at 100k for example
//we need to cap the factors per system
//in order for taxes to work correctly
function getMaxFactorsPerSystem(ticket, ticketSettings) {
    let MAX_WIN = 10000;

    if (ticketSettings) {
        MAX_WIN = ticketSettings.TicketSettings.MAX_WIN;
    }

    var totalCols = 0;
    for (var key in ticket.systems) {
        var stake = parseFloat(ticket.stakes.systems[key]);
        if (!_isNumber(stake)) continue;
        var cols = ticket.systems[key];
        totalCols += cols;
    }
    var capFactorPerCol = MAX_WIN / totalCols;
    var dict = {};
    for (var key in ticket.systems) {
        var stake = parseFloat(ticket.stakes.systems[key]);
        if (!_isNumber(stake)) continue;
        var cols = ticket.systems[key];
        dict[key] = (cols * capFactorPerCol) / stake;
    }
    return dict;
}

function getCombinationsOfSystem(permutations, system, maxSystemFaxtors) {
    //NEW::
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
    if (maxSystemFaxtors[system]) {
        totalFactor = Math.min(totalFactor, maxSystemFaxtors[system]);
    }

    return totalFactor;
}

function applyWinTaxes(ticket, ticketSettings) {
    if (!ticketSettings) return;
    var tax = ticketSettings.Taxes;

    if (!ticket.metrics.maxWins) return;

    //############################################
    if (!tax || tax.WinActive === false) {
        //set bonus only if taxes are not applied
        setBonusParoli(ticket, ticketSettings);
        return;
    }
    //############################################

    var wintaxPerc = tax.WinAmount;
    var type = tax.WinAmountType;
    var minimumApply = tax.MinimumApply;

    //dont apply on wins below minimum apply
    if (ticket.metrics.maxWins < minimumApply) return;

    if (type == 'Value') {
        ticket.metrics.wintax = wintaxPerc;
    } else if (type == 'Percent') {
        var info = [];
        var totalWinTax = 0.0;
        var totalMaxWin = 0.0;
        var totalbonus = 0;
        for (var key in ticket.systems) {
            var system = ticket.systems[key];
            var factor = '';
            if (ticket.systemFactors[key]) {
                factor = ticket.systemFactors[key];
            }

            var stake = '';
            if (ticket.stakes.systems[key]) {
                stake = parseFloat(ticket.stakes.systems[key]);
            }

            if (_isNumber(factor) && _isNumber(stake) && _isNumber(system)) {
                //Get NetStake
                var netStake = parseFloat(stake);
                if (tax.BetActive) {
                    netStake = parseFloat(ticket.stakes.netsystems[key]);
                }

                //Get Winnings
                var potentialWins = ticket.returns.systems[key];

                //Set bonus Paroli
                var bonus = getBonusParoli(ticket, potentialWins, ticketSettings);
                totalbonus += bonus;

                //Get Gross Winninds
                var grossWinnings = potentialWins + bonus;
                var netWins = grossWinnings;
                if (tax.WinMethod == 'OnNet') {
                    grossWinnings -= netStake;
                    netWins = grossWinnings;
                }

                //Get Win tax Value
                var wintax = 0; // (grossWinnings * wintaxPerc) / 100
                var amountForWinTax = 0;

                if (ticket.sumGrossPerMinApply[key]) amountForWinTax = ticket.sumGrossPerMinApply[key];

                if (amountForWinTax) {
                    wintax = (amountForWinTax * wintaxPerc) / 100;
                }

                //Get max wins
                var maxWin = grossWinnings - wintax;

                totalWinTax += wintax;
                totalMaxWin += maxWin;

                info.push(
                    'SYS:' +
                        key +
                        ' -- ODD:' +
                        _.round(factor, 2) +
                        ' STAKE:' +
                        stake +
                        ' NetStake:' +
                        _.round(netStake, 2) +
                        ' PontWins:' +
                        _.round(potentialWins, 2) +
                        ', Bonus ' +
                        _.round(bonus, 2) +
                        ', GrossWins ' +
                        grossWinnings +
                        ', NetWins ' +
                        _.round(netWins, 2) +
                        ', Tax ' +
                        _.round(wintax, 2) +
                        ', MaxWins ' +
                        _.round(maxWin, 2)
                );
            }
        }
        info.push('SYSTEM TOTALS --  totalWinTax:' + _.round(totalWinTax, 2) + ' totalMaxWin:' + _.round(totalMaxWin, 2));

        var totalPointsWinTax = 0.0;
        var totalPointsMaxWin = 0.0;
        for (j = 0; j < ticket.points.length; j++) {
            var point = ticket.points[j];
            var stake = '';
            if (ticket.stakes.points[point.FieldId]) stake = ticket.stakes.points[point.FieldId];

            if (_isNumber(stake)) {
                //Get NetStake
                var netStake = parseFloat(stake);
                if (tax.BetActive) {
                    netStake = ticket.stakes.netpoints[point.FieldId];
                }

                //'Get Winnings
                var potentialWins = netStake * parseFloat(point.Odd);

                //Set bonus Paroli
                var bonus = 0;

                //Get Gross Winninds
                var grossWinnings = potentialWins + bonus;
                if (tax.WinMethod == 'OnNet') {
                    grossWinnings -= netStake;
                }

                //Get Win tax Value
                var wintax = 0;
                if (grossWinnings > tax.MinimumApply) {
                    wintax = (grossWinnings * wintaxPerc) / 100;
                }

                //Get max wins
                var maxWin = grossWinnings - wintax;

                totalPointsWinTax += wintax;
                totalPointsMaxWin += maxWin;

                info.push(
                    'Point:' +
                        point.FieldId +
                        ' -- NetStake:' +
                        _.round(netStake, 2) +
                        ' x odd:' +
                        point.Odd +
                        ' = Pont.Wins:' +
                        _.round(potentialWins, 2) +
                        ' WinTax:' +
                        _.round(wintax, 2) +
                        ' MaxWins:' +
                        _.round(maxWin, 2)
                );
            }
        }
        info.push('POINTS TOTALS --  totalWinTax:' + _.round(totalPointsWinTax, 2) + ' totalMaxWin:' + _.round(totalPointsMaxWin, 2));

        ticket.metrics.wintax = _.round(totalPointsWinTax + totalWinTax, 2);
        ticket.metrics.maxWins = _.round(totalPointsMaxWin + totalMaxWin, 2);
        ticket.metrics.bonusParoliExtra = totalbonus;

        ticket.WinTaxInfo = info.join('\n');
    }
}

function setBonusParoli(ticket, ticketSettings) {
    //calculate paroli Bonus when not taxes
    ticket.metrics.bonusParoliExtra = 0;
    // var settings = window.ticketModel && window.ticketModel.ticketSettings ? window.ticketModel.ticketSettings.TicketSettings : null;
    // if (!settings) return;

    let MAX_WIN = 10000;
    if (ticketSettings) MAX_WIN = ticketSettings.TicketSettings.MAX_WIN;

    var bp = ticketSettings.BonusParoli;
    if (bp && bp.Active && ticket.type == 'Multiple') {
        var pointsCount = ticket.points.filter(function (p) {
            return p.Odd >= bp.MinOdd;
        }).length; //IMPORTANT::

        var categ = 0;
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

        var totalWins = ticket.metrics.maxWins;
        if (categ > 0 && totalWins > 0) {
            //add bonus
            var extra = (totalWins * categ) / 100;
            if (extra > bp.MaxWinBonus) extra = bp.MaxWinBonus; //IMPORTANT::
            var total = totalWins + extra;

            ticket.metrics.bonusParoliCateg = categ;
            ticket.metrics.bonusParoliExtra = _.round(extra, 2); // add this to maxWin display

            //add to max wins
            ticket.metrics.maxWins += extra;
            ticket.metrics.maxWins = Math.min(ticket.metrics.maxWins, MAX_WIN);
        }
    }
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
    return Number(n) === n;
}
