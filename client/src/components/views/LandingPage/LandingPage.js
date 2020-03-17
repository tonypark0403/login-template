import React, { useEffect } from "react";
import Axios from "axios";
function LandingPage() {
  useEffect(() => {
    Axios.get("/api/user/hello").then(res => console.log(res));
  }, []);
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>LandingPage</h2>
    </div>
  );
}

export default LandingPage;
