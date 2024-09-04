
import { IoMdSearch } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import "./filter.css";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link } from 'react-router-dom';
const Filter = () => {
  const { lightMode, isRemoteChecked, setIsRemoteChecked, search, handleSearch, selectedCity, handleSelect, cities} = useContext(UserContext);




  return (
    <div className="main">
   <div className={lightMode? "filtercanvas-light": "filtercanvas"}>

   <div className={lightMode? "search-light": "search"}>

   <IoMdSearch size={21} className={lightMode? "icon-light": "icon"} />
   <input type="text" placeholder="filter by job title or company name" value={search} onChange={handleSearch}/>
   </div>

   <div className="location">

<IoLocation size={21} className={lightMode? "icon-light": "icon"}  />
   <div className={lightMode? "city-light": "city"}>
      <select value={selectedCity} onChange={handleSelect}>
        <option value="">{selectedCity?"All" : "filter by city" }</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>

   </div>


   <div className="remote">

  <input type="checkbox" name="check" id="check" checked={isRemoteChecked} onChange={()=> setIsRemoteChecked(!isRemoteChecked)} />
  <p className="remote">Remote Only</p>
   </div>

   <Link to="/savedjobs"><button className={lightMode? "savedjobs-light": "savedjobs"}>  saved jobs</button></Link>

   </div>
   </div>
  )

}
export default Filter