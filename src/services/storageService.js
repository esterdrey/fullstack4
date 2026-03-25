export const getSavedFilesByUser = (username) => {
  const allKeys = Object.keys(localStorage);
  const prefix = `textEditorFile_${username}_`;

  return allKeys
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.replace(prefix, ""));
};

export const saveFileForUser = (username, fileName, chars) => {
  const fileData = {
    fileName,
    chars,
    username,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem(
    `textEditorFile_${username}_${fileName}`,
    JSON.stringify(fileData)
  );
};

export const openFileForUser = (username, fileName) => {
  const rawData = localStorage.getItem(`textEditorFile_${username}_${fileName}`);

  if (!rawData) return null;

  return JSON.parse(rawData);
};