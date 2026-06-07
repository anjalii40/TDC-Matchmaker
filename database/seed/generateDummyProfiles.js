const fs = require('fs');
const path = require('path');

// Target file
const targetFile = path.join('/Users/anjaliprajapati/Desktop/Matchmaker Dashboard/data/profiles.json');

const CITIES_BY_INDUSTRY = {
  tech: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  finance: ['Mumbai', 'Delhi', 'Bangalore'],
  medical: ['Mumbai', 'Delhi', 'Pune', 'Chennai', 'Bangalore'],
  legal: ['Delhi', 'Mumbai', 'Bangalore']
};

const COLLEGES_BY_FIELD = {
  tech: [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani',
    'NIT Trichy', 'COEP Pune', 'Anna University', 'VIT Vellore'
  ],
  finance: [
    'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi',
    'Symbiosis Institute', 'Christ University', 'St. Xavier\'s College', 'HR College'
  ],
  medical: [
    'All India Institute of Medical Sciences (AIIMS)',
    'Armed Forces Medical College (AFMC) Pune',
    'Maulana Azad Medical College',
    'Kasturba Medical College Manipal'
  ],
  legal: [
    'National Law School of India University (NLSIU) Bangalore',
    'NALSAR University of Law Hyderabad',
    'Faculty of Law Delhi University',
    'Symbiosis Law School Pune',
    'Government Law College Mumbai'
  ]
};

const COMPANIES_BY_FIELD = {
  tech: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'TCS', 'Infosys'],
  finance: ['McKinsey & Co', 'Boston Consulting Group', 'HDFC Bank', 'ICICI Bank', 'Deloitte', 'PwC', 'KPMG', 'EY', 'Reliance Industries'],
  medical: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'Medanta Medicity'],
  legal: ['Amarchand Mangaldas', 'AZB & Partners', 'Khaitan & Co', 'Trilegal', 'Luthra & Luthra', 'ICICI Bank Legal Dept', 'Tata Motors Legal']
};

