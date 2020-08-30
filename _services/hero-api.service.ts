import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroApiService {
  ACCESS_TOKEN = 104780894689244
  BASE_URL = "https://superheroapi.com/api/"+this.ACCESS_TOKEN;
  
  constructor(private http: HttpClient) { }

  getSearchName(name) {
    return this.http.get(this.BASE_URL + '/search/' + name);
  }
}
