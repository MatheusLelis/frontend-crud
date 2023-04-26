import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filtro } from '../interfaces/Filtro';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  filtroForm: FormGroup;
  todosStatus: any[] = []
  todasFaixasEtarias: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<FiltroComponent>
  ) {

    const filtro: Filtro = dados.filtro
    this.todosStatus = dados.todosStatus
    this.todasFaixasEtarias = dados.todasFaixasEtarias

    this.filtroForm = this.formBuilder.group({
      nome: [filtro.nome],
      cpf: [filtro.cpf],
      login: [filtro.login],
      idStatus: [filtro.idStatus],
      periodoNascimentoInicial: [filtro.periodoNascimentoInicial],
      periodoNascimentoFinal: [filtro.periodoNascimentoFinal],
      periodoInsercaoInicial: [filtro.periodoInsercaoInicial],
      periodoInsercaoFinal: [filtro.periodoInsercaoFinal],
      periodoAlteracaoInicial: [filtro.periodoAlteracaoInicial],
      periodoAlteracaoFinal: [filtro.periodoAlteracaoFinal],
      idFaixaEtaria: [filtro.idFaixaEtaria]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(filtrar: boolean) {
  }

}
