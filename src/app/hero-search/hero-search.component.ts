import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from "rxjs";
import { Hero } from "../hero";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgForOf } from "@angular/common";
import { HeroService } from "../hero.service";

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
    // This just means that when search term is pushed into 'this.searchTerms', emit them here
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // So the 'heroService.searchHeroes' call will only happen after 300ms
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap is a higher order mapping operator that automatically subscribes to the inner observable,
      // flatten the resulting observable and unsubscribe
      // The "flattening" process takes values emitted by inner observable and sends them directly to the output Observable.
      switchMap(term =>
        // the call here gives us inner observable but who subscribes to it? => switchMap 👆
        this.heroService.searchHeroes(term))
    );
  }
}
