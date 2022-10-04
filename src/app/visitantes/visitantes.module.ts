import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';

import { VisitantesRoutingModule } from './visitantes-routing.module';
import { VisitantesComponent } from './components/visitantes/visitantes.component';
import { VisitantesDetailsComponent } from './components/visitantes-details/visitantes-details.component';


@NgModule({
  declarations: [
    VisitantesComponent,
    VisitantesDetailsComponent
  ],
  imports: [
    CommonModule,
    VisitantesRoutingModule,
    AppMaterialModule,
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class VisitantesModule { }
