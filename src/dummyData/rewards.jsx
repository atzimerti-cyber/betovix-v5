const rewards = {
    level: 0,
    levelProgress: 0,
    milestone: 0,
    milestoneProgress: 0,
    bonus: {
        accumulated: 0,
        available: [],
        claimed: [],
        revenue: 0,
    },
    rakeback: {
        instant: {
            available: 0,
            revenue: 0,
        },
        daily: {
            accumulated: 0,
            available: 0,
            revenue: 0,
            claimable: 1715385600000,
        },
        weekly: {
            accumulated: 0,
            available: 0,
            revenue: 0,
            claimable: 1715558400000,
        },
        monthly: {
            accumulated: 0,
            available: 0,
            revenue: 0,
            claimable: 1717200000000,
        },
    },
};

export default rewards;
