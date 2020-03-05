import { TablaReactivaComponent } from '../tabla-reactiva/tabla-reactiva.component';
import { Component, OnInit, Host, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})
export class FormReactivoComponent implements OnInit {

  @Input() set personaActual(valor) {
    this.buildForm();
    if (valor) {
      this.personaOriginal = valor;
      this.edit = true;
      this.formPersona.patchValue({
        id: valor.id,
        nombre: valor.nombre,
        apellido: valor.apellido,
        dni: valor.dni
      });
    }
  }

  public formPersona: FormGroup;
  public personaOriginal: any;
  public edit = false;

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder, @Host() private tabla: TablaReactivaComponent) {

  }

  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;

  isError = false;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formPersona = this.formBuilder.group({
      id: new FormControl(0),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,8}')])
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
        this.tabla.personas.push(res);
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
        this.tabla.personas.unshift(persona);
      },
      err => {
        alert('Ocurrió un error al actualizar persona');
      });
  }

  onClose(): void {
    this.personaOriginal = null;
    this.edit = false;
    this.formPersona.reset();
  }

   onCloseAlert() {
     this.isError = false;
   }

}
