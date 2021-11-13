import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import '../detail-city.css';
 
const City = () => {    
    const location = useLocation()
    const city_data = location.state
    const [hourlyTemp, setHourlyTemp] = useState([]);
    const hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]

 

    async function HTTP_GET(lat, lon) {
        let response =  await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=daily,minutely,current,alerts&lang=ru&appid=37b1440e08357c82b2b3a48792f3f086` );
        if(!response.ok ){
            //TODO Bad request
            return null;
        }
        if( response.status !== 200){
            //TODO Not exist
            return null;
        }
        let data = await response.json();
        setHourlyTemp(data.hourly);
      }

   useEffect(() => {
      HTTP_GET(city_data.coord.lat, city_data.coord.lon);
   }, []);
   
    return (
        <div className="detail-info-block">
            <div style={{textAlign:'center'}}><h1> Подробности: {city_data.name}  </h1> </div>
            <ListGroup className="rows" >
                <ListGroup.Item className="row"> <div className="left-part">Макс./Мин.</div>  <div className="right-part"> {city_data.main.temp_min}/{city_data.main.temp_min} °C  </div> </ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Влажность</div>  <div className="right-part"> {city_data.main.humidity}% </div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Давление</div>  <div className="right-part">{city_data.wind.speed}km/h </div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Видимость</div>  <div className="right-part"> {city_data.visibility}m</div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Облачность</div>  <div className="right-part">{city_data.weather[0].description} </div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Восход/Рассвет</div>  <div className="right-part">  {new Date(city_data.sys.sunrise * 1000).toLocaleTimeString()} / {new Date(city_data.sys.sunset * 1000).toLocaleTimeString()}</div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Температура</div>  <div className="right-part"> {city_data.main.temp} °C</div></ListGroup.Item>
                <ListGroup.Item className="row"> <div className="left-part">Ощущается как</div>  <div className="right-part"> {city_data.main.feels_like} °C</div></ListGroup.Item>
            </ListGroup>

            <div className="hourly-temp"> 
                <div className="hourly-temp-inner">
                
               {
                    hourlyTemp.map(function(name,i)  {
                        if(i<24){
                            return (
                                <div style={{marginTop: `calc(100px - ${name.temp*3}px)` }} className="temp-cube" key={i}> {name.temp.toFixed()}°C<div className="hour"> {hours[i]} </div> </div>
                             )
                        }
                    })
               }
               
               </div>
            </div>
        </div>
    );


  }
  export default  City;