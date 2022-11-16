import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWeather } from '../iweather';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.component.html',
  styles: []
})
export class CurrentWeatherComponent implements OnInit {

  //Pour des interactions entre des composants : 
  // events
  // transmission vers des enfants
  // streaming de datas (recupere puis renvoie)
  currentWeatherSubscription!: Subscription

  @Input() current!: IWeather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.currentWeatherSubscription = this.weatherService.currentWeather$.subscribe(data => this.current = data)
  }

  ngOnDestroy(): void {
    this.currentWeatherSubscription.unsubscribe()
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''
  }

}