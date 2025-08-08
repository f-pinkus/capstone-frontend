export function cleanLines(text, isNumbered = false) {
  return text
    .split("\n")
    .map((line) => {
      const cleaned = isNumbered
        ? line.replace(/^(\s*\d+[\.\)]|\s*[-*•])\s*/, "")
        : line.replace(/^(\s*[-*•])\s*/, "");
      return cleaned.trim();
    })
    .filter((line) => line !== "")
    .join("\n");
}
