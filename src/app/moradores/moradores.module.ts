import { TelefonePipe } from './../shared/pipes/telefone.pipe';
import { RgPipe } from './../shared/pipes/rg.pipe';
import { CpfPipe } from './../shared/pipes/cpf.pipe';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';

import { MoradoresRoutingModule } from './moradores-routing.module';
import { MoradoresComponent } from './moradores/moradores.component';
import { MoradoresDetailsComponent } from './moradores-details/moradores-details.component';
import { DialogConfirmacaoComponent } from '../shared/dialog-confirmacao/dialog-confirmacao.component';

@NgModule({
  declarations: [
    MoradoresComponent,
    MoradoresDetailsComponent,
    DialogConfirmacaoComponent,
  ],
  imports: [
    CommonModule,
    MoradoresRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class MoradoresModule { }
