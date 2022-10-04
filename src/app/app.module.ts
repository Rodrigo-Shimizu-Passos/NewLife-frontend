import { AppMaterialModule } from './shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,//importando o AppMaterialModule que contém os imports do angular material compartilhados.
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
