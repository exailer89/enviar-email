/*
    * Eventos utilizados:
        * blur: Este evento se dispara cuando sales de un input.
        * input: Este evento se dispara cuando estas escribiendo en el input (se presta más para validacion en tiempo real).
    * Acceder a Propiedades del elemento al que le agregamos evento
        inputEmail.addEventListener('blur', function(e) {
            console.log(e); // Podemos revisar las propiedades del evento.
            console.log(e.target); // Accedemos el elemento al que le agregamos el elemento.
            Accedemos al atributo del elemento al que le agregamos el elemento, en este caso "value".
            console.log(e.target.value); // Accedemos al atributo del elemento al que le agregamos el elemento, en este caso "value".
        }
    * trim(): Elimina los espacios vacios (al inicio y final) que el usuario pudo haber agregado en el formulario.
    * createElement(): Generamos un nuevo elemento HTML.
    * textContent: Permite agregar texto a un elemento.
*/

document.addEventListener('DOMContentLoaded', function() { // Se ejecuta una vez todo el código HTML haya sido descargado

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    
    // Asignar Eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    // Función para validar el formulario
    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta();
        } else {
            console.log('NO esta Vacio');
        }
    }

    // Función para mostrar Alerta
    function mostrarAlerta() {
        // Generar Alerta en HTML
        const error = document.createElement('P');
        error.textContent = 'Hubo un error...';
        console.log(error);
    }
});