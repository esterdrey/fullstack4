import React from "react";

const TextDisplay = ({ chars }) => {
  return (
    <div style={{
      border: "1px solid black",
      minHeight: "150px",
      padding: "10px",
      marginBottom: "20px",
      backgroundColor: "white",
      whiteSpace: "pre-wrap", 
      textAlign: "right",
      overflowY: "auto"
    }}>
      {chars.map((charObj, index) => (
        <span key={index} style={{ 
          color: charObj.color, 
          fontSize: charObj.fontSize,
          fontFamily: charObj.fontFamily,
          fontWeight: charObj.fontWeight,
          fontStyle: charObj.fontStyle,
          textDecoration: charObj.textDecoration
        }}>
          {charObj.value}
        </span>
      ))}
    </div>
  );
};

export default TextDisplay;