import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../../mocks/mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }
  /*
  hero = 'Windstorm';
  */
  heroes = HEROES;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  selectedHero: Hero;

  ngOnInit() {
  }
  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;
}
}
