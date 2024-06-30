// POST https://sportsapi.pick500.net:60009/api/Pregame/PostData?action=events_per_league&lang=en&siteid=0

const eventsPerLeague = [
    {
        MatchId: 172503652,
        Info: {
            AwayTeamId: 1280,
            AwayTeamName: {
                langValues: {},
                International: 'Girona FC',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-27T15:00:00',
            ExtraInfo: {},
            HomeTeamId: 1289,
            HomeTeamName: {
                langValues: {},
                International: 'UD Las Palmas',
            },
            MatchId: 172503652,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172503652,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172503652014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1725036521401',
                        FieldTypeId: 1,
                        Value: 4.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.27,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1725036521402',
                        FieldTypeId: 2,
                        Value: 3.89,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.89,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1725036521403',
                        FieldTypeId: 3,
                        Value: 1.79,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.79,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1725036522401',
                        FieldTypeId: 1,
                        Value: 4.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.25,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1725036522402',
                        FieldTypeId: 2,
                        Value: 2.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.29,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1725036522403',
                        FieldTypeId: 3,
                        Value: 2.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.28,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1725036522501',
                        FieldTypeId: 1,
                        Value: 1.58,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.58,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1725036522502',
                        FieldTypeId: 2,
                        Value: 1.53,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.53,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1725036522503',
                        FieldTypeId: 3,
                        Value: 1.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.2,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1725036527601',
                        FieldTypeId: 1,
                        Value: 4.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1725036527602',
                        FieldTypeId: 2,
                        Value: 1.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.22,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172503652220501',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172503652220502',
                        FieldTypeId: 2,
                        Value: 11.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.8,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172503652220601',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172503652220602',
                        FieldTypeId: 2,
                        Value: 11.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172503652220701',
                        FieldTypeId: 1,
                        Value: 1.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.22,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172503652220702',
                        FieldTypeId: 2,
                        Value: 4.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.35,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172503652221001',
                        FieldTypeId: 1,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172503652221002',
                        FieldTypeId: 2,
                        Value: 3.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172503652221101',
                        FieldTypeId: 1,
                        Value: 1.69,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.69,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172503652221102',
                        FieldTypeId: 2,
                        Value: 2.19,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.19,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172503652221301',
                        FieldTypeId: 1,
                        Value: 2.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.7,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172503652221302',
                        FieldTypeId: 2,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172503652226001',
                        FieldTypeId: 1,
                        Value: 1.34,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.34,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172503652226002',
                        FieldTypeId: 2,
                        Value: 3.01,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.01,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2.5)',
                        },
                        FieldId: '172503652226201',
                        FieldTypeId: 1,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2.5)',
                        },
                        FieldId: '172503652226202',
                        FieldTypeId: 2,
                        Value: 5.88,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.88,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172503652229501',
                        FieldTypeId: 1,
                        Value: 2.03,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.03,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172503652229502',
                        FieldTypeId: 2,
                        Value: 3.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172503652229503',
                        FieldTypeId: 3,
                        Value: 3.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.62,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202296,
                MarketTypeId: 2296,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2)',
                        },
                        FieldId: '172503652229601',
                        FieldTypeId: 1,
                        Value: 1.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.38,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2)',
                        },
                        FieldId: '172503652229602',
                        FieldTypeId: 2,
                        Value: 6.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-2)',
                        },
                        FieldId: '172503652229603',
                        FieldTypeId: 3,
                        Value: 5.03,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.03,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172503652230401',
                        FieldTypeId: 1,
                        Value: 9.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.45,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172503652230402',
                        FieldTypeId: 2,
                        Value: 1.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.25,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172503652230403',
                        FieldTypeId: 3,
                        Value: 5.71,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.71,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172503652231301',
                        FieldTypeId: 1,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172503652231302',
                        FieldTypeId: 2,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172503652231501',
                        FieldTypeId: 1,
                        Value: 2.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.5,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172503652231502',
                        FieldTypeId: 2,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                ],
            },
            {
                MarketId: 17250365202317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172503652231701',
                        FieldTypeId: 1,
                        Value: 5.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172503652231702',
                        FieldTypeId: 2,
                        Value: 1.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.12,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1725036522056001',
                        FieldTypeId: 1,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1725036522056002',
                        FieldTypeId: 2,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1725036522056003',
                        FieldTypeId: 3,
                        Value: 1.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.24,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1725036522056101',
                        FieldTypeId: 1,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1725036522056102',
                        FieldTypeId: 2,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                ],
            },
            {
                MarketId: 172503652020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1725036522056201',
                        FieldTypeId: 1,
                        Value: 1.65,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.65,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1725036522056202',
                        FieldTypeId: 2,
                        Value: 2.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.24,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1509,
        Extra: {
            SmallId: 564451,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441096,
        Info: {
            AwayTeamId: 486,
            AwayTeamName: {
                langValues: {},
                International: 'Villarreal',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-05T17:15:00',
            ExtraInfo: {},
            HomeTeamId: 1273,
            HomeTeamName: {
                langValues: {},
                International: 'Celta de Vigo',
            },
            MatchId: 172441096,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441096,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441096014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724410961401',
                        FieldTypeId: 1,
                        Value: 2.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.28,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724410961402',
                        FieldTypeId: 2,
                        Value: 3.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724410961403',
                        FieldTypeId: 3,
                        Value: 2.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.97,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724410962401',
                        FieldTypeId: 1,
                        Value: 2.69,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.69,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724410962402',
                        FieldTypeId: 2,
                        Value: 2.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724410962403',
                        FieldTypeId: 3,
                        Value: 3.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.32,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724410962501',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724410962502',
                        FieldTypeId: 2,
                        Value: 1.52,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.52,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724410962503',
                        FieldTypeId: 3,
                        Value: 1.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.4,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724410967601',
                        FieldTypeId: 1,
                        Value: 3.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.7,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724410967602',
                        FieldTypeId: 2,
                        Value: 1.26,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.26,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441096220601',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441096220602',
                        FieldTypeId: 2,
                        Value: 11.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441096220701',
                        FieldTypeId: 1,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441096220702',
                        FieldTypeId: 2,
                        Value: 4.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441096221001',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441096221002',
                        FieldTypeId: 2,
                        Value: 3.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.55,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441096221101',
                        FieldTypeId: 1,
                        Value: 1.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441096221102',
                        FieldTypeId: 2,
                        Value: 2.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.23,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441096221301',
                        FieldTypeId: 1,
                        Value: 2.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441096221302',
                        FieldTypeId: 2,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441096231301',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441096231302',
                        FieldTypeId: 2,
                        Value: 3.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441096231501',
                        FieldTypeId: 1,
                        Value: 2.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441096231502',
                        FieldTypeId: 2,
                        Value: 1.53,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.53,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109602317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441096231701',
                        FieldTypeId: 1,
                        Value: 5.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441096231702',
                        FieldTypeId: 2,
                        Value: 1.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.13,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724410962056001',
                        FieldTypeId: 1,
                        Value: 1.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724410962056002',
                        FieldTypeId: 2,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724410962056003',
                        FieldTypeId: 3,
                        Value: 1.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.62,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724410962056101',
                        FieldTypeId: 1,
                        Value: 1.68,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.68,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724410962056102',
                        FieldTypeId: 2,
                        Value: 2.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.18,
                        },
                    },
                ],
            },
            {
                MarketId: 172441096020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724410962056201',
                        FieldTypeId: 1,
                        Value: 1.56,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.56,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724410962056202',
                        FieldTypeId: 2,
                        Value: 2.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.43,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1147,
        Extra: {
            SmallId: 562638,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441097,
        Info: {
            AwayTeamId: 490,
            AwayTeamName: {
                langValues: {},
                International: 'Atletico Madrid',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-04T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 514,
            HomeTeamName: {
                langValues: {},
                International: 'Mallorca',
            },
            MatchId: 172441097,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441097,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441097014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724410971401',
                        FieldTypeId: 1,
                        Value: 3.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.73,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724410971402',
                        FieldTypeId: 2,
                        Value: 3.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724410971403',
                        FieldTypeId: 3,
                        Value: 2.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.13,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724410972401',
                        FieldTypeId: 1,
                        Value: 4.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724410972402',
                        FieldTypeId: 2,
                        Value: 2.01,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.01,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724410972403',
                        FieldTypeId: 3,
                        Value: 2.69,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.69,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724410972501',
                        FieldTypeId: 1,
                        Value: 1.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724410972502',
                        FieldTypeId: 2,
                        Value: 1.67,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.67,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724410972503',
                        FieldTypeId: 3,
                        Value: 1.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.2,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724410977601',
                        FieldTypeId: 1,
                        Value: 4.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.9,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724410977602',
                        FieldTypeId: 2,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441097220501',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441097220502',
                        FieldTypeId: 2,
                        Value: 8.02,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.02,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441097220601',
                        FieldTypeId: 1,
                        Value: 1.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.12,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441097220602',
                        FieldTypeId: 2,
                        Value: 6.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.35,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441097220701',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441097220702',
                        FieldTypeId: 2,
                        Value: 2.84,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.84,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441097221001',
                        FieldTypeId: 1,
                        Value: 1.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.72,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441097221002',
                        FieldTypeId: 2,
                        Value: 2.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.12,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441097221101',
                        FieldTypeId: 1,
                        Value: 2.34,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.34,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441097221102',
                        FieldTypeId: 2,
                        Value: 1.61,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.61,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441097221301',
                        FieldTypeId: 1,
                        Value: 4.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441097221302',
                        FieldTypeId: 2,
                        Value: 1.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.22,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441097231301',
                        FieldTypeId: 1,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441097231302',
                        FieldTypeId: 2,
                        Value: 2.57,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.57,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441097231501',
                        FieldTypeId: 1,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441097231502',
                        FieldTypeId: 2,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                ],
            },
            {
                MarketId: 17244109702317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441097231701',
                        FieldTypeId: 1,
                        Value: 8.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441097231702',
                        FieldTypeId: 2,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724410972056001',
                        FieldTypeId: 1,
                        Value: 1.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.7,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724410972056002',
                        FieldTypeId: 2,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724410972056003',
                        FieldTypeId: 3,
                        Value: 1.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.29,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724410972056101',
                        FieldTypeId: 1,
                        Value: 2.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.6,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724410972056102',
                        FieldTypeId: 2,
                        Value: 1.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.5,
                        },
                    },
                ],
            },
            {
                MarketId: 172441097020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724410972056201',
                        FieldTypeId: 1,
                        Value: 2.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724410972056202',
                        FieldTypeId: 2,
                        Value: 1.81,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.81,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1107,
        Extra: {
            SmallId: 562639,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441103,
        Info: {
            AwayTeamId: 505,
            AwayTeamName: {
                langValues: {},
                International: 'Granada',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-05T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 500,
            HomeTeamName: {
                langValues: {},
                International: 'Sevilla',
            },
            MatchId: 172441103,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441103,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441103014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411031401',
                        FieldTypeId: 1,
                        Value: 1.53,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.53,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411031402',
                        FieldTypeId: 2,
                        Value: 4.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.29,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411031403',
                        FieldTypeId: 3,
                        Value: 6.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.12,
                        },
                    },
                ],
            },
            {
                MarketId: 172441103024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411032401',
                        FieldTypeId: 1,
                        Value: 1.94,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.94,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411032402',
                        FieldTypeId: 2,
                        Value: 2.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411032403',
                        FieldTypeId: 3,
                        Value: 6.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.0,
                        },
                    },
                ],
            },
            {
                MarketId: 172441103025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411032501',
                        FieldTypeId: 1,
                        Value: 1.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.13,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411032502',
                        FieldTypeId: 2,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411032503',
                        FieldTypeId: 3,
                        Value: 1.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.72,
                        },
                    },
                ],
            },
            {
                MarketId: 172441103076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411037601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411037602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441103220501',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441103220502',
                        FieldTypeId: 2,
                        Value: 11.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441103220601',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441103220602',
                        FieldTypeId: 2,
                        Value: 9.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.8,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441103220701',
                        FieldTypeId: 1,
                        Value: 1.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.25,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441103220702',
                        FieldTypeId: 2,
                        Value: 4.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.0,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441103221001',
                        FieldTypeId: 1,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441103221002',
                        FieldTypeId: 2,
                        Value: 3.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.1,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441103221101',
                        FieldTypeId: 1,
                        Value: 1.78,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.78,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441103221102',
                        FieldTypeId: 2,
                        Value: 2.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.04,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441103221301',
                        FieldTypeId: 1,
                        Value: 2.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.97,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441103221302',
                        FieldTypeId: 2,
                        Value: 1.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441103231301',
                        FieldTypeId: 1,
                        Value: 1.34,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.34,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441103231302',
                        FieldTypeId: 2,
                        Value: 3.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441103231501',
                        FieldTypeId: 1,
                        Value: 2.57,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.57,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441103231502',
                        FieldTypeId: 2,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110302317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441103231701',
                        FieldTypeId: 1,
                        Value: 6.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441103231702',
                        FieldTypeId: 2,
                        Value: 1.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.11,
                        },
                    },
                ],
            },
            {
                MarketId: 172441103020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411032056001',
                        FieldTypeId: 1,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411032056002',
                        FieldTypeId: 2,
                        Value: 1.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.23,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411032056003',
                        FieldTypeId: 3,
                        Value: 2.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.44,
                        },
                    },
                ],
            },
            {
                MarketId: 172441103020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411032056201',
                        FieldTypeId: 1,
                        Value: 1.91,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.91,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411032056202',
                        FieldTypeId: 2,
                        Value: 1.89,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.89,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1133,
        Extra: {
            SmallId: 562640,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441104,
        Info: {
            AwayTeamId: 1288,
            AwayTeamName: {
                langValues: {},
                International: 'UD Almeria',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-05T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 513,
            HomeTeamName: {
                langValues: {},
                International: 'Rayo Vallecano',
            },
            MatchId: 172441104,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441104,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441104014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411041401',
                        FieldTypeId: 1,
                        Value: 1.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.6,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411041402',
                        FieldTypeId: 2,
                        Value: 4.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411041403',
                        FieldTypeId: 3,
                        Value: 5.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.6,
                        },
                    },
                ],
            },
            {
                MarketId: 172441104024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411042401',
                        FieldTypeId: 1,
                        Value: 2.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411042402',
                        FieldTypeId: 2,
                        Value: 2.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411042403',
                        FieldTypeId: 3,
                        Value: 4.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.9,
                        },
                    },
                ],
            },
            {
                MarketId: 172441104025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411042501',
                        FieldTypeId: 1,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411042502',
                        FieldTypeId: 2,
                        Value: 1.52,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.52,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411042503',
                        FieldTypeId: 3,
                        Value: 1.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.72,
                        },
                    },
                ],
            },
            {
                MarketId: 172441104076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411047601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411047602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441104220501',
                        FieldTypeId: 1,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441104220502',
                        FieldTypeId: 2,
                        Value: 10.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 10.62,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441104220601',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441104220602',
                        FieldTypeId: 2,
                        Value: 9.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441104220701',
                        FieldTypeId: 1,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441104220702',
                        FieldTypeId: 2,
                        Value: 3.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.8,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441104221001',
                        FieldTypeId: 1,
                        Value: 1.41,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.41,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441104221002',
                        FieldTypeId: 2,
                        Value: 2.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.9,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441104221101',
                        FieldTypeId: 1,
                        Value: 1.84,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.84,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441104221102',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441104221301',
                        FieldTypeId: 1,
                        Value: 3.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.11,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441104221302',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441104231301',
                        FieldTypeId: 1,
                        Value: 1.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441104231302',
                        FieldTypeId: 2,
                        Value: 3.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.0,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441104231501',
                        FieldTypeId: 1,
                        Value: 2.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.62,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441104231502',
                        FieldTypeId: 2,
                        Value: 1.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110402317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441104231701',
                        FieldTypeId: 1,
                        Value: 6.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441104231702',
                        FieldTypeId: 2,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                ],
            },
            {
                MarketId: 172441104020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411042056001',
                        FieldTypeId: 1,
                        Value: 1.16,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.16,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411042056002',
                        FieldTypeId: 2,
                        Value: 1.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.25,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411042056003',
                        FieldTypeId: 3,
                        Value: 2.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.28,
                        },
                    },
                ],
            },
            {
                MarketId: 172441104020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411042056201',
                        FieldTypeId: 1,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411042056202',
                        FieldTypeId: 2,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1129,
        Extra: {
            SmallId: 562641,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441105,
        Info: {
            AwayTeamId: 515,
            AwayTeamName: {
                langValues: {},
                International: 'Real Betis',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-05T15:00:00',
            ExtraInfo: {},
            HomeTeamId: 511,
            HomeTeamName: {
                langValues: {},
                International: 'Osasuna',
            },
            MatchId: 172441105,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441105,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441105014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411051401',
                        FieldTypeId: 1,
                        Value: 2.69,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.69,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411051402',
                        FieldTypeId: 2,
                        Value: 3.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411051403',
                        FieldTypeId: 3,
                        Value: 2.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.7,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411052401',
                        FieldTypeId: 1,
                        Value: 3.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411052402',
                        FieldTypeId: 2,
                        Value: 2.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411052403',
                        FieldTypeId: 3,
                        Value: 3.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.23,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411052501',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411052502',
                        FieldTypeId: 2,
                        Value: 1.64,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.64,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411052503',
                        FieldTypeId: 3,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411057601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411057602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441105220501',
                        FieldTypeId: 1,
                        Value: 1.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441105220502',
                        FieldTypeId: 2,
                        Value: 8.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.62,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441105220601',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441105220602',
                        FieldTypeId: 2,
                        Value: 7.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.5,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441105220701',
                        FieldTypeId: 1,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441105220702',
                        FieldTypeId: 2,
                        Value: 3.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441105221001',
                        FieldTypeId: 1,
                        Value: 1.59,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.59,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441105221002',
                        FieldTypeId: 2,
                        Value: 2.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.36,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441105221101',
                        FieldTypeId: 1,
                        Value: 2.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.11,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441105221102',
                        FieldTypeId: 2,
                        Value: 1.74,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.74,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441105221301',
                        FieldTypeId: 1,
                        Value: 3.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.8,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441105221302',
                        FieldTypeId: 2,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441105231301',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441105231302',
                        FieldTypeId: 2,
                        Value: 2.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.7,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441105231501',
                        FieldTypeId: 1,
                        Value: 2.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.97,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441105231502',
                        FieldTypeId: 2,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110502317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441105231701',
                        FieldTypeId: 1,
                        Value: 7.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441105231702',
                        FieldTypeId: 2,
                        Value: 1.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.07,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411052056001',
                        FieldTypeId: 1,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411052056002',
                        FieldTypeId: 2,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411052056003',
                        FieldTypeId: 3,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724411052056101',
                        FieldTypeId: 1,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724411052056102',
                        FieldTypeId: 2,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                ],
            },
            {
                MarketId: 172441105020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411052056201',
                        FieldTypeId: 1,
                        Value: 1.84,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.84,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411052056202',
                        FieldTypeId: 2,
                        Value: 1.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.96,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1120,
        Extra: {
            SmallId: 562642,
            SmallCode: '',
        },
    },
    {
        MatchId: 172441108,
        Info: {
            AwayTeamId: 2659,
            AwayTeamName: {
                langValues: {},
                International: 'Deportivo Alaves',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-05-05T19:30:00',
            ExtraInfo: {},
            HomeTeamId: 491,
            HomeTeamName: {
                langValues: {},
                International: 'Valencia',
            },
            MatchId: 172441108,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172441108,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172441108014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411081401',
                        FieldTypeId: 1,
                        Value: 2.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411081402',
                        FieldTypeId: 2,
                        Value: 3.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.12,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411081403',
                        FieldTypeId: 3,
                        Value: 4.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.18,
                        },
                    },
                ],
            },
            {
                MarketId: 172441108024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724411082401',
                        FieldTypeId: 1,
                        Value: 2.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724411082402',
                        FieldTypeId: 2,
                        Value: 1.92,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.92,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724411082403',
                        FieldTypeId: 3,
                        Value: 4.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.8,
                        },
                    },
                ],
            },
            {
                MarketId: 172441108025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411082501',
                        FieldTypeId: 1,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411082502',
                        FieldTypeId: 2,
                        Value: 1.74,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.74,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411082503',
                        FieldTypeId: 3,
                        Value: 1.41,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.41,
                        },
                    },
                ],
            },
            {
                MarketId: 172441108076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411087601',
                        FieldTypeId: 1,
                        Value: 6.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411087602',
                        FieldTypeId: 2,
                        Value: 1.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.11,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441108220501',
                        FieldTypeId: 1,
                        Value: 1.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.11,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441108220502',
                        FieldTypeId: 2,
                        Value: 6.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.7,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172441108220601',
                        FieldTypeId: 1,
                        Value: 1.16,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.16,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172441108220602',
                        FieldTypeId: 2,
                        Value: 5.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441108220701',
                        FieldTypeId: 1,
                        Value: 1.56,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.56,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441108220702',
                        FieldTypeId: 2,
                        Value: 2.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172441108221001',
                        FieldTypeId: 1,
                        Value: 1.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.97,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172441108221002',
                        FieldTypeId: 2,
                        Value: 1.83,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.83,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441108221101',
                        FieldTypeId: 1,
                        Value: 2.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441108221102',
                        FieldTypeId: 2,
                        Value: 1.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.48,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172441108221301',
                        FieldTypeId: 1,
                        Value: 5.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172441108221302',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172441108231301',
                        FieldTypeId: 1,
                        Value: 1.56,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.56,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172441108231302',
                        FieldTypeId: 2,
                        Value: 2.33,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.33,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172441108231501',
                        FieldTypeId: 1,
                        Value: 3.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.7,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172441108231502',
                        FieldTypeId: 2,
                        Value: 1.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.25,
                        },
                    },
                ],
            },
            {
                MarketId: 17244110802317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172441108231701',
                        FieldTypeId: 1,
                        Value: 9.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172441108231702',
                        FieldTypeId: 2,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                ],
            },
            {
                MarketId: 172441108020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724411082056001',
                        FieldTypeId: 1,
                        Value: 1.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724411082056002',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724411082056003',
                        FieldTypeId: 3,
                        Value: 1.76,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.76,
                        },
                    },
                ],
            },
            {
                MarketId: 172441108020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724411082056201',
                        FieldTypeId: 1,
                        Value: 2.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.25,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724411082056202',
                        FieldTypeId: 2,
                        Value: 1.64,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.64,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1092,
        Extra: {
            SmallId: 562643,
            SmallCode: '',
        },
    },
    {
        MatchId: 172459999,
        Info: {
            AwayTeamId: 504,
            AwayTeamName: {
                langValues: {},
                International: 'Getafe',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-27T17:15:00',
            ExtraInfo: {},
            HomeTeamId: 1288,
            HomeTeamName: {
                langValues: {},
                International: 'UD Almeria',
            },
            MatchId: 172459999,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172459999,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172459999014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724599991401',
                        FieldTypeId: 1,
                        Value: 2.68,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.68,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724599991402',
                        FieldTypeId: 2,
                        Value: 3.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.32,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724599991403',
                        FieldTypeId: 3,
                        Value: 2.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.66,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724599992401',
                        FieldTypeId: 1,
                        Value: 3.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724599992402',
                        FieldTypeId: 2,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724599992403',
                        FieldTypeId: 3,
                        Value: 3.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.28,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724599992501',
                        FieldTypeId: 1,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724599992502',
                        FieldTypeId: 2,
                        Value: 1.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724599992503',
                        FieldTypeId: 3,
                        Value: 1.34,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.34,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724599997601',
                        FieldTypeId: 1,
                        Value: 4.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724599997602',
                        FieldTypeId: 2,
                        Value: 1.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.18,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172459999220501',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172459999220502',
                        FieldTypeId: 2,
                        Value: 9.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172459999220601',
                        FieldTypeId: 1,
                        Value: 1.09,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.09,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172459999220602',
                        FieldTypeId: 2,
                        Value: 7.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.5,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172459999220701',
                        FieldTypeId: 1,
                        Value: 1.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172459999220702',
                        FieldTypeId: 2,
                        Value: 3.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.22,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172459999221001',
                        FieldTypeId: 1,
                        Value: 1.56,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.56,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172459999221002',
                        FieldTypeId: 2,
                        Value: 2.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.43,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172459999221101',
                        FieldTypeId: 1,
                        Value: 2.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172459999221102',
                        FieldTypeId: 2,
                        Value: 1.77,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.77,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172459999221301',
                        FieldTypeId: 1,
                        Value: 3.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.72,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172459999221302',
                        FieldTypeId: 2,
                        Value: 1.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.28,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172459999226001',
                        FieldTypeId: 1,
                        Value: 1.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.12,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172459999226002',
                        FieldTypeId: 2,
                        Value: 5.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.35,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2.5)',
                        },
                        FieldId: '172459999226201',
                        FieldTypeId: 1,
                        Value: 1.01,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.01,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2.5)',
                        },
                        FieldId: '172459999226202',
                        FieldTypeId: 2,
                        Value: 11.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.49,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172459999229501',
                        FieldTypeId: 1,
                        Value: 1.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.51,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172459999229502',
                        FieldTypeId: 2,
                        Value: 5.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.96,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172459999229503',
                        FieldTypeId: 3,
                        Value: 4.01,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.01,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902296,
                MarketTypeId: 2296,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2)',
                        },
                        FieldId: '172459999229601',
                        FieldTypeId: 1,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2)',
                        },
                        FieldId: '172459999229602',
                        FieldTypeId: 2,
                        Value: 14.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 14.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-2)',
                        },
                        FieldId: '172459999229603',
                        FieldTypeId: 3,
                        Value: 7.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172459999230401',
                        FieldTypeId: 1,
                        Value: 5.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.9,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172459999230402',
                        FieldTypeId: 2,
                        Value: 1.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.5,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172459999230403',
                        FieldTypeId: 3,
                        Value: 4.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.11,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172459999230501',
                        FieldTypeId: 1,
                        Value: 14.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 14.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172459999230502',
                        FieldTypeId: 2,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172459999230503',
                        FieldTypeId: 3,
                        Value: 7.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172459999231301',
                        FieldTypeId: 1,
                        Value: 1.42,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.42,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172459999231302',
                        FieldTypeId: 2,
                        Value: 2.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.73,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172459999231501',
                        FieldTypeId: 1,
                        Value: 2.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.95,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172459999231502',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                ],
            },
            {
                MarketId: 17245999902317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172459999231701',
                        FieldTypeId: 1,
                        Value: 7.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172459999231702',
                        FieldTypeId: 2,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724599992056001',
                        FieldTypeId: 1,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724599992056002',
                        FieldTypeId: 2,
                        Value: 1.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724599992056003',
                        FieldTypeId: 3,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724599992056101',
                        FieldTypeId: 1,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724599992056102',
                        FieldTypeId: 2,
                        Value: 1.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.9,
                        },
                    },
                ],
            },
            {
                MarketId: 172459999020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724599992056201',
                        FieldTypeId: 1,
                        Value: 1.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724599992056202',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1523,
        Extra: {
            SmallId: 548116,
            SmallCode: '',
        },
    },
    {
        MatchId: 172460162,
        Info: {
            AwayTeamId: 513,
            AwayTeamName: {
                langValues: {},
                International: 'Rayo Vallecano',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-28T19:30:00',
            ExtraInfo: {},
            HomeTeamId: 486,
            HomeTeamName: {
                langValues: {},
                International: 'Villarreal',
            },
            MatchId: 172460162,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172460162,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172460162014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724601621401',
                        FieldTypeId: 1,
                        Value: 1.74,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.74,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724601621402',
                        FieldTypeId: 2,
                        Value: 3.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724601621403',
                        FieldTypeId: 3,
                        Value: 4.68,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.68,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724601622401',
                        FieldTypeId: 1,
                        Value: 2.33,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.33,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724601622402',
                        FieldTypeId: 2,
                        Value: 2.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724601622403',
                        FieldTypeId: 3,
                        Value: 4.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.4,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724601622501',
                        FieldTypeId: 1,
                        Value: 1.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724601622502',
                        FieldTypeId: 2,
                        Value: 1.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724601622503',
                        FieldTypeId: 3,
                        Value: 1.56,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.56,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724601627601',
                        FieldTypeId: 1,
                        Value: 4.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724601627602',
                        FieldTypeId: 2,
                        Value: 1.19,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.19,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172460162220501',
                        FieldTypeId: 1,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172460162220502',
                        FieldTypeId: 2,
                        Value: 10.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 10.62,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172460162220601',
                        FieldTypeId: 1,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172460162220602',
                        FieldTypeId: 2,
                        Value: 9.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172460162220701',
                        FieldTypeId: 1,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172460162220702',
                        FieldTypeId: 2,
                        Value: 3.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.8,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172460162221001',
                        FieldTypeId: 1,
                        Value: 1.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.38,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172460162221002',
                        FieldTypeId: 2,
                        Value: 2.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.95,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172460162221101',
                        FieldTypeId: 1,
                        Value: 1.84,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.84,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172460162221102',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172460162221301',
                        FieldTypeId: 1,
                        Value: 3.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172460162221302',
                        FieldTypeId: 2,
                        Value: 1.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.38,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172460162226001',
                        FieldTypeId: 1,
                        Value: 1.03,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.03,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172460162226002',
                        FieldTypeId: 2,
                        Value: 9.46,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.46,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17246016202295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172460162229501',
                        FieldTypeId: 1,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172460162229502',
                        FieldTypeId: 2,
                        Value: 11.26,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.26,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172460162229503',
                        FieldTypeId: 3,
                        Value: 5.99,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.99,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172460162230401',
                        FieldTypeId: 1,
                        Value: 3.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.12,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172460162230402',
                        FieldTypeId: 2,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172460162230403',
                        FieldTypeId: 3,
                        Value: 3.53,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.53,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172460162230501',
                        FieldTypeId: 1,
                        Value: 6.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.18,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172460162230502',
                        FieldTypeId: 2,
                        Value: 1.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172460162230503',
                        FieldTypeId: 3,
                        Value: 4.89,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.89,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202306,
                MarketTypeId: 2306,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-3.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-3)',
                        },
                        FieldId: '172460162230601',
                        FieldTypeId: 1,
                        Value: 14.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 14.38,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (3)',
                        },
                        FieldId: '172460162230602',
                        FieldTypeId: 2,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (3)',
                        },
                        FieldId: '172460162230603',
                        FieldTypeId: 3,
                        Value: 7.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.5,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172460162231301',
                        FieldTypeId: 1,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172460162231302',
                        FieldTypeId: 2,
                        Value: 2.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.97,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172460162231501',
                        FieldTypeId: 1,
                        Value: 2.65,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.65,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172460162231502',
                        FieldTypeId: 2,
                        Value: 1.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.44,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016202317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172460162231701',
                        FieldTypeId: 1,
                        Value: 6.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172460162231702',
                        FieldTypeId: 2,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724601622056001',
                        FieldTypeId: 1,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724601622056002',
                        FieldTypeId: 2,
                        Value: 1.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.28,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724601622056003',
                        FieldTypeId: 3,
                        Value: 2.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.05,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724601622056101',
                        FieldTypeId: 1,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724601622056102',
                        FieldTypeId: 2,
                        Value: 3.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.45,
                        },
                    },
                ],
            },
            {
                MarketId: 172460162020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724601622056201',
                        FieldTypeId: 1,
                        Value: 1.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.8,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724601622056202',
                        FieldTypeId: 2,
                        Value: 2.01,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.01,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1523,
        Extra: {
            SmallId: 548205,
            SmallCode: '',
        },
    },
    {
        MatchId: 172460169,
        Info: {
            AwayTeamId: 500,
            AwayTeamName: {
                langValues: {},
                International: 'Sevilla',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-28T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 515,
            HomeTeamName: {
                langValues: {},
                International: 'Real Betis',
            },
            MatchId: 172460169,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172460169,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172460169014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724601691401',
                        FieldTypeId: 1,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724601691402',
                        FieldTypeId: 2,
                        Value: 3.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724601691403',
                        FieldTypeId: 3,
                        Value: 3.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.63,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724601692401',
                        FieldTypeId: 1,
                        Value: 2.65,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.65,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724601692402',
                        FieldTypeId: 2,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724601692403',
                        FieldTypeId: 3,
                        Value: 4.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.0,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724601692501',
                        FieldTypeId: 1,
                        Value: 1.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.23,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724601692502',
                        FieldTypeId: 2,
                        Value: 1.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724601692503',
                        FieldTypeId: 3,
                        Value: 1.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.44,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724601697601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724601697602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172460169220501',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172460169220502',
                        FieldTypeId: 2,
                        Value: 9.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172460169220601',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172460169220602',
                        FieldTypeId: 2,
                        Value: 8.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.0,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172460169220701',
                        FieldTypeId: 1,
                        Value: 1.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172460169220702',
                        FieldTypeId: 2,
                        Value: 3.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.25,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172460169221001',
                        FieldTypeId: 1,
                        Value: 1.54,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.54,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172460169221002',
                        FieldTypeId: 2,
                        Value: 2.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.48,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172460169221101',
                        FieldTypeId: 1,
                        Value: 2.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172460169221102',
                        FieldTypeId: 2,
                        Value: 1.78,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.78,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172460169221301',
                        FieldTypeId: 1,
                        Value: 3.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172460169221302',
                        FieldTypeId: 2,
                        Value: 1.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.29,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172460169226001',
                        FieldTypeId: 1,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172460169226002',
                        FieldTypeId: 2,
                        Value: 7.79,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.79,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17246016902295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172460169229501',
                        FieldTypeId: 1,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172460169229502',
                        FieldTypeId: 2,
                        Value: 8.67,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.67,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172460169229503',
                        FieldTypeId: 3,
                        Value: 4.99,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.99,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172460169230401',
                        FieldTypeId: 1,
                        Value: 4.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172460169230402',
                        FieldTypeId: 2,
                        Value: 1.75,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.75,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172460169230403',
                        FieldTypeId: 3,
                        Value: 3.59,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.59,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172460169230501',
                        FieldTypeId: 1,
                        Value: 9.42,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.42,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172460169230502',
                        FieldTypeId: 2,
                        Value: 1.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172460169230503',
                        FieldTypeId: 3,
                        Value: 5.99,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.99,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172460169231301',
                        FieldTypeId: 1,
                        Value: 1.42,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.42,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172460169231302',
                        FieldTypeId: 2,
                        Value: 2.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.73,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172460169231501',
                        FieldTypeId: 1,
                        Value: 2.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.95,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172460169231502',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                ],
            },
            {
                MarketId: 17246016902317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172460169231701',
                        FieldTypeId: 1,
                        Value: 7.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172460169231702',
                        FieldTypeId: 2,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724601692056001',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724601692056002',
                        FieldTypeId: 2,
                        Value: 1.33,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.33,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724601692056003',
                        FieldTypeId: 3,
                        Value: 1.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.72,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724601692056101',
                        FieldTypeId: 1,
                        Value: 1.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.51,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724601692056102',
                        FieldTypeId: 2,
                        Value: 2.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.55,
                        },
                    },
                ],
            },
            {
                MarketId: 172460169020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724601692056201',
                        FieldTypeId: 1,
                        Value: 1.83,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.83,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724601692056202',
                        FieldTypeId: 2,
                        Value: 1.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.97,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1548,
        Extra: {
            SmallId: 548207,
            SmallCode: '',
        },
    },
    {
        MatchId: 172398387,
        Info: {
            AwayTeamId: 1273,
            AwayTeamName: {
                langValues: {},
                International: 'Celta de Vigo',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-27T19:30:00',
            ExtraInfo: {},
            HomeTeamId: 2659,
            HomeTeamName: {
                langValues: {},
                International: 'Deportivo Alaves',
            },
            MatchId: 172398387,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172398387,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172398387014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1723983871401',
                        FieldTypeId: 1,
                        Value: 2.68,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.68,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1723983871402',
                        FieldTypeId: 2,
                        Value: 3.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1723983871403',
                        FieldTypeId: 3,
                        Value: 2.87,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.87,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1723983872401',
                        FieldTypeId: 1,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1723983872402',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1723983872403',
                        FieldTypeId: 3,
                        Value: 3.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.45,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1723983872501',
                        FieldTypeId: 1,
                        Value: 1.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.29,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1723983872502',
                        FieldTypeId: 2,
                        Value: 1.7,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.7,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1723983872503',
                        FieldTypeId: 3,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1723983877601',
                        FieldTypeId: 1,
                        Value: 5.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1723983877602',
                        FieldTypeId: 2,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172398387220501',
                        FieldTypeId: 1,
                        Value: 1.09,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.09,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172398387220502',
                        FieldTypeId: 2,
                        Value: 7.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.51,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172398387220601',
                        FieldTypeId: 1,
                        Value: 1.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.13,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172398387220602',
                        FieldTypeId: 2,
                        Value: 6.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172398387220701',
                        FieldTypeId: 1,
                        Value: 1.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.45,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172398387220702',
                        FieldTypeId: 2,
                        Value: 2.77,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.77,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172398387221001',
                        FieldTypeId: 1,
                        Value: 1.77,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.77,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172398387221002',
                        FieldTypeId: 2,
                        Value: 2.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172398387221101',
                        FieldTypeId: 1,
                        Value: 2.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172398387221102',
                        FieldTypeId: 2,
                        Value: 1.59,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.59,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172398387221301',
                        FieldTypeId: 1,
                        Value: 4.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.45,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172398387221302',
                        FieldTypeId: 2,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172398387226001',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172398387226002',
                        FieldTypeId: 2,
                        Value: 6.52,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.52,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17239838702295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172398387229501',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172398387229502',
                        FieldTypeId: 2,
                        Value: 7.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172398387229503',
                        FieldTypeId: 3,
                        Value: 4.16,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.16,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172398387230401',
                        FieldTypeId: 1,
                        Value: 6.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172398387230402',
                        FieldTypeId: 2,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172398387230403',
                        FieldTypeId: 3,
                        Value: 3.99,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.99,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17239838702313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172398387231301',
                        FieldTypeId: 1,
                        Value: 1.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.5,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172398387231302',
                        FieldTypeId: 2,
                        Value: 2.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.47,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172398387231501',
                        FieldTypeId: 1,
                        Value: 3.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172398387231502',
                        FieldTypeId: 2,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17239838702317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172398387231701',
                        FieldTypeId: 1,
                        Value: 8.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172398387231702',
                        FieldTypeId: 2,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1723983872056001',
                        FieldTypeId: 1,
                        Value: 1.42,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.42,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1723983872056002',
                        FieldTypeId: 2,
                        Value: 1.39,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.39,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1723983872056003',
                        FieldTypeId: 3,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1723983872056101',
                        FieldTypeId: 1,
                        Value: 1.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1723983872056102',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
            {
                MarketId: 172398387020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1723983872056201',
                        FieldTypeId: 1,
                        Value: 1.97,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.97,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1723983872056202',
                        FieldTypeId: 2,
                        Value: 1.83,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.83,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1501,
        Extra: {
            SmallId: 548118,
            SmallCode: '',
        },
    },
    {
        MatchId: 172400866,
        Info: {
            AwayTeamId: 489,
            AwayTeamName: {
                langValues: {},
                International: 'Athletic Bilbao',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-27T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 490,
            HomeTeamName: {
                langValues: {},
                International: 'Atletico Madrid',
            },
            MatchId: 172400866,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172400866,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172400866014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724008661401',
                        FieldTypeId: 1,
                        Value: 1.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.96,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724008661402',
                        FieldTypeId: 2,
                        Value: 3.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.48,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724008661403',
                        FieldTypeId: 3,
                        Value: 3.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.98,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724008662401',
                        FieldTypeId: 1,
                        Value: 2.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.44,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724008662402',
                        FieldTypeId: 2,
                        Value: 2.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.18,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724008662403',
                        FieldTypeId: 3,
                        Value: 4.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.1,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724008662501',
                        FieldTypeId: 1,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724008662502',
                        FieldTypeId: 2,
                        Value: 1.58,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.58,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724008662503',
                        FieldTypeId: 3,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724008667601',
                        FieldTypeId: 1,
                        Value: 4.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724008667602',
                        FieldTypeId: 2,
                        Value: 1.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.18,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172400866220501',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172400866220502',
                        FieldTypeId: 2,
                        Value: 9.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.72,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172400866220601',
                        FieldTypeId: 1,
                        Value: 1.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172400866220602',
                        FieldTypeId: 2,
                        Value: 8.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.6,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172400866220701',
                        FieldTypeId: 1,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172400866220702',
                        FieldTypeId: 2,
                        Value: 3.41,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.41,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172400866221001',
                        FieldTypeId: 1,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172400866221002',
                        FieldTypeId: 2,
                        Value: 2.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.62,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172400866221101',
                        FieldTypeId: 1,
                        Value: 1.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.96,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172400866221102',
                        FieldTypeId: 2,
                        Value: 1.86,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.86,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172400866221301',
                        FieldTypeId: 1,
                        Value: 3.41,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.41,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172400866221302',
                        FieldTypeId: 2,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172400866226001',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172400866226002',
                        FieldTypeId: 2,
                        Value: 8.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.38,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17240086602295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172400866229501',
                        FieldTypeId: 1,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172400866229502',
                        FieldTypeId: 2,
                        Value: 9.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172400866229503',
                        FieldTypeId: 3,
                        Value: 5.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.43,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172400866230401',
                        FieldTypeId: 1,
                        Value: 3.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172400866230402',
                        FieldTypeId: 2,
                        Value: 1.88,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.88,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172400866230403',
                        FieldTypeId: 3,
                        Value: 3.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.49,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172400866230501',
                        FieldTypeId: 1,
                        Value: 8.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172400866230502',
                        FieldTypeId: 2,
                        Value: 1.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.28,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172400866230503',
                        FieldTypeId: 3,
                        Value: 5.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.66,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172400866231301',
                        FieldTypeId: 1,
                        Value: 1.39,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.39,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172400866231302',
                        FieldTypeId: 2,
                        Value: 2.85,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.85,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172400866231501',
                        FieldTypeId: 1,
                        Value: 2.77,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.77,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172400866231502',
                        FieldTypeId: 2,
                        Value: 1.41,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.41,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086602317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172400866231701',
                        FieldTypeId: 1,
                        Value: 6.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.5,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172400866231702',
                        FieldTypeId: 2,
                        Value: 1.09,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.09,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724008662056001',
                        FieldTypeId: 1,
                        Value: 1.26,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.26,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724008662056002',
                        FieldTypeId: 2,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724008662056003',
                        FieldTypeId: 3,
                        Value: 1.85,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.85,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724008662056101',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724008662056102',
                        FieldTypeId: 2,
                        Value: 2.83,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.83,
                        },
                    },
                ],
            },
            {
                MarketId: 172400866020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724008662056201',
                        FieldTypeId: 1,
                        Value: 1.81,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.81,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724008662056202',
                        FieldTypeId: 2,
                        Value: 2.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.0,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1511,
        Extra: {
            SmallId: 548162,
            SmallCode: '',
        },
    },
    {
        MatchId: 172400867,
        Info: {
            AwayTeamId: 516,
            AwayTeamName: {
                langValues: {},
                International: 'Real Madrid',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-26T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 517,
            HomeTeamName: {
                langValues: {},
                International: 'Real Sociedad',
            },
            MatchId: 172400867,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172400867,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172400867014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724008671401',
                        FieldTypeId: 1,
                        Value: 2.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724008671402',
                        FieldTypeId: 2,
                        Value: 3.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.23,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724008671403',
                        FieldTypeId: 3,
                        Value: 2.74,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.74,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724008672401',
                        FieldTypeId: 1,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724008672402',
                        FieldTypeId: 2,
                        Value: 2.09,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.09,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724008672403',
                        FieldTypeId: 3,
                        Value: 3.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.17,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724008672501',
                        FieldTypeId: 1,
                        Value: 1.33,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.33,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724008672502',
                        FieldTypeId: 2,
                        Value: 1.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724008672503',
                        FieldTypeId: 3,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724008677601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724008677602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172400867220501',
                        FieldTypeId: 1,
                        Value: 1.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172400867220502',
                        FieldTypeId: 2,
                        Value: 9.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 9.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172400867220601',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172400867220602',
                        FieldTypeId: 2,
                        Value: 7.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.5,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172400867220701',
                        FieldTypeId: 1,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172400867220702',
                        FieldTypeId: 2,
                        Value: 3.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172400867221001',
                        FieldTypeId: 1,
                        Value: 1.57,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.57,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172400867221002',
                        FieldTypeId: 2,
                        Value: 2.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.4,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172400867221101',
                        FieldTypeId: 1,
                        Value: 2.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172400867221102',
                        FieldTypeId: 2,
                        Value: 1.75,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.75,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172400867221301',
                        FieldTypeId: 1,
                        Value: 3.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.8,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172400867221302',
                        FieldTypeId: 2,
                        Value: 1.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.27,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172400867226001',
                        FieldTypeId: 1,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172400867226002',
                        FieldTypeId: 2,
                        Value: 5.88,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.88,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2.5)',
                        },
                        FieldId: '172400867226201',
                        FieldTypeId: 1,
                        Value: 1.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2.5)',
                        },
                        FieldId: '172400867226202',
                        FieldTypeId: 2,
                        Value: 12.16,
                        Extra: {
                            Deboost: true,
                            NormalValue: 12.16,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172400867229501',
                        FieldTypeId: 1,
                        Value: 1.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.48,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172400867229502',
                        FieldTypeId: 2,
                        Value: 6.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.13,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172400867229503',
                        FieldTypeId: 3,
                        Value: 4.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.14,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702296,
                MarketTypeId: 2296,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (2)',
                        },
                        FieldId: '172400867229601',
                        FieldTypeId: 1,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-2)',
                        },
                        FieldId: '172400867229602',
                        FieldTypeId: 2,
                        Value: 14.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 14.29,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-2)',
                        },
                        FieldId: '172400867229603',
                        FieldTypeId: 3,
                        Value: 7.25,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.25,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172400867230401',
                        FieldTypeId: 1,
                        Value: 5.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.96,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172400867230402',
                        FieldTypeId: 2,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172400867230403',
                        FieldTypeId: 3,
                        Value: 4.16,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.16,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172400867230501',
                        FieldTypeId: 1,
                        Value: 13.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 13.31,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172400867230502',
                        FieldTypeId: 2,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172400867230503',
                        FieldTypeId: 3,
                        Value: 7.27,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.27,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172400867231301',
                        FieldTypeId: 1,
                        Value: 1.42,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.42,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172400867231302',
                        FieldTypeId: 2,
                        Value: 2.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.73,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172400867231501',
                        FieldTypeId: 1,
                        Value: 2.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.95,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172400867231502',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                ],
            },
            {
                MarketId: 17240086702317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172400867231701',
                        FieldTypeId: 1,
                        Value: 7.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.2,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172400867231702',
                        FieldTypeId: 2,
                        Value: 1.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.07,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724008672056001',
                        FieldTypeId: 1,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724008672056002',
                        FieldTypeId: 2,
                        Value: 1.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724008672056003',
                        FieldTypeId: 3,
                        Value: 1.47,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.47,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724008672056101',
                        FieldTypeId: 1,
                        Value: 1.87,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.87,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724008672056102',
                        FieldTypeId: 2,
                        Value: 1.93,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.93,
                        },
                    },
                ],
            },
            {
                MarketId: 172400867020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724008672056201',
                        FieldTypeId: 1,
                        Value: 1.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724008672056202',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1534,
        Extra: {
            SmallId: 548185,
            SmallCode: '',
        },
    },
    {
        MatchId: 172483880,
        Info: {
            AwayTeamId: 491,
            AwayTeamName: {
                langValues: {},
                International: 'Valencia',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-29T22:00:00',
            ExtraInfo: {},
            HomeTeamId: 497,
            HomeTeamName: {
                langValues: {},
                International: 'Barcelona',
            },
            MatchId: 172483880,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172483880,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172483880014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724838801401',
                        FieldTypeId: 1,
                        Value: 1.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.38,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724838801402',
                        FieldTypeId: 2,
                        Value: 5.19,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.19,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724838801403',
                        FieldTypeId: 3,
                        Value: 7.62,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.62,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724838802401',
                        FieldTypeId: 1,
                        Value: 1.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.8,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724838802402',
                        FieldTypeId: 2,
                        Value: 2.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.51,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724838802403',
                        FieldTypeId: 3,
                        Value: 6.9,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.9,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724838802501',
                        FieldTypeId: 1,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724838802502',
                        FieldTypeId: 2,
                        Value: 1.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.45,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724838802503',
                        FieldTypeId: 3,
                        Value: 1.91,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.91,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724838807601',
                        FieldTypeId: 1,
                        Value: 4.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.55,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724838807602',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17248388002206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172483880220601',
                        FieldTypeId: 1,
                        Value: 1.04,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.04,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172483880220602',
                        FieldTypeId: 2,
                        Value: 11.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 11.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172483880220701',
                        FieldTypeId: 1,
                        Value: 1.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.21,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172483880220702',
                        FieldTypeId: 2,
                        Value: 4.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172483880221001',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172483880221002',
                        FieldTypeId: 2,
                        Value: 3.55,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.55,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172483880221101',
                        FieldTypeId: 1,
                        Value: 1.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172483880221102',
                        FieldTypeId: 2,
                        Value: 2.23,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.23,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172483880221301',
                        FieldTypeId: 1,
                        Value: 2.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172483880221302',
                        FieldTypeId: 2,
                        Value: 1.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.48,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17248388002304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172483880230401',
                        FieldTypeId: 1,
                        Value: 2.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172483880230402',
                        FieldTypeId: 2,
                        Value: 3.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172483880230403',
                        FieldTypeId: 3,
                        Value: 3.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.72,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172483880230501',
                        FieldTypeId: 1,
                        Value: 3.59,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.59,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172483880230502',
                        FieldTypeId: 2,
                        Value: 1.83,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.83,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172483880230503',
                        FieldTypeId: 3,
                        Value: 3.93,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.93,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002306,
                MarketTypeId: 2306,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-3.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-3)',
                        },
                        FieldId: '172483880230601',
                        FieldTypeId: 1,
                        Value: 7.19,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.19,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (3)',
                        },
                        FieldId: '172483880230602',
                        FieldTypeId: 2,
                        Value: 1.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.32,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (3)',
                        },
                        FieldId: '172483880230603',
                        FieldTypeId: 3,
                        Value: 5.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.49,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172483880231301',
                        FieldTypeId: 1,
                        Value: 1.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172483880231302',
                        FieldTypeId: 2,
                        Value: 3.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.3,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172483880231501',
                        FieldTypeId: 1,
                        Value: 2.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.38,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172483880231502',
                        FieldTypeId: 2,
                        Value: 1.54,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.54,
                        },
                    },
                ],
            },
            {
                MarketId: 17248388002317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172483880231701',
                        FieldTypeId: 1,
                        Value: 5.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172483880231702',
                        FieldTypeId: 2,
                        Value: 1.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.13,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724838802056001',
                        FieldTypeId: 1,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724838802056002',
                        FieldTypeId: 2,
                        Value: 1.17,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.17,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724838802056003',
                        FieldTypeId: 3,
                        Value: 2.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.98,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724838802056101',
                        FieldTypeId: 1,
                        Value: 1.13,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.13,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724838802056102',
                        FieldTypeId: 2,
                        Value: 6.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.05,
                        },
                    },
                ],
            },
            {
                MarketId: 172483880020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724838802056201',
                        FieldTypeId: 1,
                        Value: 2.0,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.0,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724838802056202',
                        FieldTypeId: 2,
                        Value: 1.81,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.81,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1529,
        Extra: {
            SmallId: 558346,
            SmallCode: '',
        },
    },
    {
        MatchId: 172403443,
        Info: {
            AwayTeamId: 514,
            AwayTeamName: {
                langValues: {},
                International: 'Mallorca',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-28T15:00:00',
            ExtraInfo: {},
            HomeTeamId: 2649,
            HomeTeamName: {
                langValues: {},
                International: 'Cadiz CF',
            },
            MatchId: 172403443,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172403443,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172403443014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724034431401',
                        FieldTypeId: 1,
                        Value: 2.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.63,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724034431402',
                        FieldTypeId: 2,
                        Value: 2.79,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.79,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724034431403',
                        FieldTypeId: 3,
                        Value: 3.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.21,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724034432401',
                        FieldTypeId: 1,
                        Value: 3.4,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.4,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724034432402',
                        FieldTypeId: 2,
                        Value: 1.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.8,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724034432403',
                        FieldTypeId: 3,
                        Value: 3.88,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.88,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724034432501',
                        FieldTypeId: 1,
                        Value: 1.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.24,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724034432502',
                        FieldTypeId: 2,
                        Value: 1.85,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.85,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724034432503',
                        FieldTypeId: 3,
                        Value: 1.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.28,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724034437601',
                        FieldTypeId: 1,
                        Value: 6.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724034437602',
                        FieldTypeId: 2,
                        Value: 1.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.1,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172403443220501',
                        FieldTypeId: 1,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172403443220502',
                        FieldTypeId: 2,
                        Value: 5.8,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.8,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172403443220601',
                        FieldTypeId: 1,
                        Value: 1.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.22,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172403443220602',
                        FieldTypeId: 2,
                        Value: 4.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.35,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172403443220701',
                        FieldTypeId: 1,
                        Value: 1.68,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.68,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172403443220702',
                        FieldTypeId: 2,
                        Value: 2.21,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.21,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172403443221001',
                        FieldTypeId: 1,
                        Value: 2.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.28,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172403443221002',
                        FieldTypeId: 2,
                        Value: 1.63,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.63,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172403443221101',
                        FieldTypeId: 1,
                        Value: 3.06,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.06,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172403443221102',
                        FieldTypeId: 2,
                        Value: 1.38,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.38,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172403443221301',
                        FieldTypeId: 1,
                        Value: 6.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172403443221302',
                        FieldTypeId: 2,
                        Value: 1.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.12,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172403443226001',
                        FieldTypeId: 1,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172403443226002',
                        FieldTypeId: 2,
                        Value: 7.79,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.79,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17240344302295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172403443229501',
                        FieldTypeId: 1,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172403443229502',
                        FieldTypeId: 2,
                        Value: 8.79,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.79,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172403443229503',
                        FieldTypeId: 3,
                        Value: 4.24,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.24,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172403443230401',
                        FieldTypeId: 1,
                        Value: 6.86,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.86,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172403443230402',
                        FieldTypeId: 2,
                        Value: 1.5,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.5,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172403443230403',
                        FieldTypeId: 3,
                        Value: 3.75,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.75,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172403443231301',
                        FieldTypeId: 1,
                        Value: 1.66,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.66,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172403443231302',
                        FieldTypeId: 2,
                        Value: 2.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.14,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172403443231501',
                        FieldTypeId: 1,
                        Value: 4.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172403443231502',
                        FieldTypeId: 2,
                        Value: 1.2,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.2,
                        },
                    },
                ],
            },
            {
                MarketId: 17240344302317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172403443231701',
                        FieldTypeId: 1,
                        Value: 10.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 10.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172403443231702',
                        FieldTypeId: 2,
                        Value: 1.03,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.03,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724034432056001',
                        FieldTypeId: 1,
                        Value: 1.36,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.36,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724034432056002',
                        FieldTypeId: 2,
                        Value: 1.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.44,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724034432056003',
                        FieldTypeId: 3,
                        Value: 1.48,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.48,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724034432056101',
                        FieldTypeId: 1,
                        Value: 1.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.73,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724034432056102',
                        FieldTypeId: 2,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                ],
            },
            {
                MarketId: 172403443020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724034432056201',
                        FieldTypeId: 1,
                        Value: 2.34,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.34,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724034432056202',
                        FieldTypeId: 2,
                        Value: 1.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.6,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1458,
        Extra: {
            SmallId: 548195,
            SmallCode: '',
        },
    },
    {
        MatchId: 172404310,
        Info: {
            AwayTeamId: 511,
            AwayTeamName: {
                langValues: {},
                International: 'Osasuna',
            },
            CategoryId: 252,
            CategoryName: {
                langValues: {},
                International: 'Spain',
            },
            DateOfMatch: '2024-04-28T17:15:00',
            ExtraInfo: {},
            HomeTeamId: 505,
            HomeTeamName: {
                langValues: {},
                International: 'Granada',
            },
            MatchId: 172404310,
            SportId: 1,
            SportName: {
                langValues: {},
                International: 'Football',
            },
            TournamentId: 1048,
            TournamentName: {
                langValues: {},
                International: 'La Liga',
            },
            TvChannels: [],
        },
        Header: {
            Active: true,
            MatchId: 172404310,
            Messages: [],
            SetScores: [],
        },
        Markets: [
            {
                MarketId: 172404310014,
                MarketTypeId: 14,
                MarketName: {
                    langValues: {},
                    International: 'Match Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724043101401',
                        FieldTypeId: 1,
                        Value: 2.6,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.6,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724043101402',
                        FieldTypeId: 2,
                        Value: 3.11,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.11,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724043101403',
                        FieldTypeId: 3,
                        Value: 2.91,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.91,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310024,
                MarketTypeId: 24,
                MarketName: {
                    langValues: {},
                    International: '1st Half Result',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W1',
                        },
                        FieldId: '1724043102401',
                        FieldTypeId: 1,
                        Value: 3.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Draw',
                        },
                        FieldId: '1724043102402',
                        FieldTypeId: 2,
                        Value: 1.96,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.96,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'W2',
                        },
                        FieldId: '1724043102403',
                        FieldTypeId: 3,
                        Value: 3.52,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.52,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310025,
                MarketTypeId: 25,
                MarketName: {
                    langValues: {},
                    International: '1st Half Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724043102501',
                        FieldTypeId: 1,
                        Value: 1.28,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.28,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724043102502',
                        FieldTypeId: 2,
                        Value: 1.72,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.72,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724043102503',
                        FieldTypeId: 3,
                        Value: 1.31,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.31,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310076,
                MarketTypeId: 76,
                MarketName: {
                    langValues: {},
                    International: '1st Half Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724043107601',
                        FieldTypeId: 1,
                        Value: 5.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 5.1,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724043107602',
                        FieldTypeId: 2,
                        Value: 1.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.14,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002205,
                MarketTypeId: 2205,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172404310220501',
                        FieldTypeId: 1,
                        Value: 1.08,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.08,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172404310220502',
                        FieldTypeId: 2,
                        Value: 8.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.07,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002206,
                MarketTypeId: 2206,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1)',
                        },
                        FieldId: '172404310220601',
                        FieldTypeId: 1,
                        Value: 1.12,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.12,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1)',
                        },
                        FieldId: '172404310220602',
                        FieldTypeId: 2,
                        Value: 6.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.35,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002207,
                MarketTypeId: 2207,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172404310220701',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172404310220702',
                        FieldTypeId: 2,
                        Value: 2.84,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.84,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002210,
                MarketTypeId: 2210,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2)',
                        },
                        FieldId: '172404310221001',
                        FieldTypeId: 1,
                        Value: 1.73,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.73,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2)',
                        },
                        FieldId: '172404310221002',
                        FieldTypeId: 2,
                        Value: 2.1,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.1,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002211,
                MarketTypeId: 2211,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172404310221101',
                        FieldTypeId: 1,
                        Value: 2.32,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.32,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172404310221102',
                        FieldTypeId: 2,
                        Value: 1.61,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.61,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002213,
                MarketTypeId: 2213,
                MarketName: {
                    langValues: {},
                    International: 'Total Goals (3.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (3.5)',
                        },
                        FieldId: '172404310221301',
                        FieldTypeId: 1,
                        Value: 4.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (3.5)',
                        },
                        FieldId: '172404310221302',
                        FieldTypeId: 2,
                        Value: 1.22,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.22,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002260,
                MarketTypeId: 2260,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1.5)',
                        },
                        FieldId: '172404310226001',
                        FieldTypeId: 1,
                        Value: 1.09,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.09,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1.5)',
                        },
                        FieldId: '172404310226002',
                        FieldTypeId: 2,
                        Value: 6.18,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.18,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002262,
                MarketTypeId: 2262,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap (2.5)',
                },
                Active: true,
                MarketFields: [],
            },
            {
                MarketId: 17240431002295,
                MarketTypeId: 2295,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (1)',
                        },
                        FieldId: '172404310229501',
                        FieldTypeId: 1,
                        Value: 1.44,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.44,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (-1)',
                        },
                        FieldId: '172404310229502',
                        FieldTypeId: 2,
                        Value: 6.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.95,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (-1)',
                        },
                        FieldId: '172404310229503',
                        FieldTypeId: 3,
                        Value: 4.14,
                        Extra: {
                            Deboost: true,
                            NormalValue: 4.14,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002304,
                MarketTypeId: 2304,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-1.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-1)',
                        },
                        FieldId: '172404310230401',
                        FieldTypeId: 1,
                        Value: 6.07,
                        Extra: {
                            Deboost: true,
                            NormalValue: 6.07,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (1)',
                        },
                        FieldId: '172404310230402',
                        FieldTypeId: 2,
                        Value: 1.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.51,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (1)',
                        },
                        FieldId: '172404310230403',
                        FieldTypeId: 3,
                        Value: 3.94,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.94,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002305,
                MarketTypeId: 2305,
                MarketName: {
                    langValues: {},
                    International: 'Goals Handicap 3 Way (-2.0)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1 (-2)',
                        },
                        FieldId: '172404310230501',
                        FieldTypeId: 1,
                        Value: 14.3,
                        Extra: {
                            Deboost: true,
                            NormalValue: 14.3,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2 (2)',
                        },
                        FieldId: '172404310230502',
                        FieldTypeId: 2,
                        Value: 1.15,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.15,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Tie: Team 2 (2)',
                        },
                        FieldId: '172404310230503',
                        FieldTypeId: 3,
                        Value: 7.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 7.05,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002313,
                MarketTypeId: 2313,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (0.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (0.5)',
                        },
                        FieldId: '172404310231301',
                        FieldTypeId: 1,
                        Value: 1.51,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.51,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (0.5)',
                        },
                        FieldId: '172404310231302',
                        FieldTypeId: 2,
                        Value: 2.45,
                        Extra: {
                            Deboost: true,
                            NormalValue: 2.45,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002315,
                MarketTypeId: 2315,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (1.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (1.5)',
                        },
                        FieldId: '172404310231501',
                        FieldTypeId: 1,
                        Value: 3.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 3.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (1.5)',
                        },
                        FieldId: '172404310231502',
                        FieldTypeId: 2,
                        Value: 1.29,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.29,
                        },
                    },
                ],
            },
            {
                MarketId: 17240431002317,
                MarketTypeId: 2317,
                MarketName: {
                    langValues: {},
                    International: '1st Half Total Goals (2.5)',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Over (2.5)',
                        },
                        FieldId: '172404310231701',
                        FieldTypeId: 1,
                        Value: 8.35,
                        Extra: {
                            Deboost: true,
                            NormalValue: 8.35,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Under (2.5)',
                        },
                        FieldId: '172404310231702',
                        FieldTypeId: 2,
                        Value: 1.05,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.05,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310020560,
                MarketTypeId: 20560,
                MarketName: {
                    langValues: {},
                    International: 'Double Chance',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '1X',
                        },
                        FieldId: '1724043102056001',
                        FieldTypeId: 1,
                        Value: 1.43,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.43,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: '12',
                        },
                        FieldId: '1724043102056002',
                        FieldTypeId: 2,
                        Value: 1.37,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.37,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'X2',
                        },
                        FieldId: '1724043102056003',
                        FieldTypeId: 3,
                        Value: 1.49,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.49,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310020561,
                MarketTypeId: 20561,
                MarketName: {
                    langValues: {},
                    International: 'Draw No Bet',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 1',
                        },
                        FieldId: '1724043102056101',
                        FieldTypeId: 1,
                        Value: 1.82,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.82,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Team 2',
                        },
                        FieldId: '1724043102056102',
                        FieldTypeId: 2,
                        Value: 1.98,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.98,
                        },
                    },
                ],
            },
            {
                MarketId: 172404310020562,
                MarketTypeId: 20562,
                MarketName: {
                    langValues: {},
                    International: 'Both Teams To Score',
                },
                Active: true,
                MarketFields: [
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'Yes',
                        },
                        FieldId: '1724043102056201',
                        FieldTypeId: 1,
                        Value: 1.95,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.95,
                        },
                    },
                    {
                        Active: true,
                        FieldName: {
                            langValues: {},
                            International: 'No',
                        },
                        FieldId: '1724043102056202',
                        FieldTypeId: 2,
                        Value: 1.85,
                        Extra: {
                            Deboost: true,
                            NormalValue: 1.85,
                        },
                    },
                ],
            },
        ],
        PointsCount: 1478,
        Extra: {
            SmallId: 548197,
            SmallCode: '',
        },
    },
];

export default eventsPerLeague;
