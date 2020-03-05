# Final Programación III

Alumna: Florencia Salcedo
Legajo: 46027

## Consigna

Crear un abm en base a la API PersonaProfe, donde los datos de la tabla sean actualizados sin hacer una nueva llamada http (sin usar location.reload() o router.navigate())

### Actualización de tabla sin reload

Para las actualizaciones en la tabla simplemente trabaje con la edición del arreglo en tiempo real. **Al agregar** se realiza un push() de la persona agregada, quedando esta al final de la tabla. **Al actualizar**,primero se filtran todas las personas cuyos id no conincidan con la persona agregas, se asigna este arreglo filtrado al arreglo personas y por último se realiza un unshift() que guarda a la persona en la primera posición del arreglo.Por último, **al eliminar**, se busca el indice de la persona a eliminar y luego se realiza un splice() del arreglo, quitando de este el elemento con el index encontrado.

_Para agregar_
``` javascript
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
```

_Para actualizar_
``` javascript
// Método que actualiza un registro existente
  update(persona: Persona): void {
    this.personaService.put(persona.id, persona).subscribe(
      res => {
        // Se filtran todos los registros con un id distinto al actualizado
        const changes = this.personas.filter(item => item.id !== persona.id);
        // Se asigna el arreglo filtrado al arreglo de personas
        this.personas = changes;
        // Se inserta el dato actualizado al principio del arreglo
        this.personas.unshift(persona);
      },
      err => {
        alert('Ha ocurrido un error al guardar, intenta nuevamente');
      });
  }
```
_Para eliminar_
``` javascript
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
```

Una vez que se realiza un location.Reload() o se refresca la página, el método getAllPersonas() se vuelve a ejecutar y trae el listado de personas en el orden que tiene en la base de datos.

### Uso de reactive forms
Para poder actualizar la tabla sin reload o navigate, trabaje con la tabla y la ventana modal en el mismo componente, ya que para trabajar con un modal en otro component no logré pasarle el dato a actualizar desde home. Esto se debe a que al inciar el component Form al mismo tiempo que el componente Tabla, el dato recibido para la construcción del formulario siempre va a ser el dato inicial del elemento personaActual (que se encuentra en Tabla y llega como @Input() al componente Form), no actualizandose éste cuando cambia en el método onPreUpdate() del componente home. (Puede encontrar la prueba realizada del Form Reactivo con dos componentes en /components/prueba)

## ACTUALIZACIÓN
Ahora podrá encontrar el uso de formulario reactivos en dos componentes, realizando un patchValue dentro de la directiva @Input en el componente form logré que el formulario tomara los datos del registro a actualizar.
``` javascript
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
```

### Inclusión de form con NgForm
En la aplicación también podrá encontrar el mismo ejercicio pero realizado con la directiva NgModel (Template-driven form). En este caso si me fue posible realizar Formulario y Tabla en componentes separados, ya que la directiva NgModel mantiene los datos de los componentes sincronizados con la vista y la construcción del formulario no se realiza desde el componente. Los puntos en contra de esta metodología son que la validación no se hace en tiempo real y al estar casi toda su lógica en la vista se hace dificil de testear.

## Construcción

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
