import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {

  msg = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<ModalConfirmacaoComponent>,
  ) {

    this.msg = dados.mensagem

  }

  ngOnInit(): void {
  }

}
