import axios from "axios";
import { SUPPORT_URL } from "../api/env";
import { useState, useEffect } from "react";

export const useGeocodeGen = (cityname: any, country: any) => {
    const [value, setValue] = useState<any>({
        "lat": null,
        "lng": null,
        "lat_sin": null,
        "lat_cos": null,
        "lng_rad": null,
        "value": null
    });

    useEffect(() => {
        axios.get((SUPPORT_URL + cityname + ',' + country).replace(' ', '')).then((response: any) => {
            setValue((prevState: any) => ({
                ...prevState,
                "lat": response.data.lat,
                "lng": response.data.long,
                "lat_sin": Math.sin(response.data.lat),
                "lat_cos": Math.cos(response.data.long),
                "value": `${response.data.lat},${response.data.long}`
            }));
        }).catch((err: any) => {
            console.log('error', err)
        });
    }, [cityname]);

    return value;
};