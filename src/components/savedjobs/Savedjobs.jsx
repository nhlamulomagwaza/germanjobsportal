
import { FaBookmark } from "react-icons/fa";
import "../listings/listings.css"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import SavedHeader from '../header/SavedHeader';
import SavedFilter from '../filter/SavedFilter';




const Savedjobs = () => {
  // Retrieve the saved jobs from local storage
  const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

  const {search, lightMode, loading, limit, handleBookmark, handleLoadMore, isRemoteChecked, selectedCity} = useContext(UserContext);
  const noMatches= `No matches found for "${search}"`;
  
  const filteredJobs = savedJobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase()) );
   

  const jobs = isRemoteChecked
  ? filteredJobs.filter(job => job.remote)
  : filteredJobs;

   const locations = selectedCity ===""? jobs: jobs.filter(job => job.location.toLowerCase() === selectedCity.toLowerCase());

  return (
<>
<SavedHeader/>
<SavedFilter/>
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
            .replace("m/w/x", "")}</h1>
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
                        <div className={lightMode? "tag-light": "tag"} key={tag}>{tag}</div>
                    ))}
                      <FaBookmark className={lightMode? "bookmark-light": "bookmark"} size={15} color={job.bookmarked? "rgb(5, 204, 204)" : "gray"} onClick={() => { handleBookmark(job)
                                             {job.bookmarked? alert("Job saved") : alert("Job removed")}}}  />
                    </div>
                </div>
              
           
        </li>

    ))}


{locations.length===0 && search.length<=0 ?  <div className="matches"><p>Bookmark jobs to save them here</p></div> : null}

  </section>)}

  
  <div className="btn">
  {locations.length>15 &&(
     <button className={limit > 100  || loading || isRemoteChecked? "none" : "load-more"} onClick={handleLoadMore} id={lightMode? "load-more-light": null}>Load More</button>
    )}
     </div>

  </div>
  </>
  );
};

export default Savedjobs;
