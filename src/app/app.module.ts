import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaComponent } from './components/ngModel/tabla/tabla.component';
import { FormComponent } from './components/ngModel/form/form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TablaFormComponent } from './components/tabla-form/tabla-form.component';
import { TablaReactivaComponent } from './components/prueba/tabla-reactiva/tabla-reactiva.component';
import { FormReactivoComponent } from './components/prueba/form-reactivo/form-reactivo.component';
import { ReadmeComponent } from './components/readme/readme.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    FormComponent,
    NavbarComponent,
    TablaFormComponent,
    TablaReactivaComponent,
    FormReactivoComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [FormReactivoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
