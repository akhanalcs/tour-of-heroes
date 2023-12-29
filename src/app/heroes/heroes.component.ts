import { Component } from '@angular/core';
import { Hero } from "../hero";
import {
  UpperCasePipe,
  NgFor
} from "@angular/common";
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HEROES } from "../mock-heroes";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    NgFor
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
