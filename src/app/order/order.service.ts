import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  baseUrl = environment.apiUrl + 'api/';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get(this.baseUrl + 'orders').pipe(
      map((order: IOrder[]) => {
        return order.sort((a, b) => a.id - b.id);
      })
    )
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.http.get(this.baseUrl + 'orders/' + id).pipe(
      map((order: IOrder) => {
        return order;
      })
    )
  }
  
}
