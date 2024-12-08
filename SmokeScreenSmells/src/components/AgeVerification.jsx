import React, { useState, useEffect } from "react";

const AgeVerificationPopup = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ageVerified");
    if (consent === "true") {
      setIsVerified(true);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
    setShowPopup(false);
  };

  const handleDeny = () => {
    alert("You must be 21 years or older to access this site.");
    window.location.href = "https://www.google.com"; // Redirect to a safe page
  };

  if (isVerified) return null;

  return (
    showPopup && (
      <div style={popupStyle}>
        <div style={contentStyle}>
          <h2>Are you 21 years or older?</h2>
          <div style={buttonContainerStyle}>
            <button onClick={handleConsent} style={buttonStyle}>
              Yes
            </button>
            <button onClick={handleDeny} style={buttonStyle}>
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const contentStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  color: "#000000",
};

const buttonContainerStyle = {
  marginTop: "1rem",
  display: "flex",
  justifyContent: "space-around",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007BFF",
  color: "#111",
};

export default AgeVerificationPopup;
