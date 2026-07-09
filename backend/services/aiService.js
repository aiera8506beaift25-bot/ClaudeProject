const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
// 
// llama-3.3-70b-versatile gives strong reasoning for legal analysis.
// Can be overridden via GROQ_MODEL env var.
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

async function analyzeContract(text, prompt, ruleMatches) {
  const ruleContext =
    ruleMatches && ruleMatches.length
      ? `\n\nRisky-clause patterns pre-detected by the rule engine (use as hints):\n${JSON.stringify(
          ruleMatches,
          null,
          2,
        )}`
      : "";

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `Contract text:\n"""\n${text}\n"""${ruleContext}`,
      },
    ],
  });

  const raw = response.choices[0]?.message?.content?.trim() ?? "";

  // Prompts instruct the model to return ONLY JSON.
  // Fall back to regex extraction if the model wraps it in markdown fences.
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        /* fall through */
      }
    }
    return { raw };
  }
}

module.exports = analyzeContract;
