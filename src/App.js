import React, { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorPanel from "./components/EditorPanel";

function App() {
  const [chars, setChars] = useState([]);
  
  const [currentStyle, setCurrentStyle] = useState({
    color: "black",
    fontSize: "18px",
    fontFamily: "Arial",
    fontWeight: "normal",    
    fontStyle: "normal",     
    textDecoration: "none"   
  });

  const handleAddChar = (charValue) => {
    const newCharObj = { 
      value: charValue, 
      ...currentStyle 
    };
    setChars(prev => [...prev, newCharObj]);
  };

  const handleClear = () => {
    setChars([]); 
  };

  const handleDeleteChar = () => {
    setChars(prev => prev.slice(0, -1)); 
  };

  const handleStyleChange = (styleUpdate) => {
    setCurrentStyle(prev => ({ ...prev, ...styleUpdate }));
  };

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h1>עורך טקסט ויזואלי</h1>

      <TextDisplay chars={chars} />

      <EditorPanel 
        onAddChar={handleAddChar}
        onClear={handleClear}
        onDeleteChar={handleDeleteChar}
        onStyleChange={handleStyleChange}  
        currentStyle={currentStyle}
      />
    </div>
  );
}

export default App;