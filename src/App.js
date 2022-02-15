import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData, getWeatherData } from './api/index';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weather, setWeatherData] = useState([]);
    const [filterPlaces, setFilterPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 0, lng:0});
    const [bound, setBounds] = useState({});
    const [childClicked, setChildClicked] =  useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurant');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat:latitude, lng:longitude});
        })
    }, []);

    useEffect(() => {
        const filterPlaces = places.filter((place) => place.rating >rating);
        setFilterPlaces(filterPlaces);
    }, [rating])

    useEffect(() => {
        try {
            if(bound.sw && bound.ne){
                setIsLoading(true);
                getWeatherData(coordinates.lat, coordinates.lng)
                    .then((data) => setWeatherData(data));
                getPlacesData(type, bound.sw, bound.ne)
                    .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    console.log('dataaaa',data);
                    setFilterPlaces([]);
                    setIsLoading(false);
                });
            }
        } catch(e) {
            console.log('ERRRRROR!!! : ', e);
        }
    }, [type, bound]);

    return (
        <div>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={filterPlaces.length ? filterPlaces : places} 
                    childClicked={childClicked} 
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filterPlaces.length ? filterPlaces : places}
                        setChildClicked={setChildClicked}
                        weather={weather}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;