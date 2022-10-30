class TansformSting {
  getCamelcase(string) {
    return string
      .toLocaleLowerCase()
      .trim()
      .split(" ")
      .map((word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join("");
  }
}
export const tansformSting = new TansformSting()