import React, { useEffect, useState } from "react";
import "./App.css"; // קישור לקובץ העיצוב
import TextDisplay from "./components/TextDisplay";
import EditorPanel from "./components/EditorPanel";
import AuthForm from "./components/AuthForm";
import DocumentTabs from "./components/DocumentTabs";
import {
  deleteLastWord,
  searchTextInChars,
  replaceTextInChars
} from "./utils/textUtils";
import {
  getCurrentUser,
  clearCurrentUser,
  registerUser,
  loginUser
} from "./services/authService";
import {
  getSavedFilesByUser,
  saveFileForUser,
  openFileForUser
} from "./services/storageService";

function App() {
  const createEmptyDocument = (name = "מסמך חדש") => ({
    id: Date.now() + Math.random(),
    name,
    chars: [],
    history: [],
    savedFileName: ""
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [loginMode, setLoginMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    username: "",
    password: ""
  });

  const [documents, setDocuments] = useState([createEmptyDocument("מסמך 1")]);
  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [savedFiles, setSavedFiles] = useState([]);

  const [currentStyle, setCurrentStyle] = useState({
    color: "black",
    fontSize: "18px",
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none"
  });

  useEffect(() => {
    const storedCurrentUser = getCurrentUser();
    if (storedCurrentUser) {
      setCurrentUser(storedCurrentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setSavedFiles(getSavedFilesByUser(currentUser.username));
      setDocuments([createEmptyDocument("מסמך 1")]);
      setActiveDocumentId(null);
    } else {
      setSavedFiles([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (documents.length > 0 && activeDocumentId === null) {
      setActiveDocumentId(documents[0].id);
    }
  }, [documents, activeDocumentId]);

  const activeDocument =
    documents.find((doc) => doc.id === activeDocumentId) || documents[0];

  const refreshSavedFiles = () => {
    if (!currentUser) return;
    setSavedFiles(getSavedFilesByUser(currentUser.username));
  };

  const updateActiveDocument = (updater) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== activeDocumentId) return doc;
        return updater(doc);
      })
    );
  };

  const saveToHistory = (currentChars) => {
    updateActiveDocument((doc) => ({
      ...doc,
      history: [...doc.history, [...currentChars]]
    }));
  };

  const handleAddChar = (charValue) => {
    if (!activeDocument) return;
    saveToHistory(activeDocument.chars);
    const newCharObj = { value: charValue, ...currentStyle };
    updateActiveDocument((doc) => ({
      ...doc,
      chars: [...doc.chars, newCharObj]
    }));
  };

  const handleClear = () => {
    if (!activeDocument || activeDocument.chars.length === 0) return;
    saveToHistory(activeDocument.chars);
    updateActiveDocument((doc) => ({ ...doc, chars: [] }));
  };

  const handleDeleteChar = () => {
    if (!activeDocument || activeDocument.chars.length === 0) return;
    saveToHistory(activeDocument.chars);
    updateActiveDocument((doc) => ({ ...doc, chars: doc.chars.slice(0, -1) }));
  };

  const handleDeleteWord = () => {
    if (!activeDocument || activeDocument.chars.length === 0) return;
    saveToHistory(activeDocument.chars);
    updateActiveDocument((doc) => ({ ...doc, chars: deleteLastWord(doc.chars) }));
  };

  const handleUndo = () => {
    if (!activeDocument || activeDocument.history.length === 0) return;
    const previousState = activeDocument.history[activeDocument.history.length - 1];
    updateActiveDocument((doc) => ({
      ...doc,
      chars: previousState,
      history: doc.history.slice(0, -1)
    }));
  };

  const handleStyleChange = (styleUpdate) => {
    setCurrentStyle((prev) => ({ ...prev, ...styleUpdate }));
  };

  const handleSearch = (searchText) => {
    if (!activeDocument) return false;
    return searchTextInChars(activeDocument.chars, searchText);
  };

  const handleReplace = (searchText, replaceText) => {
    if (!activeDocument) return false;
    const newChars = replaceTextInChars(activeDocument.chars, searchText, replaceText, currentStyle);
    if (!newChars) return false;
    saveToHistory(activeDocument.chars);
    updateActiveDocument((doc) => ({ ...doc, chars: newChars }));
    return true;
  };

  const handleSave = () => {
    if (!currentUser || !activeDocument) return;
    if (!activeDocument.savedFileName.trim()) {
      alert("אין שם קובץ. השתמשי ב-Save As");
      return;
    }
    saveFileForUser(currentUser.username, activeDocument.savedFileName, activeDocument.chars);
    refreshSavedFiles();
    alert("הקובץ נשמר");
  };

  const handleSaveAs = () => {
    if (!currentUser || !activeDocument) return;
    const newFileName = prompt("הכניסי שם קובץ חדש:");
    if (!newFileName || !newFileName.trim()) {
      alert("שם קובץ לא תקין");
      return;
    }
    const trimmedName = newFileName.trim();
    saveFileForUser(currentUser.username, trimmedName, activeDocument.chars);
    updateActiveDocument((doc) => ({
      ...doc,
      savedFileName: trimmedName,
      name: trimmedName
    }));
    refreshSavedFiles();
    alert("הקובץ נשמר בהצלחה");
  };

  const handleOpenFile = (fileName) => {
    if (!currentUser) return;
    const parsedData = openFileForUser(currentUser.username, fileName);
    if (!parsedData) {
      alert("הקובץ לא נמצא");
      return;
    }
    updateActiveDocument((doc) => ({
      ...doc,
      chars: parsedData.chars || [],
      history: [],
      savedFileName: parsedData.fileName || fileName,
      name: parsedData.fileName || fileName
    }));
    alert(`הקובץ "${fileName}" נפתח`);
  };

  const handleNewDocument = () => {
    const newDocNumber = documents.length + 1;
    const newDoc = createEmptyDocument(`מסמך ${newDocNumber}`);
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocumentId(newDoc.id);
  };

  const handleSwitchDocument = (documentId) => {
    setActiveDocumentId(documentId);
  };

  const handleCloseDocument = (documentId) => {
    if (documents.length === 1) {
      alert("חייב להישאר לפחות מסמך אחד פתוח");
      return;
    }
    const docToClose = documents.find((doc) => doc.id === documentId);
    if (docToClose?.chars.length > 0) {
      if (!window.confirm("לסגור את המסמך? שינויים שלא נשמרו עלולים ללכת לאיבוד.")) return;
    }
    const remainingDocs = documents.filter((doc) => doc.id !== documentId);
    setDocuments(remainingDocs);
    if (activeDocumentId === documentId) setActiveDocumentId(remainingDocs[0].id);
  };

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    const { username, password } = authForm;
    if (!username.trim() || !password.trim()) { alert("יש למלא פרטים"); return; }
    const result = registerUser(username.trim(), password.trim());
    if (!result.success) { alert(result.message); return; }
    alert("ההרשמה בוצעה"); setLoginMode("login");
  };

  const handleLogin = () => {
    const { username, password } = authForm;
    const result = loginUser(username.trim(), password.trim());
    if (!result.success) { alert(result.message); return; }
    setCurrentUser(result.user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearCurrentUser();
    setDocuments([createEmptyDocument("מסמך 1")]);
    setActiveDocumentId(null);
  };

  if (!currentUser) {
    return (
      <AuthForm
        loginMode={loginMode}
        authForm={authForm}
        onChange={handleAuthInputChange}
        onLogin={handleLogin}
        onRegister={handleRegister}
        switchMode={setLoginMode}
      />
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">T</div>
          <h1 className="app-title">עורך טקסטים</h1>
        </div>

        <div className="user-section">
          <span className="user-info">
            שלום, <strong>{currentUser.username}</strong>
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            התנתקי
          </button>
        </div>
      </header>

      <DocumentTabs
        documents={documents}
        activeDocumentId={activeDocumentId}
        onSwitch={handleSwitchDocument}
        onClose={handleCloseDocument}
        onNew={handleNewDocument}
      />

      {activeDocument && (
        <div className="active-doc-label">
          מסמך פעיל: <span className="active-doc-name">{activeDocument.name}</span>
        </div>
      )}

      <TextDisplay chars={activeDocument ? activeDocument.chars : []} />

      <EditorPanel
        onAddChar={handleAddChar}
        onDeleteChar={handleDeleteChar}
        onDeleteWord={handleDeleteWord}
        onClear={handleClear}
        onUndo={handleUndo}
        onSearch={handleSearch}
        onReplace={handleReplace}
        onStyleChange={handleStyleChange}
        currentStyle={currentStyle}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onOpenFile={handleOpenFile}
        savedFiles={savedFiles}
      />
    </div>
  );
}

export default App;