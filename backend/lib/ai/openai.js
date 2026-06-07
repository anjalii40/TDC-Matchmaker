import { GoogleGenerativeAI } from "@google/generative-ai";

// Local fallback to generate high-quality introductions using calculated compatibility details
export function generateLocalIntroduction(matchData) {
  // Directly join the top 3 compatibility narratives returned by the matching engine
  if (matchData.narratives && matchData.narratives.length > 0) {
    return matchData.narratives.slice(0, 3).join(' ');
  }
  return `This candidate presents a strong potential match based on professional background and family values.`;
}

// Calling Google Gemini API to generate intro using breakdown data as prompt input
export async function getAIIntroduction(customer, candidate, matchData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_key_here') {
    return generateLocalIntroduction(matchData);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const clientName = `${customer.firstName} ${customer.lastName}`;
    const clientAge = customer.age;
    const clientCity = customer.city;
    const topPriorityLabels = customer.partnerPriorities?.ranked?.map(p => p.label).join(', ') || 'None';

    const candidateName = `${candidate.firstName} ${candidate.lastName}`;
    const candidateAge = candidate.age;
    const candidateCity = candidate.city;
    const score = matchData.score;

    const categoryBreakdownList = matchData.breakdown
      .map(b => `- ${b.label}: ${b.max > 0 ? Math.round((b.score / b.max) * 100) : 0}/100`)
      .join('\n');

    const prompt = `
You are an expert matchmaker assistant for The Dating Club, a premium
Indian matchmaking service. You help professional matchmakers decide
whether to recommend a match to their client. Be direct, specific, and
actionable. Never restate obvious profile data. Always write from the
matchmaker's perspective.

Client: ${clientName}, ${clientAge} yrs, ${clientCity}.
Their top priorities are: ${topPriorityLabels}.

Candidate: ${candidateName}, ${candidateAge} yrs, ${candidateCity}.
Compatibility score: ${score}%.

Category scores (out of 100):
${categoryBreakdownList}

Write a 2-sentence match insight for the matchmaker.
Sentence 1: What makes this match worth considering, specifically
referencing the client's stated priorities.
Sentence 2: The single most important friction point or conversation
the matchmaker should prepare for before presenting this match.
Be specific. No filler. No restating names or ages.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (err) {
    console.error("Error calling Gemini API, falling back to local generator:", err);
    return generateLocalIntroduction(matchData);
  }
}
