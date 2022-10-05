import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {

  constructor(private httpClient: HttpClient) { }

  getById (id: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/moradores/${id}`);
  }

  findAll(pageEvent: PageEvent, query?: string | null){
    let params = new HttpParams()
    .append("page", pageEvent.pageIndex)
    .append("size", pageEvent.pageSize);
    if(query) params = params.append('query', query);
    return this.httpClient.get<any>(`${environment.apiUrl}/moradores/all`,{params});
  }

  create (formData: Object) {
    return this.httpClient.post<any>(`${environment.apiUrl}/moradores`, formData);
  }

  update (formData: Object, id: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/moradores/${id}`, formData);
  }

  delete (id: any) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/moradores/${id}`);
  }

  findAllAptos(){
    return this.httpClient.get<any>(`${environment.apiUrl}/apartamentos/all`)
  }

  findAllList(query?: string | null){
    let params = new HttpParams();
    if(query) params = params.append('query', query);
    return this.httpClient.get<any>(`${environment.apiUrl}/moradores/allList`, {params})
  }

  importMorador(file: any){
    const formData = new FormData();
    formData.append('file',file);
    return this.httpClient.post(`${environment.apiUrl}/moradores/import`,formData);
  }
}
