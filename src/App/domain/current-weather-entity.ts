export interface CurrentWeather {
  city: string;
  clouds: number;
  // date: string;
  // hour: string;
  humidity: number;
  pressure: number;
  state: string;
  stateDescription: string;
  stateIcon: string;
  sunrise: string;
  sunset: string;
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  windAngle: number;
  windSpeed: number;
}

export interface CurrentWeatherRawData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export class CurrentWeatherEntity {
  private data;

  constructor(data: CurrentWeatherRawData) {
    this.data = data;
  }

  getWeatherConditions(): CurrentWeather {
    const mainConditions = this.data.main;
    const weatherConditions = this.data.weather[0];
    const windConditions = this.data.wind;
    const cloudConditions = this.data.clouds;
    const sunConditions = this.getSunData();
    return {
      pressure: mainConditions.pressure,
      temperature: mainConditions.temp,
      temperatureMin: mainConditions.temp_min,
      temperatureMax: mainConditions.temp_max,
      humidity: mainConditions.humidity,
      city: this.data.name,
      state: weatherConditions.main,
      stateDescription: weatherConditions.description,
      stateIcon: weatherConditions.icon,
      windSpeed: windConditions.speed,
      windAngle: windConditions.deg,
      clouds: cloudConditions.all,
      ...sunConditions
    };
  }

  getSunData() {
    const sunrise = this.data.sys.sunrise;
    const sunset = this.data.sys.sunset;

    return {
      sunrise: this.formatUnixToTime(sunrise),
      sunset: this.formatUnixToTime(sunset)
    };
  }

  formatUnixToTime(unix: number): string {
    return new Date(unix * 1000).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}
