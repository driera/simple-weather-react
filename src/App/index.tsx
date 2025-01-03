import React, { FunctionComponent, useEffect, useState } from "react";
import { CurrentView } from "./Current/CurrentView";
import { CurrentWeather } from "./domain/current-weather-entity";
import { WeatherApiClient } from "./repositories/weather-api-client";

const App: FunctionComponent = () => {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const cityId = "2509954"; // Valencia, Spain

  useEffect(() => {
    const fetchData = async () => {
      const weather = new WeatherApiClient().setCityId(cityId);
      const result = await weather.getCurrentWeather();
      if (result.status === "success") {
        setWeatherData(result.data);
      }
    };

    fetchData();
  }, []);

  return <CurrentView weatherData={weatherData} />;
};

export default App;
