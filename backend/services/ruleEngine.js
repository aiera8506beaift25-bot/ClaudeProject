const fs = require("fs");
const path = require("path");

function runRuleEngine(contractType, text) {

    const filePath = path.join(
        __dirname,
        "..",
        "knowledge-base",
        `${contractType}.json`
    );

    const rules = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const lowerText = text.toLowerCase();

    const matched = [];

    for (const rule of rules) {

        const found = rule.keywords.some(keyword =>
            lowerText.includes(keyword.toLowerCase())
        );

        if (found) {
            matched.push(rule);
        }

    }

    return matched;

}

module.exports = runRuleEngine;
