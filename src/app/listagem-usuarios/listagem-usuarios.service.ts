import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Filtro } from '../interfaces/Filtro';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ListagemUsuariosService {

  constructor(
    private httpClient: HttpClient
  ) { }


  carregarTodosUsuarios() {
    return this.httpClient.get(`${environment.url}/usuarios`)
  }

  carregarTodosStatus() {
    return this.httpClient.get(`${environment.url}/usuarios/status`)
  }

  carregarTodasFaixasEtarias() {
    return this.httpClient.get(`${environment.url}/usuarios/faixaEtaria`)
  }

  atualizarUsuario(usuario: Usuario) {
    return this.httpClient.patch(`${environment.url}/usuarios/${usuario.id}`, usuario)
  }

  updateStatus(idUsuario: number, idStatus: number) {
    return this.httpClient.patch(`${environment.url}/usuarios/${idUsuario}/${idStatus}`, {})
  }

  criarUsuarioBanco(usuario: Usuario) {
    return this.httpClient.post(`${environment.url}/usuarios`, usuario)
  }

  filtrarUsuarios(filtro: Filtro) {
    console.log("iniciando consulta = ", filtro)
    return this.httpClient.post(`${environment.url}/usuarios/filtro/teste`, filtro)
  }

  removerTodos() {
    return this.httpClient.delete(`${environment.url}/usuarios/remover/todos`)
  }

  removerUsuario(usuario: Usuario) {
    return this.httpClient.delete(`${environment.url}/usuarios/${usuario.id}`)
  }
}
