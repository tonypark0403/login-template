import React, { useEffect } from "react";
import axios from "axios";
function LandingPage() {
  useEffect(() => {
    axios.get("/api/user/hello").then(res => console.log(res));
  }, []);
  return (
    <div>
      <h1>LandingPage</h1>
    </div>
  );
}

export default LandingPage;
