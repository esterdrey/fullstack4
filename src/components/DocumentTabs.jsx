import React from "react";

const DocumentTabs = ({
  documents,
  activeDocumentId,
  onSwitch,
  onClose,
  onNew
}) => {
  const styles = {
    container: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "20px",
      alignItems: "flex-end", 
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: "5px",
      direction: "rtl"
    },
    tab: (isActive) => ({
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: "10px 10px 0 0", 
      backgroundColor: isActive ? "#ffffff" : "transparent",
      border: isActive ? "1px solid #e0e0e0" : "1px solid transparent",
      borderBottom: isActive ? "2px solid #ffffff" : "none", 
      marginBottom: "-1px",
      transition: "all 0.2s ease",
      boxShadow: isActive ? "0 -2px 10px rgba(0,0,0,0.03)" : "none",
      position: "relative",
      zIndex: isActive ? 2 : 1
    }),
    tabText: (isActive) => ({
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: isActive ? "600" : "400",
      color: isActive ? "#007bff" : "#5f6368",
      padding: 0,
      marginLeft: "10px"
    }),
    closeBtn: {
      border: "none",
      background: "transparent",
      color: "#9aa0a6",
      cursor: "pointer",
      fontSize: "18px",
      lineHeight: "1",
      padding: "2px 5px",
      borderRadius: "4px",
      transition: "background 0.2s"
    },
    newBtn: {
      padding: "6px 14px",
      borderRadius: "20px",
      border: "1px solid #007bff",
      backgroundColor: "#ffffff",
      color: "#007bff",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      marginRight: "10px",
      marginBottom: "5px",
      transition: "all 0.2s"
    }
  };

  return (
    <div style={styles.container}>
      {documents.map((doc) => {
        const isActive = doc.id === activeDocumentId;
        return (
          <div
            key={doc.id}
            onClick={() => onSwitch(doc.id)}
            style={styles.tab(isActive)}
          >
            <button style={styles.tabText(isActive)}>
              {doc.name}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); 
                onClose(doc.id);
              }}
              style={styles.closeBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f3f4")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              ×
            </button>
          </div>
        );
      })}

      <button 
        onClick={onNew} 
        style={styles.newBtn}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#007bff";
        }}
      >
        + מסמך חדש
      </button>
    </div>
  );
};

export default DocumentTabs;