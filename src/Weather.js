import React, {useState} from 'react';
import requests from './requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './weather.css';

export default function Weather(){
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [show,setShow] = useState('');
  // const [units,setUnits] = useState('metric');
  const search = evt =>{


    if(evt.key === "Enter" && query){

   callapi();

    }


  }

  function callapi(){
    fetch(requests.base+"weather?q="+query+"&units=metric&appid="+requests.key)
    .then(res => res.json())
    .then(result => {
      setQuery('');
    console.log(result);

   if(result.cod === 200) {
     setWeather(result);
      setShow('0')
      setShow('1')
      if(typeof weather.weather != 'undefined'){

      const iconurl = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
      const s = document.querySelector('img');
      s.setAttribute('src',iconurl);
      console.log('sdfasf');

      }
      document.querySelector('.location-wrapper .location').style.animation = 'move1 1s ease-in-out'
      document.querySelector('.location-wrapper .date').style.animation = 'move2 1s ease-in-out'
      document.querySelector('.weather-wrapper .weather').style.animation = 'increase 1s linear'
      document.querySelector('.weather-wrapper .Temp').style.animation = 'move 1s ease-in-out ';
    }
      else{
      setShow('0')
    }


  })
  .catch(error => {
    setShow('0');
    setWeather(weather);
  })

  }


  const submit =  () =>{
    let v = document.querySelector('.search-bar').value
    setQuery(v);
    v = query;
    if(query){
    callapi();
  }else{
    alert('hey enter something');
  }

  }


  const DateBuilder = (d) =>{
    let months = ['January','February','March','April','May','June','July','August',
                    'September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

   return(
     <div  className='weather'>
               <div className='search-box'>
                <input
                type='text'
                placeholder='Search...'
                className='search-bar'
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
                <button className='submit' onClick={submit}>
                     Get Weather
                </button>
               </div>

      {parseInt(show) ? (
        <div className='wrapper'>
        <div className='location-wrapper'>
           <h2 className='location'>{weather.name}, {weather.sys.country}</h2>
           <h3 className='date'>{DateBuilder(new Date())}</h3>
        </div>
        <div className='weather-wrapper'>
         <div className='Temp'>
         {weather.main.temp}°C
         </div>
         <h3 className='weather'>
         {weather.weather[0].main}
         </h3>
         <p>&uarr;<h4>{weather.main.temp_max}</h4>  &darr;<h4>{weather.main.temp_min}</h4></p>
         <img src='' alt="weather icon" />
        </div>
        </div>

      ) : ('')}


    </div>

   )

}
