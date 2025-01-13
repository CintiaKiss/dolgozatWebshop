import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../entity/product';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`);
  }
}
