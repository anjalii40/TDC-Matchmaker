// Format currency in Indian format
export const formatSalary = (amount) => {
  if (!amount) return 'N/A';
  const lpa = amount / 100000;
  return `${lpa} LPA (₹${amount.toLocaleString('en-IN')})`;
};

// Compute user initials
export const getInitials = (first, last) => {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
};

// Return color matching journey stage
export const getStageColor = (status) => {
  switch (status) {
    case 'New': return '#2E6894';
    case 'Active': return '#4F9D9C';
    case 'Matched': return '#5A9E6C';
    case 'Closed': return '#8E8A85';
    default: return 'var(--primary-teal)';
  }
};

// Return background color matching journey stage
export const getStageBgColor = (status) => {
  switch (status) {
    case 'New': return '#E9F2F9';
    case 'Active': return '#E8F5F5';
    case 'Matched': return '#EAF5ED';
    case 'Closed': return '#F0EEEC';
    default: return 'var(--bg-cream)';
  }
};

// Calculate profile completeness percentage client-side
export const getProfileCompleteness = (customer) => {
  const fields = [
    'firstName', 'lastName', 'gender', 'dob', 'age', 'city', 'height', 'email',
    'phone', 'undergraduateCollege', 'degree', 'income', 'currentCompany',
    'designation', 'languagesKnown', 'siblings', 'caste', 'religion', 'wantKids',
    'openToRelocate', 'openToPets', 'gotra', 'motherTongue', 'dietaryPreference',
    'manglikStatus', 'familyType', 'familyValues', 'complexion', 'horoscopeMatchPreference',
    'maritalStatus'
  ];
  
  let filled = 0;
  fields.forEach(field => {
    const val = customer[field];
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val) && val.length === 0) {
        // empty array
      } else {
        filled++;
      }
    }
  });
  
  return Math.round((filled / fields.length) * 100);
};
