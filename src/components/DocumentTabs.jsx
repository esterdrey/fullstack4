import React from "react";

const DocumentTabs = ({
  documents,
  activeDocumentId,
  onSwitch,
  onClose,
  onNew
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "15px",
        alignItems: "center"
      }}
    >
      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{
            display: "flex",
            alignItems: "center",
            border:
              doc.id === activeDocumentId
                ? "2px solid #007bff"
                : "1px solid #aaa",
            borderRadius: "8px",
            padding: "6px 10px",
            backgroundColor:
              doc.id === activeDocumentId ? "#eaf3ff" : "#f7f7f7"
          }}
        >
          <button
            onClick={() => onSwitch(doc.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight:
                doc.id === activeDocumentId ? "bold" : "normal"
            }}
          >
            {doc.name}
          </button>

          <button
            onClick={() => onClose(doc.id)}
            style={{
              marginRight: "8px",
              border: "none",
              background: "transparent",
              color: "red",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ×
          </button>
        </div>
      ))}

      <button onClick={onNew}>+ New</button>
    </div>
  );
};

export default DocumentTabs;