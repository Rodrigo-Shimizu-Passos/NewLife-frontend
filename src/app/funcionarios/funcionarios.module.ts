import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { FuncionariosDetailsComponent } from './components/funcionarios-details/funcionarios-details.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FuncionariosComponent,
    FuncionariosDetailsComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    AppMaterialModule,
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class FuncionariosModule { }
