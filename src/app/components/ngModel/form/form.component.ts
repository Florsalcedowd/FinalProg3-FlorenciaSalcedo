import { TablaComponent } from '../tabla/tabla.component';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, Host} from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private personaService: PersonaService, @Host() private tabla: TablaComponent) { }

  /* Permite comunicar componentes, crea una referencia hacia el evento (click) que se encuentra en el btnClose del html */
  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;

  /* Recibe la persona que viene desde la tabla */
  @Input() personaActual: Persona;
  @Input() personas: Persona[];

  public isError = false;

  ngOnInit() {
  }

  onSavePersona(formPersona: NgForm): void {
    console.log(formPersona.value);
    if (formPersona.invalid) {
      this.isError = true;
    } else {
      if (formPersona.value.id === 0) {
        // Nuevo libro
        this.add(formPersona.value);
      } else {
        // Actualización
        this.personaActual = formPersona.value;
        this.update(this.personaActual);
      }
      /* Cierra la ventana modal */
      this.btnClose.nativeElement.click();
    }
  }

  add(persona: Persona) {
    this.personaService.post(persona).subscribe(
      res => {
        this.personas.push(res);
      },
      err => {
        alert('Ocurrió un error al agregar persona');
      }
      );
  }

  update(persona: Persona) {
    this.personaService.put(persona.id, persona).subscribe(
      data => {
        alert('Persona actualizada con éxito!');
        const changes = this.tabla.personas.filter(item => item.id !== persona.id);
        this.tabla.personas = changes;
        this.tabla.paginaActual = 1;
        this.tabla.personas.unshift(persona);
      },
      err => {
        alert('Ocurrió un error al actualizar persona');
      });
  }

  onClose(formPersona: NgForm): void {
    this.personaActual = {
      id: 0,
      nombre: '',
      apellido: '',
      dni: null
    };
   }

   onCloseAlert() {
     this.isError = false;
   }

}
