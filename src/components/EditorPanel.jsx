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

  
  const styles = {
    container: {
      backgroundColor: "#f9f9f9",
      border: "1px solid #e0e0e0",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      maxWidth: "900px",
      margin: "0 auto",
      direction: "rtl"
    },
    row: {
      margin: "20px 0",
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      border: "1px solid #eee"
    },
    button: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s"
    },
    input: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      minWidth: "150px"
    },
    select: {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: "white",
      cursor: "pointer"
    }
  };

  const handleSearchClick = () => {
    if (!searchText.trim()) {
      alert("הכניסי טקסט לחיפוש");
      return;
    }
    const found = onSearch(searchText);
    alert(found ? "הטקסט נמצא" : "הטקסט לא נמצא");
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
    <div style={styles.container}>
      
      <Toolbar
        onClear={onClear}
        onStyleChange={onStyleChange}
        currentStyle={currentStyle}
      />

      
      <div style={styles.row}>
        <button style={{...styles.button, backgroundColor: "#fff0f0", color: "#d93025", borderColor: "#f8d7da"}} onClick={onDeleteWord}>מחק מילה</button>
        <button style={styles.button} onClick={onUndo}>Undo</button>
        <button style={{...styles.button, backgroundColor: "#e8f0fe", color: "#1967d2"}} onClick={onSave}>Save</button>
        <button style={styles.button} onClick={onSaveAs}>Save As</button>

        <div style={{ display: "flex", gap: "5px", alignItems: "center", marginRight: "10px" }}>
          <select
            style={styles.select}
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="">בחרי קובץ</option>
            {savedFiles.map((fileName) => (
              <option key={fileName} value={fileName}>{fileName}</option>
            ))}
          </select>
          <button style={{...styles.button, backgroundColor: "#34a853", color: "white", border: "none"}} onClick={handleOpenClick}>Open</button>
        </div>
      </div>

      
      <div style={styles.row}>
        <input
          type="text"
          placeholder="טקסט לחיפוש"
          style={styles.input}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="text"
          placeholder="טקסט להחלפה"
          style={styles.input}
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button style={{...styles.button, backgroundColor: "#fbbc04", color: "#3c4043"}} onClick={handleSearchClick}>חפש</button>
        <button style={styles.button} onClick={handleReplaceClick}>החלף</button>
      </div>

      
      <div style={{ marginTop: "20px" }}>
        <Keyboard onAddChar={onAddChar} onDeleteChar={onDeleteChar} />
      </div>
    </div>
  );
};

export default EditorPanel;