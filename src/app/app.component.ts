import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'meteo';
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  // doSearch(searchValue) {
  //   const userInput = searchValue.split(',').map((s) => s.trim());
//   this.weatherService
//     .getCurrentWeather(
//       userInput[0],
//       userInput.length > 1 ? userInput[1] : undefined
//     )
//     .subscribe((data) => console.log(data));
  // }
}