import {Component, OnInit, signal} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import { Hero } from "../hero";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private testSignal = signal<number>(1);

  constructor(private heroService: HeroService) {}

  // Summary: Push the input 'search term' into the observable stream.
  // You type something, you'll immediately get here and emit 'term' into the searchTerms with .next(term)
  // and 'searchTerms' will emit that string value into the .pipe below (that's inside ngOnInit method below)
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // Learn more here: https://youtu.be/vtCDRiG__D4?si=F2qjot5atRc0MTFX&t=1459
    // 'this.heroes$' is outer observable which is subscribed in the template: 'heroes$ | async'
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // So the 'heroService.searchHeroes' call will only happen after 300ms
      debounceTime(10000),

      distinctUntilChanged(),

      // switchMap is a higher order mapping operator that automatically subscribes to the inner observable,
      // flatten the resulting observable and unsubscribe
      switchMap(term =>
        // the call here gives us inner observable but who subscribes to it? => switchMap 👆
        this.heroService.searchHeroes(term))
    );
  }
}
