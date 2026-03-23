import React from "react";

const Toolbar = ({ onClear, onStyleChange, currentStyle }) => {
  const quickColors = ["black", "red", "blue", "green", "purple", "orange"];

  const toggleBold = () => onStyleChange({ fontWeight: currentStyle.fontWeight === "bold" ? "normal" : "bold" });
  const toggleItalic = () => onStyleChange({ fontStyle: currentStyle.fontStyle === "italic" ? "normal" : "italic" });
  const toggleUnderline = () => onStyleChange({ textDecoration: currentStyle.textDecoration === "underline" ? "none" : "underline" });

  const formatBtnStyle = (isActive) => ({
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: isActive ? "#ccc" : "#fff",
    fontWeight: "bold",
    transition: "background-color 0.2s"
  });

  return (
    <div style={{ 
      marginBottom: "15px", 
      display: "flex", 
      flexWrap: "wrap",
      gap: "12px", 
      padding: "15px", 
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      
      <div style={{ display: "flex", gap: "5px" }}>
        <button onClick={toggleBold} style={formatBtnStyle(currentStyle.fontWeight === "bold")} title="Bold">B</button>
        <button onClick={toggleItalic} style={{ ...formatBtnStyle(currentStyle.fontStyle === "italic"), fontStyle: "italic" }} title="Italic">I</button>
        <button onClick={toggleUnderline} style={{ ...formatBtnStyle(currentStyle.textDecoration === "underline"), textDecoration: "underline" }} title="Underline">U</button>
      </div>

      <div style={{ width: "1px", height: "25px", backgroundColor: "#ccc", margin: "0 5px" }} />

    
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold" }}>צבע:</label>
        <input 
          type="color" 
          value={currentStyle.color || "#000000"}
          onChange={(e) => onStyleChange({ color: e.target.value })}
          style={{ cursor: "pointer", width: "35px", height: "35px", border: "none", background: "none" }}
          title="בחר צבע מותאם אישית"
        />
        <div style={{ display: "flex", gap: "4px" }}>
          {quickColors.map(col => (
            <button 
              key={col} 
              onClick={() => onStyleChange({ color: col })}
              style={{ 
                width: "20px", 
                height: "20px", 
                backgroundColor: col, 
                border: "1px solid #ccc", 
                borderRadius: "50%", 
                cursor: "pointer" 
              }}
            />
          ))}
        </div>
      </div>

      <select 
        value={currentStyle.fontSize}
        onChange={(e) => onStyleChange({ fontSize: e.target.value })} 
        style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(size => (
          <option key={size} value={`${size}px`}>{size}</option>
        ))}
      </select>

      <select 
        value={currentStyle.fontFamily}
        onChange={(e) => onStyleChange({ fontFamily: e.target.value })} 
        style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
      >
        <optgroup label="נפוצים">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Calibri">Calibri</option>
          <option value="Segoe UI">Segoe UI</option>
        </optgroup>
        <optgroup label="עברית">
          <option value="David">David</option>
          <option value="Miriam">Miriam</option>
          <option value="FrankRuehl">FrankRuehl</option>
          <option value="Narkisim">Narkisim</option>
        </optgroup>
        <optgroup label="לועזי ועיצוב">
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </optgroup>
      </select>

      <button 
        onClick={onClear} 
        style={{ 
          backgroundColor: "#d9534f", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          cursor: "pointer", 
          borderRadius: "4px",
          marginRight: "auto"
        }}
      >
        מחק הכל
      </button>
    </div>
  );
};

export default Toolbar;