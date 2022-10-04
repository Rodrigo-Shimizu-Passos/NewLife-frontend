import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculosDetailsComponent } from './components/veiculos-details/veiculos-details.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';

const routes: Routes = [
  {path: '', component: VeiculosComponent},
  {path: ':id', component: VeiculosDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
