import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor(private http: HttpClient) { }
  getMapData() {
    const url = 'http://team-scale.com/TestData/ng_text_v15/api';
    return this.http.get(url);
  }

  // sendGoRequest(data){
  //   const url = 'https://devapi.inmotionplatform.com/api/v1/deeplink/create';
  //   return this.http.post(url, data);
  // }

}
