import React, { Fragment, useState, useEffect } from 'react';
import { CircularProgress, CircularProgressWithLabel } from "@mui/material";
import axios from 'axios';
import "./app.css"

function Joblist() {
  const [data, setData] = useState([]);  
  const [searchbyTeam, setSearchTeam] = useState("");
  const [searchbylocation, setSearchLocation] = useState("");
  const [searchbytime, setSearchTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    axios
      .get("https://api.lever.co/v0/postings/paralleldomain?mode=json")
        .then(res =>{
          setData(res.data)
          setLoading(false);
        })
        .catch(err =>{
          console.log(err)
        })
  }, [])

  const filterjobs = data.filter(item =>{
      if(item.categories.location.includes(searchbylocation) && item.categories.team.includes(searchbyTeam) && item.categories.team.includes(searchbytime)){
        return item.categories.location.includes(searchbylocation);
      }
      
      
  });
  const fulllist = () =>{
    window.location.reload();
  }
  if(loading) return <h1><CircularProgress/></h1>;

  return (      
        <div className='container'>
          <div className='filters'>
            <select onChange={(e)=> setSearchTeam(e.target.value)}>
              <option value="Computer Graphics Content" onClick={(e)=>setSearchTeam(e.target.value)}>No preferred</option>
              <option value="Computer Graphics Content" onClick={(e)=>setSearchTeam(e.target.value)}>Computer Graphics Content</option>
              <option value="Engineering" onClick={(e)=>setSearchTeam(e.target.value)}>Engineering</option>
              <option value="Strategy & Operations" onClick={(e)=>setSearchTeam(e.target.value)}>Strategy & Operations</option>
              <option value="Product Engineering" onClick={(e)=>setSearchTeam(e.target.value)}>Product Engineering  </option>
              <option value="People" onClick={(e)=>setSearchTeam(e.target.value)}>People</option>
              <option value="Go-To-Market" onClick={(e)=>setSearchTeam(e.target.value)}>Go-To-Market</option>
              <option value="Think You Fit Somewhere Else?" onClick={(e)=>setSearchTeam(e.target.value)}>I don't know yet</option>
            </select>

            <select onChange={(e)=> setSearchLocation(e.target.value)}>
            <option value="Vancouver, British Columbia" onClick={(e)=> setSearchLocation(e.target.value)}>No preferred</option>
              <option value="San Francisco Bay Area" onClick={(e)=> setSearchLocation(e.target.value)}>San Francisco Bay Area</option>
              <option value="Vancouver, British Columbia, Canada" onClick={(e)=> setSearchLocation(e.target.value)}>Vancouver, British Columbia, Canada</option>
            </select>
            <select>
              <option value="fulltime" onClick={(e)=> setSearchTime(e.target.value)}>No election</option>
              <option value="fulltime" onClick={(e)=> searchbytime(e.target.value)}>Full time</option>
            </select>
            <button onClick={fulllist}>Show full list</button>
          </div>
          
          {
            filterjobs.sort((a, b) => a.categories.team > b.categories.team ? 1:-1).map(item =>(
              <div key={item.id} className="jobs">
                <div className='data'>
                  <h2>{ item.text }</h2> 
                  <p id='location'>{item.categories.location} / <span>{item.categories.team}</span> </p>
                </div>
                <div><a type="button" target="_blank" href={"https://paralleldomain.com/job?id="+item.id}>Apply</a></div>
                
              </div>
            ))
          }
        </div>
    
  );
}

export default Joblist;