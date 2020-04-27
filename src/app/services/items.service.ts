import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

constructor(private http: HttpClient) { }
  getPrecies(items) {
    return this.http.get(`https://www.albion-online-data.com/api/v2/stats/prices/${items}?locations=FortSterling,Lymhurst,Thetford,Martlock,Bridgewatch`);
  }
  getItems() {
    return this.http.get(`http://demo1163450.mockable.io/items`);
  }
}
