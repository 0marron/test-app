import { Button,Card,ListGroup } from "react-bootstrap";
import '../App.css'
import { Link } from "react-router-dom";
export const WeatherCard =(props)=> {
   
    function clickHandlerAdd(){
        HTTP_GET(props.propA.city);
    }
    function clickHandlerDelete(){
        const copy = Object.assign({}, props.propA.countriesDic);
        delete copy[props.propA.city];
        props.propB.setStateHandler(copy);
    }
    async function HTTP_GET(city_name) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${city_name}&appid=37b1440e08357c82b2b3a48792f3f086` );
        if(!response.ok ){
            //TODO Bad request
            return;
        }
        if( response.status !== 200){
            //TODO Page not exist
            return;
        }
        let city_data = await response.json();
        props.propB.setStateHandler(countriesDic => ({...countriesDic, [city_name]: city_data }));
      }

return (
     
        <Card   className="weather-card"  >
        <Link to='/city' state= {props.propA.countriesDic[props.propA.city]}>
            <Card.Body>
            <Card.Title>  {props.propA.city}</Card.Title>
            <ListGroup variant="flush">
                        <ListGroup.Item>Температура: {props.propA.countriesDic[props.propA.city].main.temp} °C</ListGroup.Item>
                        <ListGroup.Item>Скорость ветра: {props.propA.countriesDic[props.propA.city].wind.speed.toFixed()} km/h</ListGroup.Item>
                        <ListGroup.Item>Облачность: {props.propA.countriesDic[props.propA.city].clouds.all.toFixed()} %</ListGroup.Item>
            </ListGroup>
            </Card.Body>
        </Link>
        <Button className="card-button" onClick={clickHandlerAdd} variant="success">Обновить</Button>
        <Button className="card-button" onClick={clickHandlerDelete} variant="danger">Удалить</Button>
    </Card>
  
 );    
}
 