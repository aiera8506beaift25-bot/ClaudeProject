/**
 * Detects the contract type from extracted text.
 * Returns one of: "internship" | "housing" | "freelance" | "event" | "general"
 */
function detectContractType(text) {
  const lower = text.toLowerCase();

  const types = [
    {
      type: "internship",
      keywords: ["internship", "stipend", "intern", "offer letter", "trainee"],
    },
    {
      type: "housing",
      keywords: [
        "landlord",
        "tenant",
        "rent",
        "lease",
        "hostel",
        "pg",
        "paying guest",
        "deposit",
      ],
    },
    {
      type: "freelance",
      keywords: [
        "freelancer",
        "freelance",
        "client",
        "deliverable",
        "milestone",
        "invoice",
      ],
    },
    {
      type: "event",
      keywords: [
        "hackathon",
        "competition",
        "participant",
        "organiser",
        "organizer",
        "prize",
        "submission",
      ],
    },
  ];

  // Score each type by how many keywords match
  let bestType = "general";
  let bestScore = 0;

  for (const { type, keywords } of types) {
    const score = keywords.reduce(
      (acc, kw) => acc + (lower.includes(kw) ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }

  return bestType;
}

module.exports = detectContractType;
