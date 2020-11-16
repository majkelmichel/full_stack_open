import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = ({ cnt, weather, setWeather }) => {

    const weatherHook = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${cnt.name}&appid=${process.env.REACT_APP_APIKEY}&units=metric`)
            .then(res => {
                setWeather(res.data);
            })
    }

    useEffect(weatherHook, [cnt.name, setWeather]);
    return (
        <div>
            <h2>{cnt.name}</h2>
            capital {cnt.capital}<br/>
            population {cnt.population}<br/>
            <h3>languages</h3>
            <ul>
                {cnt.languages.map(lng => <li key={lng.name}>{lng.name}</li>)}
            </ul>
            <img src={cnt.flag} alt={cnt.name} width='600px' />
            <h3>Weather in {cnt.capital}</h3>
            <strong>temperature: </strong>{weather?.main?.temp}<br/>
            <strong>humidity: </strong>{weather?.main?.humidity}%<br/>
            <strong>wind: </strong>{weather?.wind?.speed}m/s {weather?.wind?.deg}deg
        </div>
    )
}

const Results = ({ countries, search, setSearch }) => {
    const re = new RegExp(search, 'i');
    const toRender = countries.filter(x => re.test(x.name));

    const [weather, setWeather] = useState({});

    if (toRender.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    if (toRender.length === 1) {
        const cnt = toRender[0];
        return (
            <View cnt={cnt} setWeather={setWeather} weather={weather} />
        )
    }
    return (
        <ul>
            {toRender.map(x => <li key={x.alpha2Code}>{x.name}<button onClick={() => setSearch(x.name)}>show</button> </li>)}
        </ul>
    )
}

const App = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                console.log(res.data);
                setResults(res.data);
            })
    }
    useEffect(hook, []);

    return (
        <div>
            <h2>countries</h2>
            find countres <input value={search} onChange={handleSearchChange} />
            <Results countries={results} search={search} setSearch={setSearch} />
        </div>
    )
}

export default App;