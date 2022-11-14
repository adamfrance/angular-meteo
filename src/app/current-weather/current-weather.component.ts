import { Component } from '@angular/core';
import { IWeather } from '../iweather';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  template: `
  <div>
  <div>
    <span>{{current.city}}, {{current.country}}</span>
    <span>{{current.date | date:'fullDate'}}</span>
  </div>
  <div>
    <img [src]='current.image'>
    <span>{{current.temperature | number:'1.0-0'}}˚F</span>
  </div>
  <div>
    {{current.description}}
  </div>
</div>
  `,
  styles: []
})
export class CurrentWeatherComponent  {

  current!: IWeather ;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getCurrentWeather('Paris', 'France').subscribe(data => this.current = data);
  }

}
