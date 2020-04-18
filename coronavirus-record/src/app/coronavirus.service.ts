import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CoronavirusService {
  readonly BASE_URL = 'http://localhost:8080/patient';
  token;
  constructor(private http: HttpClient) { }


  getCountryAndCities(): Observable<any> {
    return this.http.get<number>(this.BASE_URL + '/countryAndCities');
  }

  savePatient(patient): Observable<any> {
    return this.http.post(this.BASE_URL, patient);
  }

  public getIPAddress(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  public getEmailValidation(email) {
    return this.http.get<number>(this.BASE_URL + '/valid/' + email);
  }
}
