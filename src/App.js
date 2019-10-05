import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [searchText, setSearchText] = useState('');

  const [weatherFetchError, setWeatherFetchError] = useState(undefined);

  const [weatherInfo, setWeatherInfo] = useState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
  });

  const { temperature, city, country, humidity, description } = weatherInfo;

  const getWeather = async e => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_KEY);
    try {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&lang=tr&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await api_call.json();
      console.log(data);
      setWeatherInfo({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });
    } catch (error) {
      setWeatherFetchError(error);
      console.log(weatherFetchError);
    }
  };

  const onSearchInputCange = e => {
    setSearchText(e.target.value);
  };

  return (
    <div className='col-12' style={{ height: '100vh', background: 'black' }}>
      <Header />
      <div className='col-12 mt-5'>
        <div className='col-12 col-md-8 offset-md-2 mt-5 mb-5'>
          <form onSubmit={getWeather}>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Search City'
                className='form-control text-dark border-success'
                value={searchText}
                onChange={onSearchInputCange}
              />

              <div className='input-group-append'>
                <button type='submit' className='btn btn-outline-success'>
                  Get Weather
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-12 col-md-8 offset-md-2'>
          <div className='card border border-success'>
            <div className='card-body' style={{ background: 'black' }}>
              <ul className='list-group list-group-flush'>
                <li
                  className='list-group-item d-flex justify-content-between text-white'
                  style={{ background: 'black' }}
                >
                  Şehir: <span className='text-success'> {city} </span>
                </li>
                <li
                  className='list-group-item d-flex justify-content-between text-white'
                  style={{ background: 'black' }}
                >
                  Sıcaklık:
                  <span className='text-success'> {temperature} &#8451; </span>
                </li>
                <li
                  className='list-group-item d-flex justify-content-between text-white'
                  style={{ background: 'black' }}
                >
                  Ülke: <span className='text-success'> {country} </span>
                </li>
                <li
                  className='list-group-item d-flex justify-content-between text-white'
                  style={{ background: 'black' }}
                >
                  Nem: <span className='text-success'> {humidity} </span>
                </li>
                <li
                  className='list-group-item d-flex justify-content-between text-white'
                  style={{ background: 'black' }}
                >
                  Açıklama:
                  <span
                    className='text-success text-truncate'
                    title={description}
                  >
                    {description ? description.toUpperCase() : ''}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
