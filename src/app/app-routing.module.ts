import { ReadmeComponent } from './components/readme/readme.component';
import { TablaComponent } from './components/ngModel/tabla/tabla.component';
import { TablaReactivaComponent } from './components/prueba/tabla-reactiva/tabla-reactiva.component';
import { TablaFormComponent } from './components/tabla-form/tabla-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ReadmeComponent},
  { path: 'ngModel', component: TablaComponent},
  { path: 'reactiveTwoComponents', component: TablaReactivaComponent},
  { path: 'reactiveForm', component: TablaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
