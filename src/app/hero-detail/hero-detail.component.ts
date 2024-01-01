import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms"; // <-- NgModel lives here
import { Location, UpperCasePipe } from "@angular/common";
import { Hero } from "../hero";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
    imports: [
        FormsModule,
        UpperCasePipe
    ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero){
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
