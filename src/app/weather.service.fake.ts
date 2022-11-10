import { Observable, of } from 'rxjs';
import { IWeather } from './iweather';


export class WeatherServiceFake  {
  private fakeWeather: IWeather = {
    city: 'Paris',
    country: 'FR',
    date: 123456789,
    image: '',
    temperature: 256,
    description: 'il fait beau'
  };

  getCurrentWeather(city: string, country: string): Observable<IWeather> {
    return of(this.fakeWeather)
  }
}
