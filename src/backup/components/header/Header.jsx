
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";




import "./header.css";
import { Link } from "react-router-dom";

import { useContext, useEffect } from 'react';

import { UserContext } from '../../App';

const Header = () => {
  const {lightMode, setLightMode} = useContext(UserContext);
   
  useEffect(() => {
    
    const body = document.querySelector('body');
    if (lightMode) {
      body.classList.add('body-light');
/*       localStorage.setItem('lightMode', JSON.stringify(lightMode));
 */      
      
    } else {
      body.classList.remove('body-light');
     
    }
  }, [lightMode]);
 
  useEffect(() => {
     
      localStorage.setItem('lightMode', JSON.stringify(lightMode));
    
  }, [lightMode]);

 /*  useEffect(() => {
    const storedLightMode = JSON.parse(localStorage.getItem('lightMode'));
    if (storedLightMode !== null) {
      setLightMode(storedLightMode);
    }
  }, []); */

  return (
  <header className="header">
    <h1 className="logoTitle"><Link to="/" className="links">German Jobs</Link></h1>

    <div className="thememode">
    <FaMoon size={21} className="icon"  />
    <div className="onoffswitch">
       
    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" onChange={()=> setLightMode(!lightMode)} checked={lightMode? true : false}></input>
    <label className="onoffswitch-label" htmlFor="myonoffswitch">
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch"></span>
    </label>
</div>

<MdSunny size={21} className="icon" />
    </div>
  </header>
  )
}

export default Header