import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { IWeather } from '../iweather'
import { map } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'
import { Coordinates } from '../iCoordinates';

interface ICurrentWeatherData {
  weather: [{
      description: string,
      icon: string
    }],
    main: {
      temp: number
    },
    sys: {
      country: string
    },
    dt: number,
    name: string
}

export interface IWeatherService {
  readonly currentWeather$ : BehaviorSubject < IWeather >
  getCurrentWeather(city: string, country: string): Observable < IWeather >
  getCurrentWeatherByCoords(coords: Coordinates): Observable < IWeather >
  updateCurrentWeather(search: string | number,country ? : string): void
}


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly currentWeather$ = new BehaviorSubject < IWeather > ({
  city: '--',
  country: '--',
  date: Date.now(),
  image: '',
  temperature: 0,
  description: '',
})

  // currentWeather$.subscribe(data => this.current = data)
  // currentWeather$.next(newData)

  // ReplaySubject ==> mise en cache du flux et le renvoie 
  // BehaviorSubject  ==> derniere data emise et la renvoie
  // AsyncSubject ==> une data ponctuelle


  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(
    search: string | number,
    country ? : string
  ): Observable < IWeather > {
    let uriParams = new HttpParams();

    if (typeof search === 'string') {
      uriParams = uriParams.set('q', country ? `${search},${country}` : search);
    } else {
      uriParams = uriParams.set('zip', search);
    }
    return this.getCurrentWeatherHelper(uriParams);
  }


  updateCurrentWeather(
  search: string | number,
  country ? : string
): void {
  this.getCurrentWeather(search, country).subscribe(weather => this.currentWeather$.next(weather))
}

  private getCurrentWeatherHelper(uriParams: HttpParams): Observable < IWeather > {
    //uriParams = uriParams.set('appId', environment.appId);

    return this.httpClient
      .get < ICurrentWeatherData > (
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` + `${uriParams}&appid=${environment.appId}`
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)));
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): IWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    };
  }
  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }

  getCurrentWeatherByCoords(coords: Coordinates): Observable < IWeather > {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());
    return this.getCurrentWeatherHelper(uriParams)
  }
}