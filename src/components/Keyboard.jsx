import React, { useState } from "react";

const Keyboard = ({ onAddChar, onDeleteChar }) => {
  const [layout, setLayout] = useState("en"); 
  const [isUpper, setIsUpper] = useState(true);

  const layouts = {
    en: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
    he: ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת","ך","ם","ן","ף","ץ"],
    symbols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "?", "/", ":", ".", ",", ";"],
    emoji: ["😀", "😂", "🥰", "😎", "🤔", "😢", "🔥", "👍", "❤️", "✨", "🌈", "🇮🇱", "🎗️", "🍕", "🎈"]
  };

  const buttonStyle = {
    margin: "3px",
    padding: "10px",
    minWidth: "42px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "white"
  };

  const controlButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e0e0e0",
    fontWeight: "bold"
  };

  const handleCharClick = (char) => {
    const finalChar = (layout === "en" && !isUpper) ? char.toLowerCase() : char;
    onAddChar(finalChar);
  };

  return (
    <div style={{ textAlign: "center", padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "10px", direction: "ltr" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "650px", margin: "0 auto" }}>
        
        {layouts[layout].map((char) => (
          <button key={char} onClick={() => handleCharClick(char)} style={buttonStyle}>
            {layout === "en" && !isUpper ? char.toLowerCase() : char}
          </button>
        ))}

        <div style={{ width: "100%", marginTop: "15px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => onAddChar(" ")} style={{...buttonStyle, width: "550px", backgroundColor: "#fff"}}>Space</button>
          
          
          <button onClick={onDeleteChar} style={{...controlButtonStyle, backgroundColor: "#fff"}}>
            ⌫
          </button>
          <button onClick={() => setLayout(layout === "he" ? "en" : "he")} style={controlButtonStyle}>
            🌐 {layout === "he" ? "EN" : "HE"}
          </button>

          <button onClick={() => setLayout("symbols")} style={{...controlButtonStyle, backgroundColor: layout === "symbols" ? "#bbb" : "#e0e0e0"}}>
            123
          </button>

          <button onClick={() => setLayout("emoji")} style={{...controlButtonStyle, backgroundColor: layout === "emoji" ? "#bbb" : "#e0e0e0"}}>
            😊
          </button>

          {layout === "en" && (
            <button onClick={() => setIsUpper(!isUpper)} style={controlButtonStyle}>
              Shift ↑
            </button>
          )}

       
        </div>
      </div>
    </div>
  );
};

export default Keyboard;