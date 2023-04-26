import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  cadastrarUsuario(usuarioCriado: any){
    console.log('teste')
    return this.httpClient.post(`${url}/usuarios`, {usuarioCriado})
  }
}
