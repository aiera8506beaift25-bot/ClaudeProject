function detectContractType(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("internship") ||
    lower.includes("stipend") ||
    lower.includes("mentor")
  ) {
    return "internship";
  }

  if (
    lower.includes("landlord") ||
    lower.includes("tenant") ||
    lower.includes("rent")
  ) {
    return "housing";
  }

  if (
    lower.includes("client") ||
    lower.includes("freelancer")
  ) {
    return "freelance";
  }

  if (
    lower.includes("hackathon") ||
    lower.includes("competition")
  ) {
    return "event";
  }

  return "general";
}

module.exports = detectContractType;