const CULTURAL_PROFILES = [
  {
    name: 'North Indian Hindu',
    religion: 'Hinduism',
    castes: ['Brahmin', 'Kshatriya', 'Vaishya', 'Kayastha'],
    gotras: ['Kashyap', 'Bharadwaj', 'Vashishta', 'Shandilya'],
    motherTongue: 'Hindi',
    languages: ['English', 'Hindi', 'Punjabi'],
    firstNamesMale: ['Arjun', 'Aarav', 'Rahul', 'Vihaan', 'Aditya', 'Rohan', 'Kabir', 'Ishaan', 'Dev', 'Ansh', 'Krishna', 'Karan', 'Rishi', 'Neil', 'Aryan', 'Samar', 'Varun', 'Rudra', 'Abhishek', 'Gaurav', 'Manish', 'Siddharth', 'Pranav', 'Vivek', 'Akash', 'Nikhil', 'Tushar', 'Utkarsh', 'Mayank', 'Harsh', 'Shreyas', 'Dhruv', 'Yash'],
    firstNamesFemale: ['Priya', 'Ananya', 'Diya', 'Aanya', 'Kiara', 'Isha', 'Meera', 'Riya', 'Sanya', 'Shruti', 'Sneha', 'Neha', 'Pooja', 'Aishwarya', 'Kriti', 'Aditi', 'Kavya', 'Tanvi', 'Anjali', 'Deepika', 'Prisha', 'Avani', 'Nisha', 'Riddhi', 'Siddhi', 'Shreya', 'Divya', 'Payal', 'Kajal', 'Jyoti', 'Sunita', 'Kiran', 'Swati', 'Preeti', 'Meghna', 'Pallavi', 'Rashmi', 'Nidhi', 'Shikha', 'Aaradhya', 'Anushka', 'Sonam', 'Karishma', 'Priyanka', 'Alia', 'Sara', 'Janhvi', 'Tara', 'Khushi'],
    lastNames: ['Sharma', 'Verma', 'Gupta', 'Mehta', 'Joshi', 'Mishra', 'Trivedi', 'Pandey', 'Dubey', 'Sinha', 'Kapoor', 'Malhotra', 'Khanna', 'Chawla', 'Grover', 'Bhasin']
  },
  {
    name: 'Punjabi Sikh',
    religion: 'Sikhism',
    castes: ['Open/Other'],
    gotras: ['N/A'],
    motherTongue: 'Punjabi',
    languages: ['English', 'Punjabi', 'Hindi'],
    firstNamesMale: ['Gurpreet', 'Harpreet', 'Manpreet', 'Diljit', 'Amrinder', 'Ranveer', 'Angad', 'Karanveer', 'Jaspal', 'Prabhjot'],
    firstNamesFemale: ['Jasmin', 'Harpreet', 'Manpreet', 'Kiran', 'Meher', 'Simran', 'Kaur', 'Preet', 'Avneet', 'Gurnoor'],
    lastNames: ['Singh', 'Kaur', 'Grewal', 'Sandhu', 'Gill', 'Dhillon', 'Sidhu', 'Bajwa', 'Sodhi']
  },
  {
    name: 'Marathi Hindu',
    religion: 'Hinduism',
    castes: ['Maratha', 'Brahmin', 'Kayastha'],
    gotras: ['Gautam', 'Atri', 'Kashyap', 'Bharadwaj'],
    motherTongue: 'Marathi',
    languages: ['English', 'Marathi', 'Hindi'],
    firstNamesMale: ['Sanjay', 'Vikram', 'Aditya', 'Rohan', 'Chinmay', 'Aniket', 'Suyash', 'Abhijit', 'Swapnil', 'Prasad'],
    firstNamesFemale: ['Swati', 'Pradnya', 'Avani', 'Riddhi', 'Siddhi', 'Tanvi', 'Kalyani', 'Madhura', 'Anjali', 'Pallavi'],
    lastNames: ['Deshmukh', 'Kulkarni', 'Joshi', 'Patil', 'Shinde', 'Bhat', 'Bhonsle', 'Pawar', 'Jadhav', 'Tambe']
  },
  {
    name: 'South Indian Hindu',
    religion: 'Hinduism',
    castes: ['Brahmin', 'Kshatriya', 'Open/Other'],
    gotras: ['Bharadwaj', 'Kashyap', 'Gautam', 'Atri'],
    motherTongue: 'Tamil', // random choice between Tamil/Telugu/Kannada during generation
    languages: ['English', 'Hindi'], // mother tongue added dynamically
    firstNamesMale: ['Karthik', 'Hari', 'Raghav', 'Madhav', 'Sai', 'Ashwin', 'Venkat', 'Raghunath', 'Srinivas', 'Vignesh', 'Abhilash', 'Vikram', 'Anant', 'Sudhakar'],
    firstNamesFemale: ['Divya', 'Kavya', 'Nitya', 'Shruti', 'Meenakshi', 'Swathy', 'Harini', 'Keerthi', 'Shanthi', 'Sowmya', 'Vidya', 'Anusha', 'Radhika'],
    lastNames: ['Rao', 'Nair', 'Iyer', 'Pillai', 'Reddy', 'Naidu', 'Murthy', 'Menon', 'Shetty', 'Hegde', 'Gowda', 'Sastry', 'Subramanian', 'Krishnan']
  },
  {
    name: 'Bengali Hindu',
    religion: 'Hinduism',
    castes: ['Brahmin', 'Kayastha'],
    gotras: ['Shandilya', 'Kashyap', 'Bharadwaj'],
    motherTongue: 'Bengali',
    languages: ['English', 'Bengali', 'Hindi'],
    firstNamesMale: ['Sourav', 'Debashis', 'Subhasis', 'Anirban', 'Rupak', 'Joy', 'Niladri', 'Arijit', 'Rudranil', 'Amitava'],
    firstNamesFemale: ['Priyanka', 'Sreya', 'Debasree', 'Meghna', 'Tanusree', 'Bidisha', 'Anwesha', 'Rituparna', 'Moumita', 'Riya'],
    lastNames: ['Chatterjee', 'Mukherjee', 'Banerjee', 'Sen', 'Das', 'Dutta', 'Roy', 'Bose', 'Choudhury', 'Ganguly', 'Ghoshal']
  },
  {
    name: 'Jain Gujarati',
    religion: 'Jainism',
    castes: ['Vaishya', 'Open/Other'],
    gotras: ['N/A'],
    motherTongue: 'Gujarati',
    languages: ['English', 'Gujarati', 'Hindi'],
    firstNamesMale: ['Shreyas', 'Bhavin', 'Ketan', 'Parth', 'Hitesh', 'Smit', 'Viren', 'Amit', 'Nirav', 'Pratik'],
    firstNamesFemale: ['Swati', 'Preeti', 'Swara', 'Falguni', 'Drashti', 'Nisha', 'Megha', 'Kinjal', 'Krutika', 'Payal'],
    lastNames: ['Shah', 'Mehta', 'Patel', 'Sanghvi', 'Doshi', 'Choksi', 'Vora']
  },
  {
    name: 'Christian South',
    religion: 'Christianity',
    castes: ['Open/Other'],
    gotras: ['N/A'],
    motherTongue: 'Malayalam', // or Tamil/English
    languages: ['English', 'Hindi'],
    firstNamesMale: ['Thomas', 'Joseph', 'Mathew', 'Jerry', 'Kevin', 'George', 'David', 'Alan', 'Sony', 'Justin'],
    firstNamesFemale: ['Sherin', 'Riya', 'Merlin', 'Sneha', 'Tessa', 'Anjali', 'Maria', 'Sandra', 'Rachel', 'Michelle'],
    lastNames: ['George', 'Mathew', 'Varghese', 'Joseph', 'Kurian', 'Thomas', 'D\'Souza', 'Fernandes']
  },
  {
    name: 'Muslim North/West',
    religion: 'Islam',
    castes: ['Open/Other'],
    gotras: ['N/A'],
    motherTongue: 'Urdu',
    languages: ['English', 'Urdu', 'Hindi'],
    firstNamesMale: ['Kabir', 'Samir', 'Zaid', 'Aryan', 'Feroz', 'Imran', 'Farhan', 'Rahil', 'Arhaan', 'Rehan', 'Zain', 'Armaan', 'Saif', 'Rizwan'],
    firstNamesFemale: ['Zara', 'Fatima', 'Sana', 'Farah', 'Aisha', 'Aliyah', 'Yasmin', 'Hina', 'Mariam', 'Nadia', 'Samira', 'Rida'],
    lastNames: ['Khan', 'Ahmed', 'Sheikh', 'Qureshi', 'Siddiqui', 'Syed', 'Ansari', 'Malik']
  }
];

