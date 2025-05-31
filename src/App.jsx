import React, { useState } from "react";
import NFTViewer from "./components/NFTViewer";
import TechnicalOverviewModal from "./components/TechnicalOverviewModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <NFTViewer />
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔍 Open Technical Overview
        </button>
      </div>
      {showModal && <TechnicalOverviewModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
