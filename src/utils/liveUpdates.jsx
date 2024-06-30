import _ from 'lodash';

export function getUpdatedMarkets(updateObj, markets) {
    const OddFieldProps = {
        Active: 'a',
        Value: 'v',
        Map: {
            a: 'Active',
            v: 'Value',
        },
    };

    let updatedMarkets = _.cloneDeep(markets);
    if (!updatedMarkets) updatedMarkets = [];

    // Removes
    if (updateObj.R) {
        updateObj.R.forEach((remove) => {
            const foundIndex = updatedMarkets.findIndex((m) => remove[0] == m.MarketTypeId && remove[1] == m.SpecialOddsValue);
            if (foundIndex > -1) updatedMarkets.splice(foundIndex, 1);
        });
    }

    // Appends
    if (updateObj.A) {
        updateObj.A.forEach((append) => {
            const foundIndex = updatedMarkets.findIndex((m) => append.MarketTypeId == m.MarketTypeId && append.SpecialOddsValue == m.SpecialOddsValue);
            if (foundIndex > -1) {
                updatedMarkets[foundIndex] = append;
            } else {
                updatedMarkets.push(append);
            }
        });
    }

    // Updates
    if (updateObj.U) {
        updateObj.U.forEach((update) => {
            if (!update) return;
            const updateId = update.Id;
            const SBV = update.SBV;
            if (!updateId) return;

            let foundMarket = updatedMarkets.find((m) => updateId == m.MarketTypeId && SBV == m.SpecialOddsValue);
            if (!foundMarket) return; //this is problem if not found we should have them

            //set ACTIVE Flag only not other properties
            if (update.AC !== null && update.AC !== undefined) {
                foundMarket.Active = update.AC;
            }

            let fields = foundMarket.MarketFields;
            if (!fields) fields = foundMarket.MarketFields = {};

            //remove fields
            if (update.R) {
                for (let j = 0; j < update.R.length; j++) {
                    const fieldId = update.R[j];

                    const findIndex = fields.findIndex((f) => fieldId == f.FieldId);
                    if (findIndex > -1) {
                        fields.splice(findIndex, 1);
                    }
                }
            }

            //add fields
            if (update.A) {
                for (let key in update.A) {
                    const foundC = update.A.find((o) => o.FieldId == key);
                    if (foundC) fields.push(foundC);
                }
            }

            //update fields
            if (update.U) {
                for (let j = 0; j < update.U.length; j++) {
                    var fieldChange = update.U[j];
                    if (!fieldChange) continue;

                    const key = fieldChange.K;
                    if (!key) continue;

                    const fieldChanges = fieldChange.C;
                    if (!fieldChanges) continue;
                    if (!fieldChanges.length) continue;

                    for (let k = 0; k < fieldChanges.length; k++) {
                        const prop = fieldChanges[k];

                        const field = OddFieldProps.Map[prop.P];
                        if (!field) continue;

                        const value = prop.V;

                        let foundF = fields.find((o) => o.FieldId == key);

                        if (foundF) {
                            foundF[field] = value;
                        }
                    }
                }
            }
        });
    }

    // alives
    if (updateObj.Alives && updateObj.Alives.length) {
        for (let i = 0; i < updatedMarkets.length; i++) {
            const index = updateObj.Alives.findIndex((al) => al[0] == updatedMarkets[i].MarketTypeId && al[1] == updatedMarkets[i].SpecialOddsValue);
            if (index < 0) {
                updatedMarkets.splice(i, 1);
                i--;
            }
        }
    }

    return updatedMarkets;
}