const DIETARY_PREFERENCES = ['veg', 'non-veg', 'eggetarian', 'Jain'];
const STATUS_TAGS = ['Active', 'On Hold', 'Matched'];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 100 profiles (50 Male, 50 Female)
const profiles = [];
const genders = ['Male', 'Female'];

for (let i = 0; i < 100; i++) {
  const gender = genders[i % 2];
  const isMale = gender === 'Male';
  const id = String(101 + i);
  
  // Pick cultural profile
  const cult = getRandomElement(CULTURAL_PROFILES);
  const firstName = getRandomElement(isMale ? cult.firstNamesMale : cult.firstNamesFemale);
  
  // Custom adjustments for Sikh names
  let lastName = getRandomElement(cult.lastNames);
  if (cult.religion === 'Sikhism') {
    // If last name array returned Singh/Kaur, match gender. Otherwise keep last name.
    if (lastName === 'Singh' || lastName === 'Kaur') {
      lastName = isMale ? 'Singh' : 'Kaur';
    }
  }

  const age = getRandomInt(23, 36);
  
  // DOB based on age
  const birthYear = 2026 - age;
  const birthMonth = String(getRandomInt(1, 12)).padStart(2, '0');
  const birthDay = String(getRandomInt(1, 28)).padStart(2, '0');
  const dob = `${birthYear}-${birthMonth}-${birthDay}`;

  const height = isMale ? getRandomInt(168, 190) : getRandomInt(152, 175);

  // Assign Career Profile (Tech, Finance/Business, Medical, Legal)
  const careers = ['tech', 'finance', 'medical', 'legal'];
  let careerField = getRandomElement(careers);

  // High age matches higher seniority, young age matches junior/mid
  let degree = '';
  let designation = '';
  let income = 0;
  let college = '';
  let company = '';

  if (careerField === 'tech') {
    degree = getRandomElement(['B.Tech', 'B.E.', 'M.Tech', 'MCA']);
    college = getRandomElement(COLLEGES_BY_FIELD.tech);
    company = getRandomElement(COMPANIES_BY_FIELD.tech);
    
    if (age <= 26) {
      designation = 'Software Engineer';
      income = getRandomInt(8, 18) * 100000;
    } else if (age <= 31) {
      designation = getRandomElement(['Senior Software Engineer', 'Data Scientist', 'Business Analyst']);
      income = getRandomInt(18, 32) * 100000;
    } else {
      designation = getRandomElement(['Tech Lead', 'Design Director', 'Product Manager']);
      income = getRandomInt(30, 55) * 100000;
    }
  } else if (careerField === 'finance') {
    degree = getRandomElement(['MBA', 'BBA', 'B.Com', 'PGDM']);
    college = getRandomElement(COLLEGES_BY_FIELD.finance);
    company = getRandomElement(COMPANIES_BY_FIELD.finance);

    if (age <= 26) {
      designation = getRandomElement(['Investment Analyst', 'Business Analyst']);
      income = getRandomInt(10, 18) * 100000;
    } else if (age <= 31) {
      designation = getRandomElement(['Management Consultant', 'Financial Controller', 'Marketing Manager']);
      income = getRandomInt(18, 30) * 100000;
    } else {
      designation = getRandomElement(['Senior Consultant', 'Financial Director', 'Product Manager', 'HR Manager']);
      income = getRandomInt(28, 50) * 100000;
    }
  } else if (careerField === 'medical') {
    degree = age >= 29 ? getRandomElement(['M.D.', 'M.S.']) : 'M.B.B.S.';
    college = getRandomElement(COLLEGES_BY_FIELD.medical);
    company = getRandomElement(COMPANIES_BY_FIELD.medical);

    if (age <= 28) {
      designation = 'Resident Doctor';
      income = getRandomInt(9, 14) * 100000;
    } else {
      designation = getRandomElement(['Consultant Doctor', 'Specialist Medical Practitioner']);
      income = getRandomInt(18, 45) * 100000;
    }
  } else { // legal
    degree = getRandomElement(['LLB', 'LLM']);
    college = getRandomElement(COLLEGES_BY_FIELD.legal);
    company = getRandomElement(COMPANIES_BY_FIELD.legal);

    if (age <= 27) {
      designation = 'Associate Lawyer';
      income = getRandomInt(7, 13) * 100000;
    } else if (age <= 32) {
      designation = 'Corporate Lawyer';
      income = getRandomInt(15, 35) * 100000;
    } else {
      designation = 'Partner (Law Firm)';
      income = getRandomInt(38, 70) * 100000;
    }
  }

  // City based on industry availability
  const city = getRandomElement(CITIES_BY_INDUSTRY[careerField]);

  // Adjust mother tongue and languages
  let motherTongue = cult.motherTongue;
  if (cult.name === 'South Indian Hindu') {
    motherTongue = getRandomElement(['Tamil', 'Telugu', 'Kannada']);
  } else if (cult.name === 'Christian South') {
    motherTongue = getRandomElement(['Malayalam', 'Tamil']);
  }

  const langs = new Set(['English', motherTongue]);
  if (motherTongue !== 'Hindi' && Math.random() > 0.3) {
    langs.add('Hindi');
  }
  const languagesKnown = Array.from(langs).join(', ');

  // Diet consistency
  let dietaryPreference = 'non-veg';
  if (cult.religion === 'Jainism') {
    dietaryPreference = getRandomElement(['Jain', 'veg']);
  } else if (cult.religion === 'Sikhism') {
    dietaryPreference = getRandomElement(['veg', 'non-veg']);
  } else if (cult.religion === 'Hinduism') {
    dietaryPreference = getRandomElement(['veg', 'non-veg', 'eggetarian']);
  } else if (cult.religion === 'Islam' || cult.religion === 'Christianity') {
    dietaryPreference = 'non-veg'; // standard cultural default
  }

  // Manglik and horoscope match preference logic
  const gotra = cult.gotras[Math.floor(Math.random() * cult.gotras.length)];
  const caste = cult.castes[Math.floor(Math.random() * cult.castes.length)];
  const manglikStatus = cult.religion === 'Hinduism' ? getRandomElement(['Yes', 'No', 'Partially', 'Don\'t Know']) : 'N/A';
  const horoscopeMatchPreference = cult.religion === 'Hinduism' ? getRandomElement(['Yes', 'No']) : 'No';

  // Email and phone
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s/g, '')}${getRandomInt(10, 99)}@gmail.com`;
  const phone = `+91 ${getRandomInt(7, 9)}${getRandomInt(100, 999)}${getRandomInt(1000, 9999)}`;

  profiles.push({
    id,
    firstName,
    lastName,
    gender,
    dob,
    age,
    country: 'India',
    city,
    height,
    email,
    phone,
    undergraduateCollege: college,
    degree,
    income,
    currentCompany: company,
    designation,
    languagesKnown,
    siblings: getRandomInt(0, 3),
    caste,
    religion: cult.religion,
    wantKids: getRandomElement(['Yes', 'No', 'Maybe']),
    openToRelocate: getRandomElement(['Yes', 'No', 'Maybe']),
    openToPets: getRandomElement(['Yes', 'No', 'Maybe']),
    gotra,
    motherTongue,
    dietaryPreference,
    manglikStatus,
    familyType: getRandomElement(['nuclear', 'joint']),
    familyValues: getRandomElement(['traditional', 'moderate', 'liberal']),
    complexion: getRandomElement(['Fair', 'Wheatish', 'Dusky']),
    horoscopeMatchPreference,
    statusTag: getRandomElement(STATUS_TAGS)
  });
}

// Write file
fs.writeFileSync(targetFile, JSON.stringify(profiles, null, 2), 'utf8');
console.log(`Successfully generated 100 logically consistent profiles and saved to ${targetFile}!`);
