const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Configurable; defaults to a fast, low-cost model for the analysis pass.
const MODEL = process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001";

async function analyzeContract(text, prompt, ruleMatches) {
  const ruleContext =
    ruleMatches && ruleMatches.length
      ? `\n\nRisky-clause patterns pre-detected by the rule engine (use as hints):\n${JSON.stringify(
          ruleMatches,
          null,
          2
        )}`
      : "";

  const response = await client.messages.create(
    {
      model: MODEL,
      max_tokens: 2048,
      system: prompt,
      messages: [
        {
          role: "user",
          content: `Contract text:\n"""\n${text}\n"""${ruleContext}`,
        },
      ],
    },
    // Hard ceiling so a network stall can never hang the request forever.
    { timeout: 60000 }
  );

  const raw = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  // The prompts instruct the model to return ONLY JSON; parse it, but if the
  // model wraps it (e.g. ```json fences) fall back to surfacing the raw text.
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
