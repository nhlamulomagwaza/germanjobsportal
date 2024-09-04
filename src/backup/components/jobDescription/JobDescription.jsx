import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Link, useParams } from 'react-router-dom';
import Flag from "../../assets/flat.jpg"
import "./job.css"
import { UserContext } from "../../App";
import { useContext } from "react";

const JobDescription = () => {
  const { index } = useParams();

  const [jobs, setJobs]= useState([]);

  const { handleRemote, lightMode, isRemoteChecked, setIsRemoteChecked, search, handleSearch, selectedCity, handleSelect, cities} = useContext(UserContext);




  async function getJobs(){

      const response= await fetch("https://www.arbeitnow.com/api/job-board-api");
      const data= await response.json();
     console.log(data.data[index]);
      
      setJobs(data.data[index]);
            
}
 const  jobsDescription= jobs.description?.replace(/<\/?[^>]+(>|$)/g, "");
 
    useEffect(()=>{
      getJobs();
    },[])




  return (
    <>
      <Header />
     
      <div className="main">

    <div className={lightMode? "desc-light" : "desc"}>
    <div className="descriptioncontainer">

        <div className="descriptiontitle"> <img src={Flag} alt="" className="flag" />
               

               <div className="jobdt"><h1 className="description-title">{jobs.company_name}</h1>
                                    <p className="joblocale">{jobs.location}</p></div>
    
    </div>
    <div className="cta">
    <a href={jobs.url} target='_blank'> <button className={lightMode? "savedjobs-light cta": "savedjobs cta"}>Company Site</button></a>
    </div>
       
    </div>
        
    </div>
    <div className={lightMode? "descriptionstuff-light": "descriptionstuff"}>

         <div className="stuffcontainer">
              <div className="stuffcol1">
            
              <p className="date">{jobs.tags?.join(" | ")}</p>


              <h1 className="stuff-title">{jobs.title?.
            replace(" (m/w/d)", "")
            ?.replace(" (f/m/d)", "")
            ?.replace("(m|w|d)", "")
            ?.replace(" (w/m/d)", "")
            ?.replace("M/W/D", "")
            ?.replace("m/f/d", "")
            ?.replace("m/w/x", "")}</h1>
            
              </div>
              <div className="stuffcol2">
              <a href={jobs.url} target='_blank'><button className={lightMode? "savedjobs-light apply": "savedjobs apply"}>Apply Now</button></a>
              </div>
         </div>
<p className="description">{jobsDescription}</p>
</div>

<div className="back">
<Link to="/">
<button className={lightMode? "savedjobs-light back": "savedjobs back"}>Home</button></Link>
    </div>
    </div>
    </>
  );
}  


export default JobDescription;