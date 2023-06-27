import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
currencyvalue=new BehaviorSubject('usd')
  getcoinlist(currency:any , pagenumber:any){
     return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${pagenumber}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
  }
  chart(currency:any, coin:any, days:any){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`)
  }
  ohlc(currency:any, coin:any, days:any){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${currency}&days=${days}`)
  }
  categories(){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/categories`)
  }
  // assetPlatforms(){
  //   return this.http.get(`https://api.coingecko.com/api/v3/asset_platforms`)
  // }
}
