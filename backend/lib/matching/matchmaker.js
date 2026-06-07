/**
 * Matchmaker Algorithm v4
 * High-fidelity Indian Matrimonial Matchmaking engine
 */

/**
 * Computes dietary compatibility based on hierarchy: Jain (4) > Veg (3) > Eggetarian (2) > Non-Veg (1)
 */
function getDietaryCompatibility(diet1, diet2) {
  if (diet1 === diet2) return 1.0;

  const ranks = {
    'jain': 4,
    'veg': 3,
    'eggetarian': 2,
    'non-veg': 1
  };

  const r1 = ranks[diet1.toLowerCase()] || 1;
  const r2 = ranks[diet2.toLowerCase()] || 1;

  if (r2 > r1) {
    // Candidate is stricter than client (e.g. client is non-veg, cand is veg).
    // Stricter food options can easily be accommodated by looser eaters.
    return 0.9;
  } else {
    // Candidate is looser than client (e.g. client is veg, cand is non-veg).
    // This is generally a source of friction, proportional to distance.
    const diff = r1 - r2;
    if (diff === 1) return 0.6; // Stricter observer vs next level down (e.g., Jain vs Veg)
    if (diff === 2) return 0.2; // Veg vs Non-Veg
    return 0.0; // Jain vs Non-Veg (extreme mismatch)
  }
}

/**
 * Resolves the weight for a category based on the client's partnerPriorities ranked list.
 * If not present in the ranked array, defaults to 0.6.
 * @param {Object} customer - The client profile containing partnerPriorities
 * @param {string} key - The priority category key
 * @returns {number} The weight coefficient
 */
function getCategoryWeight(customer, key) {
  if (customer.partnerPriorities && customer.partnerPriorities.ranked) {
    const found = customer.partnerPriorities.ranked.find(item => item.key === key);
    if (found) {
      return Number(found.weight);
    }
  }
  return 0.6; // Default weight for unranked categories
}

/**
 * Calculates compatibility details between a customer and a potential candidate.
 * Returns structured breakdowns { key, label, score, max } and narratives.
 */
