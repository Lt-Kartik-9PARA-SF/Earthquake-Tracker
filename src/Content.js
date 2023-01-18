import React from 'react'

export default function Content(props) {
  return (
    <div className='contentContainer'>
     <div className='content'>
        <h2>{props.title}</h2>
        <img src={`https://maps.geoapify.com/v1/staticmap?style=klokantech-basic&width=400&height=400&marker=lonlat:${props.lat},${props.lon};type:awesome;color:%23408ed7;size:x-large;icon:h-square;whitecircle:no&apiKey=8b26a07a738d4cd28e946c52494aee8d`} alt="Pripyat Amusement Park" class="static-map"></img>
        <p>{props.lat} {props.lon}</p>
        <h4>Magnitude : {props.magnitude}</h4>
        <p>Place : {props.place}</p>
        <p>Event: {props.type}</p>
        <a href={props.url} target="_blank">more details</a>
        <p>Source : US</p>

     </div>
    </div>
   
  )
}
