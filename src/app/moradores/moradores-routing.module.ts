import { MoradoresDetailsComponent } from './moradores-details/moradores-details.component';
import { MoradoresComponent } from './moradores/moradores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', component: MoradoresComponent},
    {path: ':id', component: MoradoresDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoradoresRoutingModule { }
