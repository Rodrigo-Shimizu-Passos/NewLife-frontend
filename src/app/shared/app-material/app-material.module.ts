import { TextPipe } from './../pipes/text.pipe';
import { TelefonePipe } from './../pipes/telefone.pipe';
import { RgPipe } from './../pipes/rg.pipe';
import { CpfPipe } from './../pipes/cpf.pipe';

import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({//incluir aqui tudo que será exportado do angular material, realizar os imports acima. Todos os componentes que importarem esse módulo terão todos os imports.
  declarations:[
    CpfPipe,
    RgPipe,
    TelefonePipe,
    TextPipe
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CpfPipe,
    RgPipe,
    TelefonePipe,
    TextPipe,
    MatDialogModule,
    MatSidenavModule
  ]
})
export class AppMaterialModule { }
