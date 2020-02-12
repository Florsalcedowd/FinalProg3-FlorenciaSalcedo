import { PersonaService } from '../../../services/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../models/persona';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor( private personaService: PersonaService) { }

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
    this.personaService.getAll().subscribe( data => {
      this.personas = data;
    });
  }

  delete(persona: Persona): void {
    const opcion = confirm('¿Está seguro que desea eliminar este registro?');
    if (opcion === true) {
      this.personaService.delete(persona.id).subscribe( data => {
        alert('El registro fue eliminado');
        const indexOfPersona = this.personas.indexOf(persona);
        console.log(indexOfPersona);
        this.personas.splice(indexOfPersona, 1);
      });
    }
  }

  updatePersona(persona: Persona) {
    console.log(persona);
  }

  onPreUpdate(persona: Persona): void {
    this.personaActual = Object.assign({}, persona);
  }

}
