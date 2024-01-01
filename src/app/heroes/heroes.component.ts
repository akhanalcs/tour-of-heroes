import { Component, OnInit } from '@angular/core';
import {
  NgFor
} from "@angular/common";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  // To use this lifecycle hook method, you don't really have to do 'implements OnInit' on this class.
  // It works without that just fine.
  ngOnInit(){
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  addHero(name: string): void {
    name = name.trim();
    if(!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  deleteHero(hero: Hero): void {
    // Immediately remove hero from the list, anticipating that the HeroService succeeds on the server
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
