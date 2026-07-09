const fs = require("fs");
const path = require("path");

function loadPrompt(contractType) {
    const promptPath = path.join(
        __dirname,
        "..",
        "prompts",
        `${contractType}Prompt.txt`
    );

    return fs.readFileSync(promptPath, "utf8");
}

module.exports = loadPrompt;
