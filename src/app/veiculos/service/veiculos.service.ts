import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http'
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private httpClient: HttpClient) { }

  getById (id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/veiculos/${id}`);
  }

  findAll(pageEvent: PageEvent, query?: string | null){
    let params = new HttpParams()
    .append("page", pageEvent.pageIndex)
    .append("size", pageEvent.pageSize);
    if(query) params = params.append('query', query);
    return this.httpClient.get<any>(`${environment.apiUrl}/veiculos/all`,{params});
  }

  create (formData: Object) {
    return this.httpClient.post<any>(`${environment.apiUrl}/veiculos`, formData);
  }

  update (formData: Object, id: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/veiculos/${id}`, formData);
  }

  delete (id: any) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/veiculos/${id}`);
  }

  findAllAptos(){
    return this.httpClient.get<any>(`${environment.apiUrl}/apartamentos/all`)
  }
}
