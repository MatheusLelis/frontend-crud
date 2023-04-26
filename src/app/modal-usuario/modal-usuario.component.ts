import { Usuario } from './../interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  todosStatus:any[] = [];
  isCreate = true;
  titulo: string = ''

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    private httpClient: HttpClient
  ) {

    this.carregarTodosStatus().subscribe((status: any) => {
      console.log("carregarTodosStatus = ", status);
      this.todosStatus = status
    })

    const usuario: Usuario = dados.usuario;
    this.titulo = dados.titulo

    if(usuario.id) this.isCreate = false

    this.usuarioForm = this.formBuilder.group({
      id: [(usuario.id ? usuario.id : null)],
      nome: [usuario.nome, Validators.required],
      login: [usuario.login, Validators.required],
      senha: [usuario.senha, Validators.required],
      email: [usuario.email, Validators.required],
      telefone: [usuario.telefone, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      dataNascimento: [usuario.dataNascimento, Validators.required],
      nomeMae: [usuario.nomeMae, Validators.required],
      idStatus: [usuario.idStatus, Validators.required],
      dataInclusao: [usuario.dataInclusao]
    })

    // if(this.isCreate){
    //   this.usuarioForm.setControl('senha', [''])
    // }

  }

  salvarFormulario(){
    return this.usuarioForm.value
  }

  carregarTodosStatus(){
    return this.httpClient.get(`${environment.url}/usuarios/status`)
  }

  ngOnInit(): void {
  }

}
