import React, { useState, useEffect } from "react";
import flag from "../../assets/german flag.svg"

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Set the delay to 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${showSplash ? "show" : "hide"}`}>
        <img src={flag} alt="" className="splash-flag" />
      <h1>German Job Portal</h1>
      <p>welcome to your number one stop for job opportunities in Germany!</p>

      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default SplashScreen;