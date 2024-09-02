import React, { useState } from 'react';
import './App.css';
import { Card, Col, Container, FormControl, InputGroup, Row, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setData(null);
    setError('');
    setLoader(true);
    if (query.length < 3) {
      setError('Please enter a correct city or zip code.');
      setLoader(false);
    } else {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&aqi=yes`);
        setData(response.data);
        console.log(response.data);
        setLoader(false);
      } catch (err) {
        setError(err.response.data.error.message);
        setLoader(false);
      }
    }
  };

  return (
    <Container>
      <Row className='weather-card'>
        <Col lg={9} md={10}>
          <Card className='p-4 shadow weather-data'>
            <div className='search-bar'>
              <InputGroup>
                <InputGroup.Text id='basic-addon1'>
                  <i className='bi bi-search'></i>
                </InputGroup.Text>
                <FormControl onChange={(e) => setQuery(e.target.value)} placeholder='Enter city name/zip code...' />
                <Button disabled={loader} onClick={fetchData}>Search</Button>
              </InputGroup>
            </div>
            <div className='p-2'>
              {error ? <Alert variant={'danger'} key="danger">{error}</Alert> : ''}
            </div>
            <Container>
              {loader ? (
                <div className='text-center'>
                  <Spinner animation="border" />
                  <span className='d-block mt-2'>Fetching data...</span>
                </div>
              ) : null}
              {data ? (
                <div className='py-4'>
                  <span className='d-block text-center'><i className='bi bi-geo-alt'></i> {data.location.name}, {data.location.region}, {data.location.country}</span>
                  <span className='text-blue d-block text-center mt-2'><i className='bi bi-clock'></i> {data.location.localtime}</span>
                  <div className='my-4'>
                    <h5 className='text-blue d-flex align-items-center'>
                      Weather Condition:
                      <img src={data.current.condition.icon} alt="condition icon" className='ms-2 condition-icon' />
                    </h5>
                    <hr />
                    <div className='d-lg-flex flex-wrap justify-content-between mt-3'>
                      <span><span className='text-blue'>Temperature (C): </span><span>{data.current.temp_c}</span></span>
                      <span><span className='text-blue'>Condition: </span><span>{data.current.condition.text}</span></span>
                      <span><span className='text-blue'>Humidity: </span><span>{data.current.humidity}</span></span>
                      <span><span className='text-blue'>Wind (kph): </span><span>{data.current.wind_kph}</span></span>
                      <span><span className='text-blue'>Wind Direction: </span><span>{data.current.wind_dir}</span></span>
                      <span><span className='text-blue'>Pressure (in): </span><span>{data.current.pressure_in}</span></span>
                    </div>
                  </div>
                  <div className='my-4'>
                    <h5 className='text-blue'>Air Quality:</h5>
                    <hr />
                    <div className='d-lg-flex flex-wrap justify-content-between mt-3'>
                      <span><span className='text-blue'>CO: </span><span>{data.current.air_quality.co}</span></span>
                      <span><span className='text-blue'>Defra Index: </span><span>{data.current.air_quality['gb-defra-index']}</span></span>
                      <span><span className='text-blue'>NO<sub>2</sub>: </span><span>{data.current.air_quality.no2}</span></span>
                      <span><span className='text-blue'>O<sub>3</sub>: </span><span>{data.current.air_quality.o3}</span></span>
                      <span><span className='text-blue'>PM<sub>2.5</sub>: </span><span>{data.current.air_quality.pm2_5}</span></span>
                      <span><span className='text-blue'>PM<sub>10</sub>: </span><span>{data.current.air_quality.pm10}</span></span>
                      <span><span className='text-blue'>SO<sub>2</sub>: </span><span>{data.current.air_quality.so2}</span></span>
                    </div>
                  </div>
                </div>
              ) : null}
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

