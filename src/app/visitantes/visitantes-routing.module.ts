import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitantesComponent } from './components/visitantes/visitantes.component';
import { VisitantesDetailsComponent } from './components/visitantes-details/visitantes-details.component';

const routes: Routes = [
  {path: '', component: VisitantesComponent},
  {path: ':id', component: VisitantesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitantesRoutingModule { }
