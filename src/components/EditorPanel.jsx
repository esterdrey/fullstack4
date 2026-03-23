import React from "react";
import Keyboard from "./Keyboard";
import Toolbar from "./Toolbar";


const EditorPanel = ({ onAddChar, onDeleteChar, onClear, onStyleChange, currentStyle }) => {
  return (
    <div style={{ border: "2px solid #555", padding: "15px", borderRadius: "10px" }}>
      <Toolbar 
        onClear={onClear} 
        onStyleChange={onStyleChange} 
        currentStyle={currentStyle} 
      />
      <Keyboard onAddChar={onAddChar} onDeleteChar={onDeleteChar} />
    </div>
  );
};
export default EditorPanel;