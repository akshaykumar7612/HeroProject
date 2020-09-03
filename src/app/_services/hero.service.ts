import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  ACCESS_TOKEN = 104780894689244;
  PROXY_URL= "https://cors-anywhere.herokuapp.com/";
  BASE_URL = this.PROXY_URL+"https://superheroapi.com/api/"+this.ACCESS_TOKEN;  
  constructor(private http: HttpClient) { }
  
  getSearchName(name) {
    return this.http.get(this.BASE_URL + '/search/' + name);
  }
}
