import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Content from './Content';

export default function Display() {
    const[data,setData] = useState([]);
    const[startDate,setStartDate] = useState(``);
    const[endDate,setEndDate] = useState(``);
    const[apiStartDate,setApiStartDate] = useState(``);
    const[apiEndDate,setApiEndDate] = useState(``);
    
    const dateStart = (event) =>{
        setStartDate(event.target.value);
        console.log(startDate)
    }
    const dateEnd = (event) =>{
        setEndDate(event.target.value);
        console.log(endDate);
    }
    const submit = () =>{
        if(startDate !== `` && endDate !== ``){
            setApiEndDate(endDate);
            setApiStartDate(startDate);
            console.log("date set");
        }
        else{
            alert("Enter Date Correctly");
        }
    }

    const fetchData = async () =>{
        let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${apiStartDate}&endtime=${apiEndDate}&latitude=22.9734&longitude=78.6569&maxradiuskm=2000`;
        
        let loading = document.createElement('div');
        loading.innerText ='Loading.....';
        loading.style.color='red';
        loading.style.fontSize="2rem";
        document.getElementById('id').appendChild(loading);
        let response = await fetch(url);
        let info = await response.json();
        let array  = info[`features`];
      //  console.log(info[`features`][0].properties.title);
      console.log(array);
      loading.remove();
      setData(array);
    }
    useEffect(()=>{fetchData()},[apiStartDate,apiEndDate]);
  return (
    <div>
     <h4 className='center'>Supported Date Format YYYY-MM-DD</h4>
        <div className='dateContainer'>
       
          <div>
            <p>Enter Start Date</p>
            <input type="text" onChange = {dateStart} value={startDate} class="start"/>
            
          </div>
          <div>
            <p>Enter End Date</p>
            <input type="text" onChange = {dateEnd} value={endDate} class="end"/>
          </div>
         
            
     </div>
     <div className='buttonContainer'>
     <button class="submit" type= "button" onClick={submit}>Submit</button>
     <p>Recent Earthquake events around India are shown by default, Enter start and end date to view data</p>
     </div>
      

      {(apiStartDate.length !== 0 && apiEndDate.length !== 0) ? <p className='center'><b>{data.length} Events Found between <b>{apiStartDate}</b>  and <b>{apiEndDate} </b></b>  </p> : <p className='center'><b> Most recent Events</b></p>}

      <div className='display' id='id'>
        {
            data.map((ele)=>{
                return(
                    <Content title = {ele.properties.title} lat={ele.geometry.coordinates[0]} lon={ele.geometry.coordinates[1]} z={ele.geometry.coordinates[0]} magnitude = {ele.properties.mag} place = {ele.properties.place} type = {ele.properties.type} url = {ele.properties.url} source={ele.properties.source}/>
                );
            })
        }
      </div>
     
       
    </div>
  )
}
