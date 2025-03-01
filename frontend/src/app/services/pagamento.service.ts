import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private url = "http://localhost:3333/api"

  constructor(private http: HttpClient) { }

  postPag(form: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, form)
  }
}