export function calculateCompatibility(customer, candidate) {
  let breakdown = [];
  let narratives = [];
  let weightedScoreSum = 0;
  let weightSum = 0;

  const addCategory = (key, label, rawScore, narrativeText) => {
    const weight = getCategoryWeight(customer, key);
    const categoryScore = rawScore * weight;
    
    weightedScoreSum += categoryScore;
    weightSum += weight;
    narratives.push(narrativeText);

    breakdown.push({
      key,
      label,
      score: Math.round(categoryScore * 10) / 10,
      max: Math.round(weight * 10) / 10
    });
  };

  // --- 1. Caste Compatibility (Key: caste) ---
  let casteScore = 0;
  let casteNarrative = "";
  if (customer.religion === candidate.religion) {
    if (customer.caste === candidate.caste && customer.caste !== 'Open/Other') {
      casteScore = 1.0;
      casteNarrative = `Both families share the same ${customer.religion} (${customer.caste}) background, ensuring high alignment on social values and family integration.`;
    } else {
      casteScore = 0.7;
      casteNarrative = `They share a common ${customer.religion} religious foundation, supporting cultural familiarity.`;
    }
  } else {
    casteScore = 0.0;
    casteNarrative = `They come from different religious traditions (${customer.religion} vs ${candidate.religion}), which may require inter-faith compatibility adjustments.`;
  }
  addCategory('caste', 'Caste Compatibility', casteScore, casteNarrative);

  // --- 2. Mother Tongue (Key: motherTongue) ---
  let langScore = 0;
  let langNarrative = "";
  if (customer.motherTongue === candidate.motherTongue) {
    langScore = 1.0;
    langNarrative = `Sharing ${customer.motherTongue} as their mother tongue makes communication and family interactions highly natural.`;
  } else {
    langScore = 0.3;
    langNarrative = `Their mother tongues differ (${customer.motherTongue} vs ${candidate.motherTongue}), though they are both conversational in English.`;
  }
  addCategory('motherTongue', 'Mother Tongue', langScore, langNarrative);

  // --- 3. Location & Relocation (Key: location) ---
  let locScore = 0;
  let locNarrative = "";
  if (customer.city === candidate.city) {
    locScore = 1.0;
    locNarrative = `Both reside in ${customer.city}, allowing for seamless local dating without geographic friction.`;
  } else if (customer.openToRelocate === 'Yes' || candidate.openToRelocate === 'Yes') {
    locScore = 0.6;
    const flexPerson = customer.openToRelocate === 'Yes' ? customer.firstName : candidate.firstName;
    locNarrative = `Though living in different cities (${customer.city} vs ${candidate.city}), ${flexPerson} is open to relocating for the right relationship.`;
  } else {
    locScore = 0.1;
    locNarrative = `They are based in different cities (${customer.city} vs ${candidate.city}) with limited relocation flexibility.`;
  }
  addCategory('location', 'Location & Relocation', locScore, locNarrative);

  // --- 4. Family Values & Setup (Key: familyValues) ---
  const valMap = { traditional: 1, moderate: 2, liberal: 3 };
  const valDiff = Math.abs(valMap[customer.familyValues] - valMap[candidate.familyValues]);
  let valScore = 0;
  let valNarrative = "";
  if (valDiff === 0) {
    valScore = 1.0;
    valNarrative = `They share an aligned ${customer.familyValues} family values system and prefer a ${customer.familyType} family environment.`;
  } else if (valDiff === 1) {
    valScore = 0.7;
    valNarrative = `Their ${customer.familyValues} and ${candidate.familyValues} values systems are adjacent, providing standard cultural compatibility.`;
  } else {
    valScore = 0.2;
    valNarrative = `There is a moderate values difference between their ${customer.familyValues} and ${candidate.familyValues} lifestyles.`;
  }
  addCategory('familyValues', 'Family Values', valScore, valNarrative);

  // --- 5. Salary & Income (Key: salary) ---
  let salaryScore = 0;
  let salaryNarrative = "";
  const candIncome = candidate.income || 0;
  const incomePrefRange = customer.preferredIncomeRange;

  if (incomePrefRange && incomePrefRange.min !== undefined && incomePrefRange.max !== undefined) {
    const min = incomePrefRange.min;
    const max = incomePrefRange.max;

    if (candIncome >= min && candIncome <= max) {
      salaryScore = 1.0;
      salaryNarrative = `The candidate's salary (${candIncome / 100000} LPA) falls perfectly within the preferred bracket of ${min / 100000}-${max / 100000} LPA.`;
    } else {
      const lowerBoundMargin = min * 0.75;
      const upperBoundMargin = max * 1.25;

      if (candIncome >= lowerBoundMargin && candIncome <= upperBoundMargin) {
        salaryScore = 0.6;
        salaryNarrative = `The candidate's income (${candIncome / 100000} LPA) is slightly outside the preferred range, but remains highly competitive.`;
      } else {
        salaryScore = 0.1;
        salaryNarrative = `There is a notable income mismatch relative to the client's preference of ${min / 100000}-${max / 100000} LPA.`;
      }
    }
  } else {
    const custIncome = customer.income || 0;
    if (candIncome >= custIncome * 0.9) {
      salaryScore = 1.0;
      salaryNarrative = `The candidate earns a comparable or higher package (${candIncome / 100000} LPA), aligning with the client's career standing.`;
    } else {
      salaryScore = 0.6;
      salaryNarrative = `The candidate's salary is slightly below, but in a comparable bracket as the client.`;
    }
  }
  addCategory('salary', 'Career & Income', salaryScore, salaryNarrative);

  // --- 6. Dietary Preference (Key: dietaryPreference) ---
  const dietCompat = getDietaryCompatibility(customer.dietaryPreference, candidate.dietaryPreference);
  let dietNarrative = "";
  if (dietCompat === 1.0) {
    dietNarrative = `Both share the same ${customer.dietaryPreference} dietary preferences, simplifying home routine coordination.`;
  } else if (dietCompat >= 0.6) {
    dietNarrative = `Their dietary preferences (${customer.dietaryPreference} vs ${candidate.dietaryPreference}) are highly compatible in a hierarchical kitchen.`;
  } else {
    dietNarrative = `A food preference mismatch exists (${customer.dietaryPreference} vs ${candidate.dietaryPreference}), requiring kitchen adjustments.`;
  }
  addCategory('dietaryPreference', 'Diet Compatibility', dietCompat, dietNarrative);

  // --- 7. Education Level (Key: education) ---
  let eduScore = 0;
  let eduNarrative = "";
  if (customer.degree === candidate.degree || 
     (['B.Tech', 'B.E.'].includes(customer.degree) && ['B.Tech', 'B.E.'].includes(candidate.degree))) {
    eduScore = 1.0;
    eduNarrative = `Both possess matching educational levels or fields (${customer.degree} vs ${candidate.degree}), ensuring intellectual compatibility.`;
  } else {
    eduScore = 0.3;
    eduNarrative = `Their educational backgrounds differ (${customer.degree} vs ${candidate.degree}), though both hold professional undergraduate qualifications.`;
  }
  addCategory('education', 'Education Level', eduScore, eduNarrative);

  // --- 8. Horoscope Match (Key: horoscope) ---
  let horoScore = 0;
  let horoNarrative = "";
  if (customer.horoscopeMatchPreference === 'Yes' && candidate.horoscopeMatchPreference === 'Yes') {
    horoScore = 1.0;
    horoNarrative = `Horoscope alignment is mutually valued and matching preferences are fully satisfied.`;
  } else {
    horoScore = 0.5;
    horoNarrative = `Both profiles have flexible or standard horoscope matching requirements.`;
  }
  addCategory('horoscope', 'Horoscope Alignment', horoScore, horoNarrative);

  // --- 9. Age Alignment (Key: age) - Defaults to weight 0.6 since not prioritizeable ---
  let ageScore = 0;
  let ageNarrative = "";
  const prefMin = customer.agePreferenceMin;
  const prefMax = customer.agePreferenceMax;

  if (prefMin !== undefined && prefMax !== undefined) {
    const age = candidate.age;
    if (age >= prefMin && age <= prefMax) {
      ageScore = 1.0;
      ageNarrative = `The candidate's age (${age} yrs) falls perfectly within the preferred range of ${prefMin}-${prefMax} years.`;
    } else {
      const diff = age < prefMin ? prefMin - age : age - prefMax;
      ageScore = Math.max(0.0, 1.0 - (diff * 0.15));
      const term = age < prefMin ? "younger" : "older";
      ageNarrative = `The candidate is ${diff} yrs ${term} than the preferred age range of ${prefMin}-${prefMax} years.`;
    }
  } else {
    const ageDiff = candidate.age - customer.age;
    const isCustomerFemale = customer.gender === 'Female';
    if (isCustomerFemale) {
      if (ageDiff >= 0 && ageDiff <= 5) {
        ageScore = 1.0;
        ageNarrative = `The age difference is optimal, with the candidate being ${ageDiff} years older.`;
      } else {
        ageScore = 0.5;
        ageNarrative = `The age difference is acceptable, with candidate being ${Math.abs(ageDiff)} years difference.`;
      }
    } else {
      if (ageDiff >= -5 && ageDiff <= 0) {
        ageScore = 1.0;
        ageNarrative = `The age gap is highly aligned, with the partner being ${Math.abs(ageDiff)} years younger.`;
      } else {
        ageScore = 0.5;
        ageNarrative = `The age difference is acceptable, with candidate being ${Math.abs(ageDiff)} years difference.`;
      }
    }
  }
  addCategory('age', 'Age Alignment', ageScore, ageNarrative);

  // --- Sum and Normalize final score ---
  const finalScore = weightSum > 0 ? (weightedScoreSum / weightSum) * 100 : 0;

  return {
    score: Math.min(100, Math.round(finalScore)),
    prioritiesApplied: customer.partnerPriorities && customer.partnerPriorities.ranked && customer.partnerPriorities.ranked.length > 0,
    breakdown,
    narratives
  };
}

