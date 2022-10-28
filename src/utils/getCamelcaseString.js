export function getCamelcaseString(string) {
    return string
      .toLocaleLowerCase()
      .trim()
      .split(" ")
      .map((word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join("");
}