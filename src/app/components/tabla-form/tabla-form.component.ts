import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-tabla-form',
  templateUrl: './tabla-form.component.html',
  styleUrls: ['./tabla-form.component.css']
})
export class TablaFormComponent implements OnInit {

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) {
  }

  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;

  public formPersona: FormGroup;

  paginaActual = 1;

  public isError = false;

  public personas: Persona[];
  public personaActual: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: null
  };

  ngOnInit() { // Al iniciarse el componente
    this.getAllPersonas(); // Se obtiene el listado de personas
    this.buildForm(); // Se construye el formulario
  }

  /* INICIO METODOS UTILIZADOS POR LA TABLA */

  // Método que obtiene el listado de personas
  getAllPersonas(): void {
    this.personaService.getAll().subscribe(
      res => {
        this.personas = res;
      },
      err => {
        alert('Ha ocurrido un error al traer la lista');
      });
  }

  // Método que elimia una persona de la base de datos
  delete(persona: Persona): void {
    const opcion = confirm('¿Está seguro que desea eliminar este registro?');
    if (opcion === true) {
      this.personaService.delete(persona.id).subscribe( res => {
        alert('El registro fue eliminado');
        // Se busca el índice de la persona borrada
        const indexOfPersona = this.personas.indexOf(persona);
        // Se elimina del arreglo el registro con el índice encontrado
        this.personas.splice(indexOfPersona, 1);
      },
      err => {
        alert('Ha ocurrido un error al eliminar registro, intente nuevamente');
      });
    }
  }

  // Método que obtiene la persona a actualizar y llama a la construcción
  onPreUpdate(persona: Persona): void {
    this.personaActual = Object.assign({}, persona);
    this.buildForm();
  }

  /* FIN METODOS UTILIZADOS POR LA TABLA */

  /* INICIO METODOS UTILIZADOS PARA EL FORMULARIO */

  // Método que construye el formulario
  buildForm() {
    this.formPersona = this.formBuilder.group({
      id: new FormControl(this.personaActual.id),
      nombre: new FormControl(this.personaActual.nombre, Validators.required),
      apellido: new FormControl(this.personaActual.apellido, Validators.required),
      dni: new FormControl(this.personaActual.dni, [Validators.required, Validators.pattern('[0-9]{1,8}')])
    });
  }

  // Metodo que se ejecuta en el submit del formulario
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

      /* Cierra la ventana modal */
      this.btnClose.nativeElement.click();
    }
  }

  // Método que agrega un nuevo registro
  add(persona: Persona) {
    this.personaService.post(persona).subscribe(
      res => {
        // Se agrega al final de la lista la persona guardada
        this.personas.push(res);
      },
      err => {
        alert('Ha ocurrido un error al guardar, intenta nuevamente');
      }
    );
  }

  // Método que actualiza un registro existente
  update(persona: Persona): void {
    this.personaService.put(persona.id, persona).subscribe(
      res => {
        // Se filtran todos los registros con un id distinto al actualizado
        const changes = this.personas.filter(item => item.id !== persona.id);
        // Se asigna el arreglo filtrado al arreglo de personas
        this.personas = changes;
        // Se inserta el dato actualizado al principio del arreglo
        this.paginaActual = 1;
        this.personas.unshift(persona);
      },
      err => {
        alert('Ha ocurrido un error al guardar, intenta nuevamente');
      });
  }

  // Cuando se cierra el formulario la personaActual vuelve a estar vacía y se contruye el fromulario nuevamente
  onClose(): void {
    this.personaActual = {
      id: 0,
      nombre: '',
      apellido: '',
      dni: null
    };
    this.buildForm();
   }

   onCloseAlert() {
     this.isError = false;
   }

   /* FIN METODOS UTILIZADOS POR EL FORMULARIO */

}
