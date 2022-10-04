import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeiculosRoutingModule } from './veiculos-routing.module';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculosDetailsComponent } from './components/veiculos-details/veiculos-details.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VeiculosComponent,
    VeiculosDetailsComponent
  ],
  imports: [
    CommonModule,
    VeiculosRoutingModule,
    AppMaterialModule,
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class VeiculosModule { }
