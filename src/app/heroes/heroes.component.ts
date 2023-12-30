import { Component, OnInit } from '@angular/core';
import {
  NgFor
} from "@angular/common";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgFor,
    HeroDetailComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  // To use this lifecycle hook method, you don't really have to do 'implements OnInit' on this class.
  // It works without that just fine.
  ngOnInit(){
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }
}
