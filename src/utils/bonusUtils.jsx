export const FREE_BET_REWARD_TYPE = 5;
export const FREE_SPINS_REWARD_TYPE = 6;

export const BONUS_FUNDING_MODE_WALLET_CREDIT = 1;
export const BONUS_FUNDING_MODE_ISOLATED_BALANCE = 2;
export const BONUS_FUNDING_MODE_NON_WALLET_ENTITLEMENT = 3;

export const BONUS_STATUS_COMPLETED = 5;
export const BONUS_BALANCE_CONVERSION_STATUS_SUCCEEDED = 4;

export const SPORTS_PRODUCT_CODE = "sports";
export const SPORTSBOOK_PRODUCT_CODE = "sportsbook";
export const CASINO_PRODUCT_CODE = "casino";
export const LIVE_CASINO_PRODUCT_CODE = "live-casino";

export const isEmptyRestriction = (value) => {
    return !Array.isArray(value) || value.length === 0;
};

export const parseBonusMetadata = (value) => {
    try {
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
};

export const toArray = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

export const numberArrayIncludes = (list = [], value) => {
    if (!Array.isArray(list) || list.length === 0) return true;
    if (value === undefined || value === null || value === "") return false;

    return list.map(Number).includes(Number(value));
};

export const stringArrayIncludes = (list = [], value) => {
    if (!Array.isArray(list) || list.length === 0) return true;
    if (!value) return false;

    return list
        .map((item) => String(item).toLowerCase())
        .includes(String(value).toLowerCase());
};

const firstDefined = (...values) => values.find((value) => value !== undefined && value !== null);

const normalizeNumber = (value) => {
    if (value === undefined || value === null || value === '') return value;

    const numberValue = Number(value);

    return Number.isFinite(numberValue) ? numberValue : value;
};

const normalizeFundingMode = (value) => {
    const numericMode = normalizeNumber(value);

    if (typeof numericMode === 'number') return numericMode;

    const normalizedName = String(numericMode || '')
        .replace(/[^a-z]/gi, '')
        .toLowerCase();

    if (normalizedName === 'walletcredit') return BONUS_FUNDING_MODE_WALLET_CREDIT;
    if (normalizedName === 'isolatedbonusbalance') return BONUS_FUNDING_MODE_ISOLATED_BALANCE;
    if (normalizedName === 'nonwalletentitlement') return BONUS_FUNDING_MODE_NON_WALLET_ENTITLEMENT;

    return null;
};

export const normalizeBonus = (bonus) => {
    const rewardMetadataJson = firstDefined(bonus?.rewardMetadataJson, bonus?.RewardMetadataJson);
    const metadata = bonus?.metadata || bonus?.Metadata || parseBonusMetadata(rewardMetadataJson) || null;

    return {
        ...bonus,
        bonusInstanceId: firstDefined(bonus?.bonusInstanceId, bonus?.BonusInstanceId),
        campaignName: firstDefined(bonus?.campaignName, bonus?.CampaignName),
        status: normalizeNumber(firstDefined(bonus?.status, bonus?.Status)),
        progressStatus: normalizeNumber(firstDefined(bonus?.progressStatus, bonus?.ProgressStatus)),
        rewardType: normalizeNumber(firstDefined(bonus?.rewardType, bonus?.RewardType)),
        fundingMode: normalizeFundingMode(firstDefined(bonus?.fundingMode, bonus?.FundingMode)),
        rewardAmount: normalizeNumber(firstDefined(bonus?.rewardAmount, bonus?.RewardAmount)),
        totalAmount: normalizeNumber(firstDefined(bonus?.totalAmount, bonus?.TotalAmount)),
        remainingAmount: normalizeNumber(firstDefined(bonus?.remainingAmount, bonus?.RemainingAmount)),
        reservedAmount: normalizeNumber(firstDefined(bonus?.reservedAmount, bonus?.ReservedAmount)),
        remainingCount: normalizeNumber(firstDefined(bonus?.remainingCount, bonus?.RemainingCount)),
        currencyCode: firstDefined(bonus?.currencyCode, bonus?.CurrencyCode),
        requiredTurnoverAmount: normalizeNumber(firstDefined(bonus?.requiredTurnoverAmount, bonus?.RequiredTurnoverAmount)),
        achievedTurnoverAmount: normalizeNumber(firstDefined(bonus?.achievedTurnoverAmount, bonus?.AchievedTurnoverAmount)),
        remainingTurnoverAmount: normalizeNumber(firstDefined(bonus?.remainingTurnoverAmount, bonus?.RemainingTurnoverAmount)),
        progressPercentage: normalizeNumber(firstDefined(bonus?.progressPercentage, bonus?.ProgressPercentage)),
        conversionStatus: normalizeNumber(firstDefined(bonus?.conversionStatus, bonus?.ConversionStatus)),
        conversionAmount: normalizeNumber(firstDefined(bonus?.conversionAmount, bonus?.ConversionAmount)),
        conversionCompletedAtUtc: firstDefined(bonus?.conversionCompletedAtUtc, bonus?.ConversionCompletedAtUtc),
        walletTransactionId: firstDefined(bonus?.walletTransactionId, bonus?.WalletTransactionId),
        eligibleProductCodes: firstDefined(bonus?.eligibleProductCodes, bonus?.EligibleProductCodes),
        expiresAtUtc: firstDefined(bonus?.expiresAtUtc, bonus?.ExpiresAtUtc),
        rewardMetadataJson,
        metadata,
        freeBet: metadata?.freeBet || metadata?.FreeBet || bonus?.freeBet || bonus?.FreeBet || null,
        freeSpins: metadata?.freeSpins || metadata?.FreeSpins || bonus?.freeSpins || bonus?.FreeSpins || null,
    };
};

export const getBonusFundingMode = (bonus) => normalizeBonus(bonus)?.fundingMode ?? null;

export const isIsolatedBonusBalance = (bonus) => getBonusFundingMode(bonus) === BONUS_FUNDING_MODE_ISOLATED_BALANCE;

export const getCurrentBonusBalance = (bonuses) => {
    if (!Array.isArray(bonuses)) return 0;

    return bonuses.reduce((total, bonus) => {
        const normalizedBonus = normalizeBonus(bonus);

        if (normalizedBonus.fundingMode === BONUS_FUNDING_MODE_WALLET_CREDIT) return total;

        const remainingAmount = Number(normalizedBonus.remainingAmount);

        return total + (Number.isFinite(remainingAmount) ? Math.max(0, remainingAmount) : 0);
    }, 0);
};

export const isBonusProgressCompleted = (bonus) => {
    const normalizedBonus = normalizeBonus(bonus);
    const progressStatus = Number(normalizedBonus?.progressStatus);
    const progressPercentage = Number(normalizedBonus?.progressPercentage);
    const requiredTurnover = Number(normalizedBonus?.requiredTurnoverAmount);
    const achievedTurnover = Number(normalizedBonus?.achievedTurnoverAmount);
    const remainingTurnover = Number(normalizedBonus?.remainingTurnoverAmount);

    if (progressStatus === 2) return true;
    if (Number.isFinite(progressPercentage) && progressPercentage >= 100) return true;
    if (Number.isFinite(requiredTurnover) && requiredTurnover > 0 && Number.isFinite(achievedTurnover) && achievedTurnover >= requiredTurnover) return true;

    return Number.isFinite(requiredTurnover) && requiredTurnover > 0 && Number.isFinite(remainingTurnover) && remainingTurnover <= 0;
};

export const isBonusLifecycleCompleted = (bonus) => {
    const status = normalizeBonus(bonus)?.status;

    return Number(status) === BONUS_STATUS_COMPLETED || String(status || '').trim().toLowerCase() === 'completed';
};

export const getAuthoritativeIsolatedBonusCompletionAmount = (bonus) => {
    const normalizedBonus = normalizeBonus(bonus);
    const conversionStatus = normalizedBonus?.conversionStatus;
    const conversionAmount = Number(normalizedBonus?.conversionAmount);
    const conversionSucceeded =
        Number(conversionStatus) === BONUS_BALANCE_CONVERSION_STATUS_SUCCEEDED ||
        String(conversionStatus || '').trim().toLowerCase() === 'succeeded';

    if (!conversionSucceeded || !Number.isFinite(conversionAmount)) return null;

    return Math.max(0, conversionAmount);
};

export const isBonusExpired = (bonus) => {
    if (!bonus?.expiresAtUtc) return false;

    const expiresAt = new Date(
        String(bonus.expiresAtUtc).endsWith("Z")
            ? bonus.expiresAtUtc
            : `${bonus.expiresAtUtc}Z`
    );

    return expiresAt <= new Date();
};

export const ticketTypeMatches = (allowedTicketTypes, betType) => {
    // allowedTicketTypes:
    // 1 = Single
    // 2 = Multiple
    // 3 = System

    if (isEmptyRestriction(allowedTicketTypes)) return true;

    const ticketTypeMap = {
        1: "single",
        2: "multiple",
        3: "system",
    };

    const normalizedBetType = String(betType || "").toLowerCase();

    return allowedTicketTypes.some((type) => {
        const mappedType = ticketTypeMap[Number(type)];

        return String(mappedType || type).toLowerCase() === normalizedBetType;
    });
};

export const getBonusAmount = (bonus) => {
    if (bonus?.freeBet?.amount != null) return Number(bonus.freeBet.amount);
    if (bonus?.remainingAmount != null) return Number(bonus.remainingAmount);
    if (bonus?.rewardAmount != null) return Number(bonus.rewardAmount);

    return 0;
};

export const getSlipOdd = (slip) => {
    const odd = Number(slip?.Odd);

    return Number.isFinite(odd) ? odd : 0;
};

export const getCombinedOdds = (slips) => {
    if (!Array.isArray(slips) || slips.length === 0) return 0;

    return slips.reduce((total, slip) => {
        const odd = getSlipOdd(slip);

        return total * odd;
    }, 1);
};

export const sportsBetScopeMatches = (sportsBetScope, slips) => {
    // Backend:
    // 0 = Any
    // 1 = PrematchOnly
    // 2 = LiveOnly
    // [] / null = Any
    // [1, 2] = prematch and live allowed

    const scopes = Array.isArray(sportsBetScope)
        ? sportsBetScope.map(Number)
        : sportsBetScope != null
            ? [Number(sportsBetScope)]
            : [];

    const restrictedScopes = scopes.filter((scope) => scope === 1 || scope === 2);

    if (restrictedScopes.length === 0) return true;

    const allowsPrematch = restrictedScopes.includes(1);
    const allowsLive = restrictedScopes.includes(2);

    return slips.every((slip) => {
        const isLive = !!slip.Live;

        if (isLive) return allowsLive;

        return allowsPrematch;
    });
};

export const getSportsBetScopeReason = (sportsBetScope) => {
    const scopes = Array.isArray(sportsBetScope)
        ? sportsBetScope.map(Number)
        : sportsBetScope != null
            ? [Number(sportsBetScope)]
            : [];

    const allowsPrematch = scopes.includes(1);
    const allowsLive = scopes.includes(2);

    if (allowsPrematch && !allowsLive) {
        return "Free bet is valid only for prematch bets";
    }

    if (allowsLive && !allowsPrematch) {
        return "Free bet is valid only for live bets";
    }

    return "Free bet is not valid for this bet scope";
};

export const getBaseBonusEligibility = ({
    bonus,
    productCode,
    expiredReason = "Bonus has expired",
}) => {
    const normalizedBonus = normalizeBonus(bonus);

    if (isBonusExpired(normalizedBonus)) {
        return {
            qualifies: false,
            reason: expiredReason,
        };
    }

    const productCodes = toArray(
        normalizedBonus?.eligibleProductCodes ||
        normalizedBonus?.metadata?.eligibleProductCodes ||
        normalizedBonus?.metadata?.EligibleProductCodes
    );

    if (
        productCodes.length > 0 &&
        !stringArrayIncludes(productCodes, productCode)
    ) {
        return {
            qualifies: false,
            reason: `Only available for ${productCodes.join(", ")}`,
        };
    }


    return {
        qualifies: true,
        reason: null,
    };
};

export const bonusHasProductCode = (bonus, productCodesToMatch = []) => {
    const normalizedBonus = normalizeBonus(bonus);

    const productCodes = toArray(
        normalizedBonus?.eligibleProductCodes ||
        normalizedBonus?.metadata?.eligibleProductCodes ||
        normalizedBonus?.metadata?.EligibleProductCodes
    );

    if (productCodes.length === 0) return true;

    return productCodes.some((code) =>
        productCodesToMatch.some(
            (targetCode) =>
                String(code).toLowerCase() === String(targetCode).toLowerCase()
        )
    );
};

export const freeBetQualifies = ({
    freeBetBonus,
    slips,
    betType,
    providerId = 1,
}) => {
    const normalizedBonus = normalizeBonus(freeBetBonus);

    if (!normalizedBonus?.freeBet) {
        return {
            qualifies: false,
            reason: "Invalid free bet",
        };
    }

    if (!Array.isArray(slips) || slips.length === 0) {
        return {
            qualifies: false,
            reason: "Add a selection to use this free bet",
        };
    }

    if (betType === "System") {
        return {
            qualifies: false,
            reason: "Free bet is not valid for system bets",
        };
    }

    const baseEligibility = getBaseBonusEligibility({
        bonus: normalizedBonus,
        productCode: SPORTS_PRODUCT_CODE,
        expiredReason: "Free bet has expired",
    });

    if (!baseEligibility.qualifies) {
        return baseEligibility;
    }

    const freeBet = normalizedBonus.freeBet;
    const restrictions = freeBet.usageRestrictions || {};

    if (!sportsBetScopeMatches(restrictions.sportsBetScope, slips)) {
        if (restrictions.sportsBetScope === 1) {
            return {
                qualifies: false,
                reason: "Free bet is valid only for prematch bets",
            };
        }

        if (restrictions.sportsBetScope === 2) {
            return {
                qualifies: false,
                reason: "Free bet is valid only for live bets",
            };
        }
    }

    if (
        Array.isArray(restrictions.productCodes) &&
        restrictions.productCodes.length > 0 &&
        !stringArrayIncludes(restrictions.productCodes, SPORTS_PRODUCT_CODE) &&
        !stringArrayIncludes(restrictions.productCodes, SPORTSBOOK_PRODUCT_CODE)
    ) {
        return {
            qualifies: false,
            reason: "Free bet is not valid for sportsbook",
        };
    }

    if (
        !isEmptyRestriction(restrictions.allowedTicketTypes) &&
        !ticketTypeMatches(restrictions.allowedTicketTypes, betType)
    ) {
        return {
            qualifies: false,
            reason: `Free bet is not valid for ${betType} bets`,
        };
    }

    // if (
    //     !isEmptyRestriction(restrictions.providerIds) &&
    //     !restrictions.providerIds.map(Number).includes(Number(providerId))
    // ) {
    //     return {
    //         qualifies: false,
    //         reason: "Free bet is not valid for this provider",
    //     };
    // }

    const invalidSlip = slips.find((slip) => {
        if (
            !isEmptyRestriction(restrictions.sportIds) &&
            !restrictions.sportIds.map(Number).includes(Number(slip.SportId))
        ) {
            return true;
        }

        if (
            !isEmptyRestriction(restrictions.categoryIds) &&
            !restrictions.categoryIds
                .map(Number)
                .includes(Number(slip.CategoryId))
        ) {
            return true;
        }

        if (
            !isEmptyRestriction(restrictions.leagueIds) &&
            !restrictions.leagueIds
                .map(Number)
                .includes(Number(slip.TournamentId))
        ) {
            return true;
        }

        if (
            !isEmptyRestriction(restrictions.marketTypeIds) &&
            !restrictions.marketTypeIds
                .map(Number)
                .includes(Number(slip.MarketTypeId))
        ) {
            return true;
        }

        if (
            !isEmptyRestriction(restrictions.gameIds) &&
            !restrictions.gameIds.map(Number).includes(Number(slip.MatchId))
        ) {
            return true;
        }

        return false;
    });

    if (invalidSlip) {
        return {
            qualifies: false,
            reason: "One or more selections are not eligible for this free bet",
        };
    }

    return {
        qualifies: true,
        reason: null,
    };
};

export const getSportsBonusEligibility = ({ bonus }) => {
    const normalizedBonus = normalizeBonus(bonus);

    const baseEligibility = getBaseBonusEligibility({
        bonus: normalizedBonus,
        productCode: SPORTS_PRODUCT_CODE,
        expiredReason: "Bonus has expired",
    });

    if (!baseEligibility.qualifies) {
        return baseEligibility;
    }

    return {
        qualifies: true,
        reason: null,
    };
};

export const getCasinoBonusEligibility = ({ bonus, game }) => {
    const normalizedBonus = normalizeBonus(bonus);

    if (!isIsolatedBonusBalance(normalizedBonus)) {
        return {
            qualifies: false,
            reason: "This bonus is already held in the real wallet",
        };
    }

    const baseEligibility = getBaseBonusEligibility({
        bonus: normalizedBonus,
        productCode: game?.isLiveCasino ? LIVE_CASINO_PRODUCT_CODE : CASINO_PRODUCT_CODE,
        expiredReason: "Bonus has expired",
    });

    if (!baseEligibility.qualifies) {
        return baseEligibility;
    }

    return {
        qualifies: true,
        reason: null,
    };
};

export const getFreeSpinEligibility = ({ bonus, game }) => {
    const normalizedBonus = normalizeBonus(bonus);
    const freeSpins = normalizedBonus.freeSpins;
    const gameProductCode = game?.isLiveCasino ? LIVE_CASINO_PRODUCT_CODE : CASINO_PRODUCT_CODE;

    if (!freeSpins) {
        return {
            qualifies: false,
            reason: "Invalid free spins bonus",
        };
    }

    const baseEligibility = getBaseBonusEligibility({
        bonus: normalizedBonus,
        productCode: gameProductCode,
        expiredReason: "Free spins bonus has expired",
    });

    if (!baseEligibility.qualifies) {
        return baseEligibility;
    }

    if (
        Array.isArray(freeSpins.productCodes) &&
        freeSpins.productCodes.length > 0 &&
        !stringArrayIncludes(freeSpins.productCodes, gameProductCode)
    ) {
        return {
            qualifies: false,
            reason: `Only available for ${freeSpins.productCodes.join(", ")}`,
        };
    }

    if (!numberArrayIncludes(freeSpins.gameIds, game?.gameId)) {
        return {
            qualifies: false,
            reason: "This free spins bonus is not available for this game",
        };
    }

    if (!numberArrayIncludes(freeSpins.providerIds, game?.providerId)) {
        return {
            qualifies: false,
            reason: "This free spins bonus is not available for this provider",
        };
    }

    if (!numberArrayIncludes(freeSpins.categoryIds, game?.gameCategoryId)) {
        return {
            qualifies: false,
            reason: "This free spins bonus is not available for this category",
        };
    }

    return {
        qualifies: true,
        reason: null,
    };
};
