# Matchmaker Algorithm v4 Matching Engine

The matching engine is housed in `backend/lib/matching/matchmaker.js`. It ranks candidate profiles from `database/seed/profiles.json` against a customer profile from `database/seed/customers.json` using weighted criteria.

## Category Scoring Rules

1. **Caste Compatibility**:
   - Same religion + Same caste: 1.0
   - Same religion + Different caste: 0.7
   - Different religion: 0.0

2. **Mother Tongue**:
   - Same mother tongue: 1.0
   - Different: 0.3

3. **Location & Relocation**:
   - Same city: 1.0
   - Different city + either open to relocate: 0.6
   - Different city + neither open to relocate: 0.1

4. **Family Values**:
   - Aligned values: 1.0
   - Adjacent values (e.g. traditional vs moderate): 0.7
   - Mismatch (traditional vs liberal): 0.2

5. **Dietary Compatibility**:
   - Same dietary preference: 1.0
   - Candidate is veg/Jain eating loose options: 0.9
   - Mismatches scored by difference distance (Veg vs non-veg is 0.2; Jain vs non-veg is 0.0).

6. **Horoscope Alignment**:
   - Aligned match preferences: 1.0
   - Flexible preferences: 0.5

## Weight Normalization & Overall Score

- **Ranked Weights**: Matches priority keys from customer's `partnerPriorities` list. Mapped by rank index:
  - Rank 1 weight: `1.0`
  - Rank 2 weight: `0.85`
  - Rank 3 weight: `0.70`
  - Formula: `Math.max(0.3, 1.0 - (rankIndex * 0.15))`
- **Unranked Weights**: Default to `0.6`.
- **Normalization Formula**:
  $$\text{Compatibility Score} = \frac{\sum (\text{score}_i \times \text{weight}_i)}{\sum \text{weight}_i} \times 100$$
