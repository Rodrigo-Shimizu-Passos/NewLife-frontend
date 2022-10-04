import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http'
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class VisitantesService {
  constructor(private httpClient: HttpClient) { }

  getById (id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/visitantes/${id}`);
  }

  findAll(pageEvent: PageEvent, query?: string | null){
    let params = new HttpParams()
    .append("page", pageEvent.pageIndex)
    .append("size", pageEvent.pageSize);
    if(query) params = params.append('query', query);
    return this.httpClient.get<any>(`${environment.apiUrl}/visitantes/all`,{params});
  }

  create (formData: Object) {
    return this.httpClient.post<any>(`${environment.apiUrl}/visitantes`, formData);
  }

  update (formData: Object, id: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/visitantes/${id}`, formData);
  }

  delete (id: any) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/visitantes/${id}`);
  }

  findAllAptos(){
    return this.httpClient.get<any>(`${environment.apiUrl}/apartamentos/all`)
  }
}
