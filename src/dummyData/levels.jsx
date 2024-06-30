const levels = [
    {
        level: 0,
        name: 'Rookie',
        wagered: 0,
        withdraw: 7500,
        rewards: {
            bonus: 0.05,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 0,
                },
                {
                    milestone: 1,
                    wagered: 200,
                },
                {
                    milestone: 2,
                    wagered: 400,
                },
                {
                    milestone: 3,
                    wagered: 600,
                },
                {
                    milestone: 4,
                    wagered: 800,
                },
            ],
        },
    },
    {
        level: 1,
        name: 'Joker',
        wagered: 1000,
        withdraw: 7500,
        rewards: {
            bonus: 0.0525,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 1000,
                },
                {
                    milestone: 1,
                    wagered: 1300,
                },
                {
                    milestone: 2,
                    wagered: 1600,
                },
                {
                    milestone: 3,
                    wagered: 1900,
                },
                {
                    milestone: 4,
                    wagered: 2200,
                },
            ],
        },
    },
    {
        level: 2,
        name: 'Club',
        wagered: 2500,
        withdraw: 10000,
        rewards: {
            bonus: 0.055,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 2500,
                },
                {
                    milestone: 1,
                    wagered: 3000,
                },
                {
                    milestone: 2,
                    wagered: 3500,
                },
                {
                    milestone: 3,
                    wagered: 4000,
                },
                {
                    milestone: 4,
                    wagered: 4500,
                },
            ],
        },
    },
    {
        level: 3,
        name: 'Heart',
        wagered: 5000,
        withdraw: 10000,
        rewards: {
            bonus: 0.0575,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 5000,
                },
                {
                    milestone: 1,
                    wagered: 6000,
                },
                {
                    milestone: 2,
                    wagered: 7000,
                },
                {
                    milestone: 3,
                    wagered: 8000,
                },
                {
                    milestone: 4,
                    wagered: 9000,
                },
            ],
        },
    },
    {
        level: 4,
        name: 'Diamond',
        wagered: 10000,
        withdraw: 10000,
        rewards: {
            bonus: 0.06,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 10000,
                },
                {
                    milestone: 1,
                    wagered: 12000,
                },
                {
                    milestone: 2,
                    wagered: 14000,
                },
                {
                    milestone: 3,
                    wagered: 16000,
                },
                {
                    milestone: 4,
                    wagered: 18000,
                },
            ],
        },
    },
    {
        level: 5,
        name: 'Spade',
        wagered: 20000,
        withdraw: 12500,
        rewards: {
            bonus: 0.0625,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 20000,
                },
                {
                    milestone: 1,
                    wagered: 23000,
                },
                {
                    milestone: 2,
                    wagered: 26000,
                },
                {
                    milestone: 3,
                    wagered: 29000,
                },
                {
                    milestone: 4,
                    wagered: 32000,
                },
            ],
        },
    },
    {
        level: 6,
        name: 'Flush',
        wagered: 35000,
        withdraw: 15000,
        rewards: {
            bonus: 0.065,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 35000,
                },
                {
                    milestone: 1,
                    wagered: 38000,
                },
                {
                    milestone: 2,
                    wagered: 41000,
                },
                {
                    milestone: 3,
                    wagered: 44000,
                },
                {
                    milestone: 4,
                    wagered: 47000,
                },
            ],
        },
    },
    {
        level: 7,
        name: 'Jack',
        wagered: 50000,
        withdraw: 17500,
        rewards: {
            bonus: 0.0675,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 50000,
                },
                {
                    milestone: 1,
                    wagered: 55000,
                },
                {
                    milestone: 2,
                    wagered: 60000,
                },
                {
                    milestone: 3,
                    wagered: 65000,
                },
                {
                    milestone: 4,
                    wagered: 70000,
                },
            ],
        },
    },
    {
        level: 8,
        name: 'Jack of Club',
        wagered: 75000,
        withdraw: 20000,
        rewards: {
            bonus: 0.07,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 75000,
                },
                {
                    milestone: 1,
                    wagered: 85000,
                },
                {
                    milestone: 2,
                    wagered: 95000,
                },
                {
                    milestone: 3,
                    wagered: 105000,
                },
                {
                    milestone: 4,
                    wagered: 115000,
                },
            ],
        },
    },
    {
        level: 9,
        name: 'Jack of Heart',
        wagered: 125000,
        withdraw: 22500,
        rewards: {
            bonus: 0.0725,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 125000,
                },
                {
                    milestone: 1,
                    wagered: 140000,
                },
                {
                    milestone: 2,
                    wagered: 155000,
                },
                {
                    milestone: 3,
                    wagered: 170000,
                },
                {
                    milestone: 4,
                    wagered: 185000,
                },
            ],
        },
    },
    {
        level: 10,
        name: 'Jack of Diamond',
        wagered: 200000,
        withdraw: 25000,
        rewards: {
            bonus: 0.075,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 200000,
                },
                {
                    milestone: 1,
                    wagered: 220000,
                },
                {
                    milestone: 2,
                    wagered: 240000,
                },
                {
                    milestone: 3,
                    wagered: 260000,
                },
                {
                    milestone: 4,
                    wagered: 280000,
                },
            ],
        },
    },
    {
        level: 11,
        name: 'Jack of Spade',
        wagered: 300000,
        withdraw: 25000,
        rewards: {
            bonus: 0.0775,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 300000,
                },
                {
                    milestone: 1,
                    wagered: 320000,
                },
                {
                    milestone: 2,
                    wagered: 340000,
                },
                {
                    milestone: 3,
                    wagered: 360000,
                },
                {
                    milestone: 4,
                    wagered: 380000,
                },
                {
                    milestone: 5,
                    wagered: 400000,
                },
                {
                    milestone: 6,
                    wagered: 420000,
                },
                {
                    milestone: 7,
                    wagered: 440000,
                },
                {
                    milestone: 8,
                    wagered: 460000,
                },
                {
                    milestone: 9,
                    wagered: 480000,
                },
            ],
        },
    },
    {
        level: 12,
        name: 'Queen',
        wagered: 500000,
        withdraw: 30000,
        rewards: {
            bonus: 0.08,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 500000,
                },
                {
                    milestone: 1,
                    wagered: 525000,
                },
                {
                    milestone: 2,
                    wagered: 550000,
                },
                {
                    milestone: 3,
                    wagered: 575000,
                },
                {
                    milestone: 4,
                    wagered: 600000,
                },
                {
                    milestone: 5,
                    wagered: 625000,
                },
                {
                    milestone: 6,
                    wagered: 650000,
                },
                {
                    milestone: 7,
                    wagered: 675000,
                },
                {
                    milestone: 8,
                    wagered: 700000,
                },
                {
                    milestone: 9,
                    wagered: 725000,
                },
            ],
        },
    },
    {
        level: 13,
        name: 'Queen of Club',
        wagered: 750000,
        withdraw: 30000,
        rewards: {
            bonus: 0.0825,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 750000,
                },
                {
                    milestone: 1,
                    wagered: 775000,
                },
                {
                    milestone: 2,
                    wagered: 800000,
                },
                {
                    milestone: 3,
                    wagered: 825000,
                },
                {
                    milestone: 4,
                    wagered: 850000,
                },
                {
                    milestone: 5,
                    wagered: 875000,
                },
                {
                    milestone: 6,
                    wagered: 900000,
                },
                {
                    milestone: 7,
                    wagered: 925000,
                },
                {
                    milestone: 8,
                    wagered: 950000,
                },
                {
                    milestone: 9,
                    wagered: 975000,
                },
            ],
        },
    },
    {
        level: 14,
        name: 'Queen of Heart',
        wagered: 1000000,
        withdraw: 30000,
        rewards: {
            bonus: 0.085,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 1000000,
                },
                {
                    milestone: 1,
                    wagered: 1050000,
                },
                {
                    milestone: 2,
                    wagered: 1100000,
                },
                {
                    milestone: 3,
                    wagered: 1150000,
                },
                {
                    milestone: 4,
                    wagered: 1200000,
                },
                {
                    milestone: 5,
                    wagered: 1250000,
                },
                {
                    milestone: 6,
                    wagered: 1300000,
                },
                {
                    milestone: 7,
                    wagered: 1350000,
                },
                {
                    milestone: 8,
                    wagered: 1400000,
                },
                {
                    milestone: 9,
                    wagered: 1450000,
                },
            ],
        },
    },
    {
        level: 15,
        name: 'Queen of Diamond',
        wagered: 1500000,
        withdraw: 50000,
        rewards: {
            bonus: 0.0875,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 1500000,
                },
                {
                    milestone: 1,
                    wagered: 1600000,
                },
                {
                    milestone: 2,
                    wagered: 1700000,
                },
                {
                    milestone: 3,
                    wagered: 1800000,
                },
                {
                    milestone: 4,
                    wagered: 1900000,
                },
                {
                    milestone: 5,
                    wagered: 2000000,
                },
                {
                    milestone: 6,
                    wagered: 2100000,
                },
                {
                    milestone: 7,
                    wagered: 2200000,
                },
                {
                    milestone: 8,
                    wagered: 2300000,
                },
                {
                    milestone: 9,
                    wagered: 2400000,
                },
            ],
        },
    },
    {
        level: 16,
        name: 'Queen of Spade',
        wagered: 2500000,
        withdraw: 75000,
        rewards: {
            bonus: 0.09,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 2500000,
                },
                {
                    milestone: 1,
                    wagered: 2625000,
                },
                {
                    milestone: 2,
                    wagered: 2750000,
                },
                {
                    milestone: 3,
                    wagered: 2875000,
                },
                {
                    milestone: 4,
                    wagered: 3000000,
                },
                {
                    milestone: 5,
                    wagered: 3125000,
                },
                {
                    milestone: 6,
                    wagered: 3250000,
                },
                {
                    milestone: 7,
                    wagered: 3375000,
                },
                {
                    milestone: 8,
                    wagered: 3500000,
                },
                {
                    milestone: 9,
                    wagered: 3625000,
                },
            ],
        },
    },
    {
        level: 17,
        name: 'King',
        wagered: 3750000,
        withdraw: 75000,
        rewards: {
            bonus: 0.0925,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 3750000,
                },
                {
                    milestone: 1,
                    wagered: 3975000,
                },
                {
                    milestone: 2,
                    wagered: 4200000,
                },
                {
                    milestone: 3,
                    wagered: 4425000,
                },
                {
                    milestone: 4,
                    wagered: 4650000,
                },
                {
                    milestone: 5,
                    wagered: 4875000,
                },
                {
                    milestone: 6,
                    wagered: 5100000,
                },
                {
                    milestone: 7,
                    wagered: 5325000,
                },
                {
                    milestone: 8,
                    wagered: 5550000,
                },
                {
                    milestone: 9,
                    wagered: 5775000,
                },
            ],
        },
    },
    {
        level: 18,
        name: 'King of Club',
        wagered: 6000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.095,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 6000000,
                },
                {
                    milestone: 1,
                    wagered: 6400000,
                },
                {
                    milestone: 2,
                    wagered: 6800000,
                },
                {
                    milestone: 3,
                    wagered: 7200000,
                },
                {
                    milestone: 4,
                    wagered: 7600000,
                },
                {
                    milestone: 5,
                    wagered: 8000000,
                },
                {
                    milestone: 6,
                    wagered: 8400000,
                },
                {
                    milestone: 7,
                    wagered: 8800000,
                },
                {
                    milestone: 8,
                    wagered: 9200000,
                },
                {
                    milestone: 9,
                    wagered: 9600000,
                },
            ],
        },
    },
    {
        level: 19,
        name: 'King of Heart',
        wagered: 10000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.0975,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 10000000,
                },
                {
                    milestone: 1,
                    wagered: 10500000,
                },
                {
                    milestone: 2,
                    wagered: 11000000,
                },
                {
                    milestone: 3,
                    wagered: 11500000,
                },
                {
                    milestone: 4,
                    wagered: 12000000,
                },
                {
                    milestone: 5,
                    wagered: 12500000,
                },
                {
                    milestone: 6,
                    wagered: 13000000,
                },
                {
                    milestone: 7,
                    wagered: 13500000,
                },
                {
                    milestone: 8,
                    wagered: 14000000,
                },
                {
                    milestone: 9,
                    wagered: 14500000,
                },
            ],
        },
    },
    {
        level: 20,
        name: 'King of Diamond',
        wagered: 15000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 15000000,
                },
                {
                    milestone: 1,
                    wagered: 16000000,
                },
                {
                    milestone: 2,
                    wagered: 17000000,
                },
                {
                    milestone: 3,
                    wagered: 18000000,
                },
                {
                    milestone: 4,
                    wagered: 19000000,
                },
                {
                    milestone: 5,
                    wagered: 20000000,
                },
                {
                    milestone: 6,
                    wagered: 21000000,
                },
                {
                    milestone: 7,
                    wagered: 22000000,
                },
                {
                    milestone: 8,
                    wagered: 23000000,
                },
                {
                    milestone: 9,
                    wagered: 24000000,
                },
                {
                    milestone: 10,
                    wagered: 25000000,
                },
                {
                    milestone: 11,
                    wagered: 26000000,
                },
                {
                    milestone: 12,
                    wagered: 27000000,
                },
                {
                    milestone: 13,
                    wagered: 28000000,
                },
                {
                    milestone: 14,
                    wagered: 29000000,
                },
            ],
        },
    },
    {
        level: 21,
        name: 'King of Spade',
        wagered: 30000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1025,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 30000000,
                },
                {
                    milestone: 1,
                    wagered: 31333333,
                },
                {
                    milestone: 2,
                    wagered: 32666666,
                },
                {
                    milestone: 3,
                    wagered: 33999999,
                },
                {
                    milestone: 4,
                    wagered: 35333332,
                },
                {
                    milestone: 5,
                    wagered: 36666665,
                },
                {
                    milestone: 6,
                    wagered: 37999998,
                },
                {
                    milestone: 7,
                    wagered: 39333331,
                },
                {
                    milestone: 8,
                    wagered: 40666664,
                },
                {
                    milestone: 9,
                    wagered: 41999997,
                },
                {
                    milestone: 10,
                    wagered: 43333330,
                },
                {
                    milestone: 11,
                    wagered: 44666663,
                },
                {
                    milestone: 12,
                    wagered: 45999996,
                },
                {
                    milestone: 13,
                    wagered: 47333329,
                },
                {
                    milestone: 14,
                    wagered: 48666662,
                },
            ],
        },
    },
    {
        level: 22,
        name: 'Ace',
        wagered: 50000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.105,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 50000000,
                },
                {
                    milestone: 1,
                    wagered: 51666667,
                },
                {
                    milestone: 2,
                    wagered: 53333334,
                },
                {
                    milestone: 3,
                    wagered: 55000001,
                },
                {
                    milestone: 4,
                    wagered: 56666668,
                },
                {
                    milestone: 5,
                    wagered: 58333335,
                },
                {
                    milestone: 6,
                    wagered: 60000002,
                },
                {
                    milestone: 7,
                    wagered: 61666669,
                },
                {
                    milestone: 8,
                    wagered: 63333336,
                },
                {
                    milestone: 9,
                    wagered: 65000003,
                },
                {
                    milestone: 10,
                    wagered: 66666670,
                },
                {
                    milestone: 11,
                    wagered: 68333337,
                },
                {
                    milestone: 12,
                    wagered: 70000004,
                },
                {
                    milestone: 13,
                    wagered: 71666671,
                },
                {
                    milestone: 14,
                    wagered: 73333338,
                },
            ],
        },
    },
    {
        level: 23,
        name: 'Ace of Club',
        wagered: 75000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1075,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 75000000,
                },
                {
                    milestone: 1,
                    wagered: 78333333,
                },
                {
                    milestone: 2,
                    wagered: 81666666,
                },
                {
                    milestone: 3,
                    wagered: 84999999,
                },
                {
                    milestone: 4,
                    wagered: 88333332,
                },
                {
                    milestone: 5,
                    wagered: 91666665,
                },
                {
                    milestone: 6,
                    wagered: 94999998,
                },
                {
                    milestone: 7,
                    wagered: 98333331,
                },
                {
                    milestone: 8,
                    wagered: 101666664,
                },
                {
                    milestone: 9,
                    wagered: 104999997,
                },
                {
                    milestone: 10,
                    wagered: 108333330,
                },
                {
                    milestone: 11,
                    wagered: 111666663,
                },
                {
                    milestone: 12,
                    wagered: 114999996,
                },
                {
                    milestone: 13,
                    wagered: 118333329,
                },
                {
                    milestone: 14,
                    wagered: 121666662,
                },
            ],
        },
    },
    {
        level: 24,
        name: 'Ace of Heart',
        wagered: 125000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.11,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 125000000,
                },
                {
                    milestone: 1,
                    wagered: 130000000,
                },
                {
                    milestone: 2,
                    wagered: 135000000,
                },
                {
                    milestone: 3,
                    wagered: 140000000,
                },
                {
                    milestone: 4,
                    wagered: 145000000,
                },
                {
                    milestone: 5,
                    wagered: 150000000,
                },
                {
                    milestone: 6,
                    wagered: 155000000,
                },
                {
                    milestone: 7,
                    wagered: 160000000,
                },
                {
                    milestone: 8,
                    wagered: 165000000,
                },
                {
                    milestone: 9,
                    wagered: 170000000,
                },
                {
                    milestone: 10,
                    wagered: 175000000,
                },
                {
                    milestone: 11,
                    wagered: 180000000,
                },
                {
                    milestone: 12,
                    wagered: 185000000,
                },
                {
                    milestone: 13,
                    wagered: 190000000,
                },
                {
                    milestone: 14,
                    wagered: 195000000,
                },
            ],
        },
    },
    {
        level: 25,
        name: 'Ace of Diamond',
        wagered: 200000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1125,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 200000000,
                },
                {
                    milestone: 1,
                    wagered: 206666666,
                },
                {
                    milestone: 2,
                    wagered: 213333332,
                },
                {
                    milestone: 3,
                    wagered: 219999998,
                },
                {
                    milestone: 4,
                    wagered: 226666664,
                },
                {
                    milestone: 5,
                    wagered: 233333330,
                },
                {
                    milestone: 6,
                    wagered: 239999996,
                },
                {
                    milestone: 7,
                    wagered: 246666662,
                },
                {
                    milestone: 8,
                    wagered: 253333328,
                },
                {
                    milestone: 9,
                    wagered: 259999994,
                },
                {
                    milestone: 10,
                    wagered: 266666660,
                },
                {
                    milestone: 11,
                    wagered: 273333326,
                },
                {
                    milestone: 12,
                    wagered: 279999992,
                },
                {
                    milestone: 13,
                    wagered: 286666658,
                },
                {
                    milestone: 14,
                    wagered: 293333324,
                },
            ],
        },
    },
    {
        level: 26,
        name: 'Ace of Spade',
        wagered: 300000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.115,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 300000000,
                },
                {
                    milestone: 1,
                    wagered: 310000000,
                },
                {
                    milestone: 2,
                    wagered: 320000000,
                },
                {
                    milestone: 3,
                    wagered: 330000000,
                },
                {
                    milestone: 4,
                    wagered: 340000000,
                },
                {
                    milestone: 5,
                    wagered: 350000000,
                },
                {
                    milestone: 6,
                    wagered: 360000000,
                },
                {
                    milestone: 7,
                    wagered: 370000000,
                },
                {
                    milestone: 8,
                    wagered: 380000000,
                },
                {
                    milestone: 9,
                    wagered: 390000000,
                },
                {
                    milestone: 10,
                    wagered: 400000000,
                },
                {
                    milestone: 11,
                    wagered: 410000000,
                },
                {
                    milestone: 12,
                    wagered: 420000000,
                },
                {
                    milestone: 13,
                    wagered: 430000000,
                },
                {
                    milestone: 14,
                    wagered: 440000000,
                },
            ],
        },
    },
    {
        level: 27,
        name: 'Duelbits Jack',
        wagered: 450000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1175,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 450000000,
                },
                {
                    milestone: 1,
                    wagered: 460000000,
                },
                {
                    milestone: 2,
                    wagered: 470000000,
                },
                {
                    milestone: 3,
                    wagered: 480000000,
                },
                {
                    milestone: 4,
                    wagered: 490000000,
                },
                {
                    milestone: 5,
                    wagered: 500000000,
                },
                {
                    milestone: 6,
                    wagered: 510000000,
                },
                {
                    milestone: 7,
                    wagered: 520000000,
                },
                {
                    milestone: 8,
                    wagered: 530000000,
                },
                {
                    milestone: 9,
                    wagered: 540000000,
                },
                {
                    milestone: 10,
                    wagered: 550000000,
                },
                {
                    milestone: 11,
                    wagered: 560000000,
                },
                {
                    milestone: 12,
                    wagered: 570000000,
                },
                {
                    milestone: 13,
                    wagered: 580000000,
                },
                {
                    milestone: 14,
                    wagered: 590000000,
                },
            ],
        },
    },
    {
        level: 28,
        name: 'Duelbits Queen',
        wagered: 600000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.12,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 600000000,
                },
                {
                    milestone: 1,
                    wagered: 610000000,
                },
                {
                    milestone: 2,
                    wagered: 620000000,
                },
                {
                    milestone: 3,
                    wagered: 630000000,
                },
                {
                    milestone: 4,
                    wagered: 640000000,
                },
                {
                    milestone: 5,
                    wagered: 650000000,
                },
                {
                    milestone: 6,
                    wagered: 660000000,
                },
                {
                    milestone: 7,
                    wagered: 670000000,
                },
                {
                    milestone: 8,
                    wagered: 680000000,
                },
                {
                    milestone: 9,
                    wagered: 690000000,
                },
                {
                    milestone: 10,
                    wagered: 700000000,
                },
                {
                    milestone: 11,
                    wagered: 710000000,
                },
                {
                    milestone: 12,
                    wagered: 720000000,
                },
                {
                    milestone: 13,
                    wagered: 730000000,
                },
                {
                    milestone: 14,
                    wagered: 740000000,
                },
            ],
        },
    },
    {
        level: 29,
        name: 'Duelbits King',
        wagered: 750000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.1225,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 750000000,
                },
                {
                    milestone: 1,
                    wagered: 766666667,
                },
                {
                    milestone: 2,
                    wagered: 783333334,
                },
                {
                    milestone: 3,
                    wagered: 800000001,
                },
                {
                    milestone: 4,
                    wagered: 816666668,
                },
                {
                    milestone: 5,
                    wagered: 833333335,
                },
                {
                    milestone: 6,
                    wagered: 850000002,
                },
                {
                    milestone: 7,
                    wagered: 866666669,
                },
                {
                    milestone: 8,
                    wagered: 883333336,
                },
                {
                    milestone: 9,
                    wagered: 900000003,
                },
                {
                    milestone: 10,
                    wagered: 916666670,
                },
                {
                    milestone: 11,
                    wagered: 933333337,
                },
                {
                    milestone: 12,
                    wagered: 950000004,
                },
                {
                    milestone: 13,
                    wagered: 966666671,
                },
                {
                    milestone: 14,
                    wagered: 983333338,
                },
            ],
        },
    },
    {
        level: 30,
        name: 'Duelbits',
        wagered: 1000000000,
        withdraw: 75000,
        rewards: {
            bonus: 0.125,
            rakeback: {
                instant: 0.1,
                daily: 0.05,
                weekly: 0.05,
                monthly: 0.05,
            },
            milestones: [
                {
                    milestone: 0,
                    wagered: 1000000000,
                },
            ],
        },
    },
];

export default levels;
