import React, { useEffect, useState } from 'react'
import services from "../../api/services";

const DestinationCities = (tid: number) => {
    const [cities, setCities] = useState([]);
    const server = services;

    useEffect(() => {
        server.getContinentCities(tid)
              .then((city: any) => setCities(city))
    }, []);


    return cities;
    
}

export default DestinationCities