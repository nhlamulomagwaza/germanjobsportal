
import "./header2.css"
import { useContext } from 'react';

import { UserContext } from '../../App';
import Flag from "../../assets/german flag.svg"



const SavedHeader = () => {

  const {lightMode} = useContext(UserContext);
  return (
    <header className="header2">
    <h1 className={lightMode? "logoTitle-light" : "logoTitle"}>Saved Jobs</h1>
   <img src={Flag} alt="" id="flag" />
    
  </header>
  )
}

export default SavedHeader