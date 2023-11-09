document.addEventListener("DOMContentLoaded", function () {
    const inputText = document.getElementById("inputText");
    const redactWords = document.getElementById("redactWords");
    const replacementChar = document.getElementById("replacementChar");
    const redactButton = document.getElementById("redactButton");
    const redactedText = document.getElementById("redactedText");
    const stats = document.getElementById("stats");

    redactButton.addEventListener("click", function () {
        const text = inputText.value;
        const wordsToRedact = redactWords.value.split(" ");
        const redactionChar = replacementChar.value || "*";

        const startTime = performance.now();

        const redactedTextValue = redactText(text, wordsToRedact, redactionChar);

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;

        redactedText.textContent = redactedTextValue;
        stats.innerHTML = `
            Words Scanned: ${wordsToRedact.length}<br>
            Characters Scrambled: ${countScrambledCharacters(text, redactedTextValue)}<br>
            Time Taken: ${elapsedTime.toFixed(2)} seconds
        `;
    });
});

function redactText(text, wordsToRedact, redactionChar) {
    for (const word of wordsToRedact) {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        text = text.replace(regex, redactionChar.repeat(word.length));
    }
    return text;
}

function countScrambledCharacters(originalText, redactedText) {
    let count = 0;
    for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] !== redactedText[i]) {
            count++;
        }
    }
    return count;
}
