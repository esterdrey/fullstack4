import React from "react";

const TextDisplay = ({ chars }) => {
  const styles = {
    displayArea: {
      
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      minHeight: "250px", 
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.05)",
      
      
      whiteSpace: "pre-wrap",
      textAlign: "right",
      direction: "rtl",
      overflowY: "auto",
      lineHeight: "1.5", 
      
      
      scrollbarWidth: "thin",
      scrollbarColor: "#ccc transparent",
    }
  };

  return (
    <div style={styles.displayArea}>
      {chars.length === 0 ? (
        <span style={{ color: "#aaa", fontStyle: "italic", fontSize: "16px" }}>
          התחילי להקליד כאן...
        </span>
      ) : (
        chars.map((charObj, index) => (
          <span
            key={index}
            style={{
              color: charObj.color || "inherit",
              fontSize: charObj.fontSize || "inherit",
              fontFamily: charObj.fontFamily || "inherit",
              fontWeight: charObj.fontWeight || "normal",
              fontStyle: charObj.fontStyle || "normal",
              textDecoration: charObj.textDecoration || "none",
             
              display: "inline-block",
              minWidth: charObj.value === " " ? "0.3em" : "auto" 
            }}
          >
            {charObj.value}
          </span>
        ))
      )}
    </div>
  );
};

export default TextDisplay;