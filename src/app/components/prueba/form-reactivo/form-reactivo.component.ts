import { TablaReactivaComponent } from '../tabla-reactiva/tabla-reactiva.component';
import { Component, OnInit, Host, ElementRef, ViewChild, Input } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})
export class FormReactivoComponent implements OnInit {

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) {

  }

  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;

  @Input() personas: Persona[];
  // @Input() personaActual: Persona;
  @Input() formTabla: FormGroup;

  public personaActualModal: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: null
  };

  public formPersona: FormGroup;

  isError = false;

  ngOnInit() {
    // this.buildForm(this.personaActualModal);
    this.formPersona = this.formTabla;
  }

  updatePersona(persona: Persona){
    this.personaActualModal = persona;
  }

  buildForm(persona: Persona) {
    this.formPersona = this.formBuilder.group({
      id: [persona.id],
      nombre: [persona.nombre, Validators.required],
      apellido: [persona.apellido, Validators.required],
      dni: [persona.dni, Validators.required]
    });
  }

  onSavePersona(formPersona: FormGroup): void {
    if (formPersona.invalid) {
      this.isError = true;
    } else {
      if (formPersona.value.id === 0) {
        // Nuevo libro
        this.add(formPersona.value);
      } else {
        // Actualización
        this.update(formPersona.value);
      }

      this.formPersona.reset();

      /* Cierra la ventana modal */
      this.btnClose.nativeElement.click();
    }
  }

  add(persona: Persona) {
    this.personaService.post(persona).subscribe(
      res => {
        // Agrega el dato nuevo al final de la tabla
        this.personas.push(persona);
      },
      err => {
        alert('Ha ocurrido un error al guardar, intenta nuevamente');
      }
    );
  }

  update(persona: Persona): void {
    this.personaService.put(persona.id, persona).subscribe(
      res => {
        const changes = this.personas.filter(item => item.id !== persona.id);
        this.personas = changes;
        // Agrega el dato actualizado al principio de la tabla
        this.personas.unshift(persona);
      },
      err => {
        alert('Ha ocurrido un error al guardar, intenta nuevamente');
      });
  }

  onClose(): void {
    this.formPersona.reset();
  }

   onCloseAlert() {
     this.isError = false;
   }

}
