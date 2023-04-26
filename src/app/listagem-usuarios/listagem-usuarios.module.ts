import { ListagemUsuariosService } from './listagem-usuarios.service';
import { ListagemUsuariosComponent } from './listagem-usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FiltroComponent } from '../filtro/filtro.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    ListagemUsuariosComponent,
    FiltroComponent,
    ModalUsuarioComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    NgxLoadingModule.forRoot({}),
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [ListagemUsuariosService],
  exports: [
    ListagemUsuariosComponent
  ]
})
export class ListagemUsuariosModule { }
