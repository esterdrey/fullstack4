import React from "react";

const AuthForm = ({
  loginMode,
  authForm,
  onChange,
  onLogin,
  onRegister,
  switchMode
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        direction: "rtl"
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {loginMode === "login" ? "התחברות" : "הרשמה"}
        </h2>

        <input
          type="text"
          name="username"
          placeholder="שם משתמש"
          value={authForm.username}
          onChange={onChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={authForm.password}
          onChange={onChange}
          style={inputStyle}
        />

        {loginMode === "login" ? (
          <>
            <button onClick={onLogin} style={mainBtn}>
              התחברי
            </button>

            <button onClick={() => switchMode("register")} style={secondaryBtn}>
              מעבר להרשמה
            </button>
          </>
        ) : (
          <>
            <button onClick={onRegister} style={successBtn}>
              הירשמי
            </button>

            <button onClick={() => switchMode("login")} style={secondaryGreen}>
              חזרה להתחברות
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const mainBtn = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px"
};

const successBtn = {
  ...mainBtn,
  backgroundColor: "#28a745"
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  border: "1px solid #007bff",
  borderRadius: "6px",
  backgroundColor: "white",
  color: "#007bff",
  cursor: "pointer"
};

const secondaryGreen = {
  ...secondaryBtn,
  border: "1px solid #28a745",
  color: "#28a745"
};

export default AuthForm;