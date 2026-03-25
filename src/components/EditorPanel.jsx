import React, { useState } from "react";
import Keyboard from "./Keyboard";
import Toolbar from "./Toolbar";

const EditorPanel = ({
  onAddChar,
  onDeleteChar,
  onDeleteWord,
  onClear,
  onUndo,
  onSearch,
  onReplace,
  onStyleChange,
  currentStyle,
  onSave,
  onSaveAs,
  onOpenFile,
  savedFiles
}) => {
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleSearchClick = () => {
    if (!searchText.trim()) {
      alert("הכניסי טקסט לחיפוש");
      return;
    }

    const found = onSearch(searchText);

    if (found) {
      alert("הטקסט נמצא");
    } else {
      alert("הטקסט לא נמצא");
    }
  };

  const handleReplaceClick = () => {
    if (!searchText.trim()) {
      alert("הכניסי טקסט לחיפוש");
      return;
    }

    const replaced = onReplace(searchText, replaceText);

    if (replaced) {
      alert("ההחלפה בוצעה");
      setSearchText("");
      setReplaceText("");
    } else {
      alert("הטקסט לחיפוש לא נמצא");
    }
  };

  const handleOpenClick = () => {
    if (!selectedFile) {
      alert("בחרי קובץ מהרשימה");
      return;
    }

    onOpenFile(selectedFile);
  };

  return (
    <div style={{ border: "2px solid #555", padding: "15px", borderRadius: "10px" }}>
      <Toolbar
        onClear={onClear}
        onStyleChange={onStyleChange}
        currentStyle={currentStyle}
      />

      <div
        style={{
          margin: "15px 0",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <button onClick={onDeleteWord}>מחק מילה</button>
        <button onClick={onUndo}>Undo</button>
        <button onClick={onSave}>Save</button>
        <button onClick={onSaveAs}>Save As</button>

        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="">בחרי קובץ</option>
          {savedFiles.map((fileName) => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>

        <button onClick={handleOpenClick}>Open</button>
      </div>

      <div
        style={{
          margin: "15px 0",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="טקסט לחיפוש"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <input
          type="text"
          placeholder="טקסט להחלפה"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />

        <button onClick={handleSearchClick}>חפש</button>
        <button onClick={handleReplaceClick}>החלף</button>
      </div>

      <Keyboard onAddChar={onAddChar} onDeleteChar={onDeleteChar} />
    </div>
  );
};

export default EditorPanel;