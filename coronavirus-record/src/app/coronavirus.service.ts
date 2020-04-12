import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CoronavirusService {

  token;
  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept:  'application/json',
        'api-token': 'mfJELJmZbuwqxQmOSVM0f_VZ3Rg4ciffSAsYsLwL6hRCmTuhogdqP2CZGMoxiv6twnQ',
        'user-email': "hudeda641@gmail.com"
      })
    };
    return this.http.get('https://www.universal-tutorial.com/api/getaccesstoken', httpOptions);

  }

  getCountries(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Accept': 'application/json'
      })
    };
    return this.http.get('https://www.universal-tutorial.com/api/countries/', httpOptions);
  }

  getCities(city): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Accept': 'application/json'
      })
    };
    return this.http.get('https://www.universal-tutorial.com/api/states/' + city, httpOptions);
  }

  savePatient(patient): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('http://localhost:8080/patient', patient);
  }

  public getIPAddress(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  setToken(token) {
    this.token = token.auth_token;
  }

}
