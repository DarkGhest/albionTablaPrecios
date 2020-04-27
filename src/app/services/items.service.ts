import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

constructor(private http: HttpClient) { }
  getPrecies(items, ciudades) {
    return this.http.get(`https://www.albion-online-data.com/api/v2/stats/prices/${items}?locations=${ciudades}`);
  }
  getItems() {
    return this.http.get(`https://demo1163450.mockable.io/items`);
  }
  getCiudades() {
    return this.http.get(` https://demo1163450.mockable.io/ciudades`);
  }
}
