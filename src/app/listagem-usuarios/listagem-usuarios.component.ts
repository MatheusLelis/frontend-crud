import { ListagemUsuariosService } from './listagem-usuarios.service';
import { ModalConfirmacaoComponent } from './../modal-confirmacao/modal-confirmacao.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { FiltroComponent } from '../filtro/filtro.component';
import { Filtro } from '../interfaces/Filtro';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { RequestService } from '../request.service';

import { Usuario } from './../interfaces/Usuario';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit {

  formulario!: FormGroup;
  dataSource!: any;

  filtroAplicado: Filtro = this.reiniciarFiltro();

  //Define as colunas que serão exibidas
  displayedColumns = ['nome', 'cpf', 'dataNascimento', 'login', 'status', 'editar-excluir'];

  usuario: Usuario[] = [];
  todosStatus: any[] = [];
  todasFaixasEtarias: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private service: ListagemUsuariosService
  ) {

    this.carregarDados()

    this.service.carregarTodasFaixasEtarias().subscribe((todasFaixasEtarias: any) => {
      console.log("todasFaixasEtarias = ", todasFaixasEtarias);
      this.todasFaixasEtarias = todasFaixasEtarias
    })

    this.service.carregarTodosStatus().subscribe((status: any) => {
      console.log("carregarTodosStatus = ", status);
      this.todosStatus = status
    })
  }

  reiniciarFiltro(){
    return {
      nome: '',
      cpf: '',
      login: '',
      idStatus: 3,
      periodoAlteracaoFinal: '',
      periodoAlteracaoInicial: '',
      periodoInsercaoFinal: '',
      periodoInsercaoInicial: '',
      periodoNascimentoFinal: '',
      periodoNascimentoInicial: '',
      idFaixaEtaria: 0,
    }
  }

  carregarDados(){
    this.service.carregarTodosUsuarios().subscribe((usuarios: any) => {
      console.log("todos Usuarios = ", usuarios);
      this.usuario = usuarios;
      this.instanciarTabela(this.usuario);
    })

    this.instanciarTabela(this.usuario);
  }

  get usuarios() {
    return this.formulario.get('usuarios') as FormArray;
  }

  ngOnInit(): void {
  }

  limparFiltro(){
    console.log("naõ estava igual")
    this.filtroAplicado = this.reiniciarFiltro()
    this.service.filtrarUsuarios(this.reiniciarFiltro()).subscribe((usuariosFiltrados: any) => {
      console.log('usuariosFiltrados = ', usuariosFiltrados)
      this.instanciarTabela(usuariosFiltrados)
    })
  }

  instanciarTabela(dados: Usuario[]) {

    this.usuario = dados
    this.dataSource = new MatTableDataSource<any>(dados);

    this.formulario = this.formBuilder.group({
      usuarios: this.formBuilder.array([])
    })
    for (let i = 0; i < dados.length; i++) {
      this.usuarios.push(
        this.formBuilder.group({
          nome: new FormControl(dados[i].nome),
          cpf: new FormControl(dados[i].cpf),
          status: new FormControl(dados[i].idStatus)
        })
      )
    }
  }

  abrirFiltro(){

    console.log('OpenDialog');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      filtro: this.filtroAplicado,
      titulo: 'Filtrar Usuários',
      todosStatus: this.todosStatus,
      todasFaixasEtarias: this.todasFaixasEtarias
    }

    const dialog = this.dialog.open(FiltroComponent, dialogConfig);
    dialog.afterClosed().subscribe((filtro: Filtro ) => {
      console.log('filtro = ', filtro)
      if(!filtro) return
      this.filtroAplicado = filtro
      this.service.filtrarUsuarios(filtro).subscribe((usuariosFiltrados: any) => {
        console.log('usuariosFiltrados = ', usuariosFiltrados)
        this.instanciarTabela(usuariosFiltrados)
      })
    })

  }

  editarUsuario(index: number){
    console.log("criarUsuario = ", this.usuario[index])
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      usuario: this.usuario[index],
      titulo: 'Editar Usuário'
    }


    const dialog = this.dialog.open(ModalUsuarioComponent, dialogConfig);
    dialog.afterClosed().subscribe((usuario: Usuario) => {
      console.log('edicaoooo = ', usuario)

      if(!usuario) return

      this.service.atualizarUsuario(usuario).subscribe(usuarioAtualizado => {
        console.log('usuarioAtualizado = ', usuarioAtualizado)
        this.openSnackBar('Usuário editado com sucesso.')
        this.carregarDados()
      })
    })
  }

  criarUsuario(){
    console.log("criarUsuario = ")
    const dialogConfig = new MatDialogConfig();

    const usuario: Usuario = {
      cpf: '',
      dataNascimento: '',
      dataAlteracao: null,
      dataInclusao: null,
      senha: '',
      email: '',
      idStatus: 3,
      nomeMae: '',
      nome: '',
      login: '',
      telefone: ''
    }

    dialogConfig.data = {
      usuario: usuario,
      titulo: 'Adicionar Usuário'
    }

    const dialog = this.dialog.open(ModalUsuarioComponent, dialogConfig);
    dialog.afterClosed().subscribe((usuario: Usuario) => {
      console.log('usuarioCriado = ', usuario)

      if(!usuario) return

      this.service.criarUsuarioBanco(usuario).subscribe(usuarioAtualizado => {
        console.log('usuarioAtualizado = ', usuarioAtualizado)
        this.openSnackBar('Usuário criado com sucesso.')
        this.carregarDados()
      })

    })
  }

  excluirTodos(){
    this.service.removerTodos().subscribe(remover => {
      console.log('remover = ', remover)
      this.openSnackBar('Todos os usuário foram excluidos com sucesso.')
      this.carregarDados()
    })
  }

  excluir(index: number){
    console.log("excluir = ", index)
    this.service.removerUsuario(this.usuario[index]).subscribe(remover => {
      console.log('remover = ', remover)
      this.openSnackBar('Usuário excluido com sucesso.')
      this.carregarDados()
    })
  }

  editarStatus(index: number, idStatus: number){
    console.log('editarStatus')
    const idUsuario: any = this.usuario[index].id
    if(!idUsuario) return
    this.service.updateStatus(idUsuario, idStatus).subscribe(value => {
      this.openSnackBar('Usuário excluido com sucesso.')
      this.carregarDados()
    })
  }

  onStatusChange(nomeUsuario: string, index: number, event: any){
    console.log('nomeUsuario', nomeUsuario, index, event)
    const idStatus = +event.target.value
    const msg = 'Tem certeza que deseja modificar o status?'
    this.abrirModalConfirmacao(msg, 3, index, idStatus)
  }

  abrirModalConfirmacao(msgConfirmacao: string, acao: number, index: number, idStatus: number = 0){

    console.log('msgConfirmacao = ', msgConfirmacao)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      mensagem: msgConfirmacao
    }

    const dialog = this.dialog.open(ModalConfirmacaoComponent , dialogConfig);
    dialog.afterClosed().subscribe((confirmado: boolean) => {
      if(confirmado){
        if(acao==1) this.excluirTodos()
        else if(acao==2) this.excluir(index)
        else if(acao==3) this.editarStatus(index, idStatus)
      }
    })
  }

  openSnackBar(mensagem: string) {

    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack'
    }

    this._snackBar.open(mensagem, '', config);
  }

}
