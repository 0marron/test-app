import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import {WeatherCard} from './WeatherCard';

export const MainPage =()=>{
  const [fieldValue, setFieldValue] = useState("");
  const [countriesDic, countriesDicSet] = useState({});


  useEffect(() => {
    let storage = localStorage.getItem('weatherDataStorage') !== null;
    if(storage === true){
      countriesDicSet(JSON.parse(localStorage.getItem('weatherDataStorage')));
    }
}, []);
 
useEffect(() => {
  localStorage.setItem('weatherDataStorage', JSON.stringify(countriesDic));
}, [countriesDic]);

  function validateCountry(arg){
        if (arg === "") {
          return false;
        }
        if (!/^[a-zA-Z\s]*$/g.test(arg) || arg.length < 3 || arg === undefined) {
            return false;
        }    
        return true;
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
        countriesDicSet(countriesDic => ({...countriesDic, [city_name]: city_data }));
      }
 
      const submitHandler = (event)=>{
        event.preventDefault();
        if(validateCountry(fieldValue)){
            HTTP_GET(fieldValue);
        }
        else{
            //TODO Alert
        }
      }
      const onChangeHandler = (value)=>{
        setFieldValue(value);
      }
   
      const setStateHandler =(obj)=>{
        countriesDicSet(obj);
      }
    return (
      <>
      <div className="form-container">
       <Form onSubmit={ submitHandler } className="city-form">
        <Form.Group  md="5" controlId="validationCustom03">
            <Form.Control className="form-control"  onChange={(e) =>onChangeHandler(e.target.value)} value={fieldValue} type="text" placeholder="Город" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
        </Form.Group>
        <Button className="city-button" variant="primary" type="submit"  onSubmit={submitHandler}> Добавить </Button>
      </Form>
      </div>
      <div className="cards-container">
        {
                Object.keys(countriesDic).map ((city, i) => { 
                    return(
                        <WeatherCard key={i} propA={{city: city, countriesDic: countriesDic}} propB={{setStateHandler: setStateHandler}}  />
                    )
                })
        }
      </div>
      </>
    );
}
  