export function getUpdatedHeaders(updateObj, liveState) {
    const HeaderProps = {
        Active: 'a',
        AwayBatter: 'b',
        Balls: 'c',
        Bases: 'd',
        Batter: 'e',
        BetStatus: 'f',
        BetStopReason: 'g',
        Booked: 'h',
        ClearedScore: 'i',
        ClockStopped: 'j',
        CornersHome: 'k',
        CornersAway: 'l',
        CurrentCtTeam: 'm',
        Dismissals: 'n',
        EarlyBetStatus: 'o',
        GameScore: 'p',
        HomeBatter: 'q',
        MatchId: 'r',
        MatchTime: 's',
        MatchTimeExtended: 't',
        Msgnr: 'u',
        Outs: 'v',
        PenaltyRuns: 'w',
        RedCardsHome: 'x',
        RedCardsAway: 'y',
        RemainingTime: 'z',
        RemainingTimeInPeriod: 'a1',
        RemainingBowls: 'b1',
        Score: 'c1',
        Server: 'd1',
        SourceId: 'e1',
        Status: 'f1',
        Strikes: 'g1',
        SuspendHome: 'h1',
        SuspendAway: 'i1',
        TieBreak: 'j1',
        YellowCardsHome: 'k1',
        YellowCardsAway: 'l1',
        YellowRedCardsHome: 'm1',
        YellowRedCardsAway: 'n1',
        SetScores: 'o1',
        Messages: 'p1',
        Map: {
            a: 'Active',
            b: 'AwayBatter',
            c: 'Balls',
            d: 'Bases',
            e: 'Batter',
            f: 'BetStatus',
            g: 'BetStopReason',
            h: 'Booked',
            i: 'ClearedScore',
            j: 'ClockStopped',
            k: 'CornersHome',
            l: 'CornersAway',
            m: 'CurrentCtTeam',
            n: 'Dismissals',
            o: 'EarlyBetStatus',
            p: 'GameScore',
            q: 'HomeBatter',
            r: 'MatchId',
            s: 'MatchTime',
            t: 'MatchTimeExtended',
            u: 'Msgnr',
            v: 'Outs',
            w: 'PenaltyRuns',
            x: 'RedCardsHome',
            y: 'RedCardsAway',
            z: 'RemainingTime',
            a1: 'RemainingTimeInPeriod',
            b1: 'RemainingBowls',
            c1: 'Score',
            d1: 'Server',
            e1: 'SourceId',
            f1: 'Status',
            g1: 'Strikes',
            h1: 'SuspendHome',
            i1: 'SuspendAway',
            j1: 'TieBreak',
            k1: 'YellowCardsHome',
            l1: 'YellowCardsAway',
            m1: 'YellowRedCardsHome',
            n1: 'YellowRedCardsAway',
            o1: 'SetScores',
            p1: 'Messages',
        },
    };

    let updatedHeaders = {};

    for (let i = 0; i < updateObj.length; i++) {
        const update = updateObj[i];
        const evId = update.Id;
        const changes = update.C;
        const match = liveState[evId];

        if (!evId) continue;
        if (!match) continue;
        if (!changes) continue;
        if (!changes.length) continue;
        if (!match.Header) continue;

        let matchHeader = updatedHeaders[evId] ? updatedHeaders[evId] : { ...match.Header };

        for (let j = 0; j < changes.length; j++) {
            const field = changes[j];
            if (!field) continue;
            const prop = HeaderProps.Map[field.P];
            const value = field.V;
            if (!prop) continue;

            //update header
            matchHeader[prop] = value;
        }

        updatedHeaders[evId] = matchHeader;
    }

    return updatedHeaders;
}

export function getEventsToAdd(updateObj, liveState, incompleteDataEvents, isInfo = false) {
    let eventsToAdd = [];
    let incompleteEvents = [];

    updateObj.forEach((eventUpdate) => {
        const eventId = eventUpdate.MatchId ? eventUpdate.MatchId : eventUpdate.Info ? eventUpdate.Info.MatchId : null;
        if (!eventId) return;

        let newEvent = {};

        if (liveState[eventId]) newEvent = { ...liveState[eventId] };
        else if (incompleteDataEvents[eventId]) newEvent = { ...incompleteDataEvents[eventId] };
        else
            newEvent = {
                Info: {},
                Header: {},
                Markets: [],
                MatchId: eventId,
            };

        if (isInfo) newEvent.Info = { ...newEvent.Info, ...eventUpdate };
        else if (eventUpdate.Info) newEvent.Info = { ...newEvent.Info, ...eventUpdate.Info };

        if (eventUpdate.Header) newEvent.Header = { ...eventUpdate.Header };
        if (eventUpdate.Markets) newEvent.Markets = [...eventUpdate.Markets];

        // If all properties are filled, then add it to the liveState, else add it to incomplete
        if (newEvent.Header && !_.isEmpty(newEvent.Header) && newEvent.Info && !_.isEmpty(newEvent.Info)) {
            eventsToAdd.push(newEvent);
        } else {
            newEvent.addedOn = new Date();
            incompleteEvents.push(newEvent);
        }
    });

    return { add: eventsToAdd, incomplete: incompleteEvents };
}
