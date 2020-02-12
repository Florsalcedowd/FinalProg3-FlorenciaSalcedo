import { FormReactivoComponent } from '../form-reactivo/form-reactivo.component';
import { Component, OnInit, Host } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tabla-reactiva',
  templateUrl: './tabla-reactiva.component.html',
  styleUrls: ['./tabla-reactiva.component.css']
})
export class TablaReactivaComponent implements OnInit {

  constructor(private personaService: PersonaService,  @Host() private form: FormReactivoComponent, private router: Router,
              private formBuilder: FormBuilder) { }

  public personas: Persona[];
  public personaActual: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: null
  };

  ngOnInit() {
    this.getAllPersonas();
  }

  getAllPersonas(): void {
    this.personaService.getAll().subscribe(
      res => {
        this.personas = res;
      },
      err => {
        alert('Ha ocurrido un error al traer la lista');
      });
  }

  delete(persona: Persona): void {
    const opcion = confirm('¿Está seguro que desea eliminar este registro?');
    if (opcion === true) {
      this.personaService.delete(persona.id).subscribe( res => {
        alert('El registro fue eliminado');
        const indexOfPersona = this.personas.indexOf(persona);
        this.personas.splice(indexOfPersona, 1);
      },
      err => {
        alert('Ha ocurrido un error al eliminar registro, intente nuevamente');
      });
    }
  }

  onPreUpdate(persona: Persona): void {
    this.personaActual = Object.assign({}, persona);
    this.form.updatePersona(persona);
    /* this.form.formPersona = this.formBuilder.group({
      id: [persona.id],
      nombre: [persona.nombre, Validators.required],
      apellido: [persona.apellido, Validators.required],
      dni: [persona.dni, Validators.required]
    });
    console.log(this.form.formPersona.get('nombre').value); */
    this.form.ngOnInit();
  }

}
