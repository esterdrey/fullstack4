export const deleteLastWord = (chars) => {
  if (!chars || chars.length === 0) return [];

  let index = chars.length - 1;

  while (index >= 0 && chars[index].value === " ") {
    index--;
  }

  while (index >= 0 && chars[index].value !== " ") {
    index--;
  }

  return chars.slice(0, index + 1);
};

export const searchTextInChars = (chars, searchText) => {
  const fullText = chars.map((ch) => ch.value).join("");
  return fullText.includes(searchText);
};

export const replaceTextInChars = (chars, searchText, replaceText, currentStyle) => {
  const fullText = chars.map((ch) => ch.value).join("");

  if (!fullText.includes(searchText)) {
    return null;
  }

  const replacedText = fullText.replace(searchText, replaceText);

  return replacedText.split("").map((char) => ({
    value: char,
    ...currentStyle
  }));
};