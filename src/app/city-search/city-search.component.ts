import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styles: [],
})
export class CitySearchComponent implements OnInit {

  @Output() searchEvent = new EventEmitter < string > ()

  // trois niveaux de controle pour forms reactifs :
  // FormControl = 1 <--> 1
  // FormArray = entrees repetitives avec une collection objets
  // FormGroup = englobe FormControl et/ou FormArray

  search = new FormControl('', [Validators.minLength(2)]);

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue) => {
        if (searchValue) {
          if (!this.search.invalid) {
            this.searchEvent.emit(searchValue)
          }
        }
      });
  }
}