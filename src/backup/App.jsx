import { createContext } from "react";
import Header from "./components/header/Header";
import Filter from "./components/filter/Filter";
import Listings from "./components/listings/Listings";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Savedjobs from "./components/savedjobs/Savedjobs";
import JobDescription from "./components/jobDescription/JobDescription";

 


export const UserContext= createContext();

function App() {
  const [jobs, setJobs]= useState([]);
    const [limit, setLimit] = useState(15);
    const [loading, setLoading] = useState(true);
    const [lightMode, setLightMode] = useState(JSON.parse(localStorage.getItem('lightMode')) || false);
    /* const [remote, setRemote] = useState(false); */
  
    async function getJobs(){

        const response= await fetch("https://www.arbeitnow.com/api/job-board-api");
        const data= await response.json();
        console.log(data.data);
        setJobs(data.data);
        setLoading(false);

         /* const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
 
        // Update the state of the jobs array with the bookmarked jobs
        setJobs([...jobs,...bookmarkedJobs]);  */
           // Retrieve the bookmarked jobs from local storage
  const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

  // Update the state of the jobs array with the bookmarked jobs
  const updatedJobs = data.data.map((job) => {
    const bookmarkedJob = bookmarkedJobs.find((bj) => bj.url === job.url);
    return {
      ...job,
      bookmarked: !!bookmarkedJob,
    };
  });

  setJobs(updatedJobs);
  setLoading(false);
}   



      useEffect(()=>{
        getJobs();
      },[])


      const handleLoadMore = () => {
        setLimit(limit + 10);
      }
      const handleRemote = (event) => {
        setRemote(event.target.checked);
      }

      const handleBookmark = (job) => {
        // Toggle the bookmark state of the job
        job.bookmarked =!job.bookmarked;

        // Update the state of the jobs array
        setJobs([...jobs]); 

        // Save the bookmarked job in local storage
        if (job.bookmarked) {
          localStorage.setItem(job.url, JSON.stringify(job));

          // Update the bookmarked jobs array in local storage
          const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
          bookmarkedJobs.push(job);
          localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
        } else {
          localStorage.removeItem(job.url);

          // Update the bookmarked jobs array in local storage
          const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
          const index = bookmarkedJobs.findIndex(bj => bj.url === job.url);
          if (index!== -1) {
            bookmarkedJobs.splice(index, 1);
            localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));

          }
      
      
      

        }
      }

      
      const [isRemoteChecked, setIsRemoteChecked] = useState(false);



      //SEARCH

      const cities = [
        'Berlin',
        'Hamburg',
        'Munich',
        'Cologne',
        'Frankfurt',
        'Stuttgart',
        'Bremen',
        'Dresden',
        'Leipzig',
        'Essen',
        'Hanover',
        'Nuremberg',
        'Dortmund',
        'Wuppertal',
        'Bonn',
        'Karlsruhe',
        'Augsburg',
        'Wiesbaden',
        'Kiel',
        'Rostock',
        'Darmstadt',
        'Regensburg',
        'Ulm'
      ];


      const [selectedCity, setSelectedCity] = useState("");
      const [filterJobs, setFilterJobs] = useState([]);
      const handleSelect = (event) => {
        /* setSelectedCity(event.target.value); */
        const selectedCity = event.target.value;
        const newJobs = jobs.filter((job) => job.city === selectedCity);
        setSelectedCity(selectedCity);
        setFilterJobs(newJobs);
       }
       const [search, setSearch] = useState('');
       const handleSearch = (event) => {
        setSearch(event.target.value);
      }
      const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase()) );
    /*   || job.company_name.toLowerCase().includes(search.toLowerCase()) 
      || job.location.toLowerCase().includes(selectedCity.toLowerCase()) 
      || job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) */
     



  return (
    <>
       <UserContext.Provider value={{jobs, handleBookmark, handleLoadMore, limit, setLimit, setJobs,
                                  cities, selectedCity, setSelectedCity, handleSelect, search, setSearch, handleSearch, filteredJobs, loading, setLoading,
                                   handleRemote, isRemoteChecked, setIsRemoteChecked, filterJobs, setFilterJobs, lightMode, setLightMode}}>
  
 
     <Routes>
   
   
    <Route exact path="/" element={<Listings/>} />
   
   
    <Route exact path="/savedjobs" element={<Savedjobs/>} />
    <Route exact path="/job/:index" element={<JobDescription/>} />
    
    </Routes> 
 
    
</UserContext.Provider>
    
    
    
    
      
    </>
  )
}

export default App
