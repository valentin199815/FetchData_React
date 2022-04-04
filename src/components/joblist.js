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

  var jobs = ["Computer Graphics Content","Engineering","Strategy & Operations","Product Engineering",
  "People","Go-To-Market","Think You Fit Somewhere Else?"];
  var locations = ["San Francisco Bay Area","Vancouver, British Columbia, Canada"]

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
  
  if(loading) return <h1><CircularProgress/></h1>;

  return (      
        <div className='container'>
          <div className='filters'>
            <select onChange={(e)=> setSearchTeam(e.target.value)}>
              <option value="" onClick={(e)=>setSearchTeam(e.target.value)}>No preferred</option>
              {jobs.map(job => {
                return <option value={job} onClick={(e)=>setSearchTeam(e.target.value)}>{job}</option>
              })}
            </select>

            <select onChange={(e)=> setSearchLocation(e.target.value)}>
              <option value="" onClick={(e)=> setSearchLocation(e.target.value)}>No preferred</option>
              {locations.map(location => {
                return <option value={location} onClick={(e)=>setSearchLocation(e.target.value)}>{location}</option>
              })}
              
            </select>
            <select>
              <option value="" onClick={(e)=> setSearchTime(e.target.value)}>No election</option>
              <option value="fulltime" onClick={(e)=> searchbytime(e.target.value)}>Full time</option>
            </select>
            
          </div>

          
          {
            
            jobs.reduce(i=>{
              if(searchbyTeam == "" && searchbylocation ==""){
                return(
                jobs.map(j=>{
                    return(
                      <>
                        <h2 className='grouped'>{j}</h2>
                        {
                          data.map(item =>{
                            if(item.categories.team == j){
                              return(
                                <>
                              <div key={item.id} className="jobs">
                                <div className='data'>
                                  <h2>{ item.text }</h2> 
                                  <p id='location'>{item.categories.location} / <span>{item.categories.team}</span> </p>
                                </div>
                                <div><a type="button" target="_blank" href={"https://paralleldomain.com/job?id="+item.id}>Apply</a></div>
                                
                              </div>
                              </>
                              )
                            }
                          })
                        }
                      </>
                    )
              }))
              }
              else if(searchbyTeam == "" && searchbylocation != ""){
                return(
                  jobs.reduce(j=>{
                      return(
                        <>
                          {
                            data.map(item =>{
                              jobs.map(job => {
                              if(item.categories.location == searchbylocation){
                                  if(item.categories.team == job){
                                    
                                    return(
                                      <>
                                        
                                        <div key={item.id} className="jobs">
                                            <div className='data'>
                                              <h2>{ item.text }</h2> 
                                              <p id='location'>{item.categories.location} / <span>{item.categories.team}</span> </p>
                                            </div>
                                        <div><a type="button" target="_blank" href={"https://paralleldomain.com/job?id="+item.id}>Apply</a></div>
                                          
                                        </div>
                                    </>
                                    )
                                                                  
                              }
                            }
                            })
                            })
                          }
                        </>
                      )
                }))   
                
              }else{
                return(
                  <>
                    <h2 className='grouped'>{searchbyTeam}</h2>
                    {
                      data.map(item =>{

                        if(item.categories.team == searchbyTeam){
                          if(searchbylocation == ""){
                            return(
                              <>
                            <div key={item.id} className="jobs">
                              <div className='data'>
                                <h2>{ item.text }</h2> 
                                <p id='location'>{item.categories.location} / <span>{item.categories.team}</span> </p>
                              </div>
                              <div><a type="button" target="_blank" href={"https://paralleldomain.com/job?id="+item.id}>Apply</a></div>
                              
                            </div>
                            </>
                            )
                          }else{
                            if(item.categories.location == searchbylocation){
                              return(
                                <>
                              <div key={item.id} className="jobs">
                                <div className='data'>
                                  <h2>{ item.text }</h2> 
                                  <p id='location'>{item.categories.location} / <span>{item.categories.team}</span> </p>
                                </div>
                                <div><a type="button" target="_blank" href={"https://paralleldomain.com/job?id="+item.id}>Apply</a></div>
                                
                              </div>
                              </>
                              )
                            }
                          }

                        }
                        
                      
                      
                      })
                    }
                  </>
                  
                )
                
                
              }             
              
            })
           
          
            
          }
          
        </div>
    
  );
}

export default Joblist;