/**
 * Filter and suggest matches for a target customer.
 * @param {Object} customer - The active client profile
 * @param {Array} pool - The list of all dummy profiles
 * @returns {Array} Top 5 matches with scores and metadata
 */
export function getMatchesForCustomer(customer, pool) {
  const isMale = customer.gender === 'Male';
  const oppositeGender = isMale ? 'Female' : 'Male';

  // Filter pool by opposite gender
  let candidates = pool.filter(p => p.gender === oppositeGender);

  let matchedResults = [];

  if (isMale) {
    // Filter by basic age boundaries and kids
    let filtered = candidates.filter(female => {
      let ageOk = false;
      if (customer.agePreferenceMin !== undefined && customer.agePreferenceMax !== undefined) {
        ageOk = female.age >= (customer.agePreferenceMin - 2) && female.age <= (customer.agePreferenceMax + 2);
      } else {
        const ageDiff = customer.age - female.age;
        ageOk = ageDiff >= -2 && ageDiff <= 7;
      }
      
      const kidsOk = customer.wantKids === female.wantKids || customer.wantKids === 'Maybe' || female.wantKids === 'Maybe';
      return ageOk && kidsOk;
    });

    if (filtered.length < 5) {
      filtered = candidates; // Fallback to all females
    }

    matchedResults = filtered.map(cand => {
      const compat = calculateCompatibility(customer, cand);
      return {
        profile: cand,
        score: compat.score,
        prioritiesApplied: compat.prioritiesApplied,
        breakdown: compat.breakdown,
        narratives: compat.narratives,
        label: compat.score >= 80 ? "High Potential" : compat.score >= 60 ? "Good Fit" : "Maybe"
      };
    });

  } else {
    // Female customer: Evaluates male candidates
    let filtered = candidates.filter(male => {
      const kidsConflict = (customer.wantKids === 'Yes' && male.wantKids === 'No') || (customer.wantKids === 'No' && male.wantKids === 'Yes');
      const relocateConflict = (customer.openToRelocate === 'No' && male.openToRelocate === 'No' && customer.city !== male.city);
      return !kidsConflict && !relocateConflict;
    });

    if (filtered.length < 5) {
      filtered = candidates;
    }

    matchedResults = filtered.map(cand => {
      const compat = calculateCompatibility(customer, cand);
      return {
        profile: cand,
        score: compat.score,
        prioritiesApplied: compat.prioritiesApplied,
        breakdown: compat.breakdown,
        narratives: compat.narratives,
        label: compat.score >= 80 ? "High Potential" : compat.score >= 60 ? "Good Fit" : "Maybe"
      };
    });
  }

  // Sort by score descending and return top 5
  matchedResults.sort((a, b) => b.score - a.score);
  return matchedResults.slice(0, 5);
}
