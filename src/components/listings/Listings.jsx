
import { FaBookmark } from "react-icons/fa";
import "./listings.css";
import { useContext } from 'react';

import { UserContext } from '../../App';

import Filter from '../filter/Filter';
import Header from '../header/Header';

import { Link } from 'react-router-dom';

const Listings = () => {
    

    const {search, lightMode, loading, limit, handleBookmark, handleLoadMore, filteredJobs, isRemoteChecked, selectedCity} = useContext(UserContext);
    const noMatches= `No matches found for "${search}"`;
    
    const jobs = isRemoteChecked
    ? filteredJobs.filter(job => job.remote)
    : filteredJobs;

     const locations = selectedCity ===""? jobs: jobs.filter(job => job.location.toLowerCase() === selectedCity.toLowerCase());
   return (

    <>
     <Header/>
<Filter/>
    
    <div className="listings-container">
    {loading? <div className="spinner"></div> : (
  
   <section className={lightMode? "listings-light": "listings"}>
   
   
   {locations.length === 0 && search.length>0? <div className="matches"><p>{noMatches}</p></div> : locations.slice(0, limit).map((job, index)=>(
              
  
       
        <li key={job.url} className={lightMode? "job-card-light": "job-card" }>
            
  <Link to={`/job/${index}`} className="links">
            <div className={lightMode? "column1-light": "column1"}>
             <p className="company-name">{job.company_name}</p>
           
            <h1 className={lightMode? "job-title-light": "job-title"}>{job.title.
            replace(" (m/w/d)", "")
            .replace(" (f/m/d)", "")
            .replace("(m|w|d)", "")
            .replace(" (w/m/d)", "")
            .replace("M/W/D", "")
            .replace("m/f/d", "")
            .replace("m/w/x", "")} </h1> 
               
            <div className="job-details">
                
                <p className="post-date">Posted: {job.created_at}&nbsp; | </p>
                <div className="location">{job.location}&nbsp;  | </div>
                <div className="job-type">{job.remote ? "Remote" : "On-site"}</div>
            
                </div> 
               
                </div>
                </Link>
                <div className="column2">
               
                    <div className="tags">
                   
                    {job.tags.map((tag)=>(
                        <div className={lightMode? "tag-light": "tag"} key={tag}>{tag} </div>
                    ))}       
                      <FaBookmark className={lightMode? "bookmark-light": "bookmark"} size={15} id= {lightMode? "bookmark-light": null} color={job.bookmarked? "rgb(5, 204, 204)" : "gray"} onClick={() => { handleBookmark(job)
                                             {job.bookmarked? alert("Job saved") : alert("Job removed")}}}  />
                    </div>
                </div>
              {/*   <div className="column3">
                    <div className="bookmark">
                        <FaRegBookmark />
                    </div>
                </div> */}
       
        </li>

    ))}

{locations.length===0 && search.length<=0 ?  <div className="matches"><p>no jobs to show</p></div> : null}

  </section>)} 

  
  <div className="btn">
  {locations.length>15 &&(
     <button className={limit > 100  || loading || isRemoteChecked ? "none" : "load-more"} onClick={handleLoadMore} id={lightMode? "load-more-light": null}>Load More</button>
    )}
     </div>
     

       </div>
  </>
  )
}

export default Listings