import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { catchError, Observable, of, tap } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // :base/:collectionName
  // collectionName is the 'heroes' data object in the in-memory-data-service.ts
  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Angular injects singleton 'MessageService' into the 'private messageService' property when 'HeroService' is created
  constructor(private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        // catchError operator passes 'error' to the error handling function
        // 'handleError' function returns a function that will take the 'error' passed by catchError operator
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      // if not search term, return empty hero array.
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term}`;

    return this.httpClient.get<Hero[]>(url)
      .pipe(
        tap(heroes => heroes.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        // handleError is executed when an error occurs in the API call, and it returns a new function
        // This new function is only called when catchError passes the error to it
        // So 1.handleError call happens and 2. the function returned by handleError call happens
        // Function returned by handleError provides the "replacement Observable"
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  // Learn more here: https://youtu.be/L9kFTps_7Tk?si=M6ZWbR71SD13DPk4&t=107
  // This method returns an 'error handler' function that expects 'error: any` input parameter
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // 1TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // 1TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error}`);

      const emptyResult = result as T;

      // Let the app keep running by returning an empty result.
      return of(emptyResult);
    }
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
