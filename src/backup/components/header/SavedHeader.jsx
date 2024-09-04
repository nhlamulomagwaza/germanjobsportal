
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import "./header2.css"
import { useContext } from 'react';

import { UserContext } from '../../App';
import Flag from "../../assets/flat.jpg"



const SavedHeader = () => {

  const {lightMode, setLightMode} = useContext(UserContext);
  return (
    <header className="header2">
    <h1 className={lightMode? "logoTitle-light" : "logoTitle"}>Saved Jobs</h1>
   <img src={Flag} alt="" id="flag" />
    
  </header>
  )
}

export default SavedHeader