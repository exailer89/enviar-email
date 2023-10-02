/*
    * Eventos utilizados:
        * blur: Este evento se dispara cuando sales de un input.
        * input: Este evento se dispara cuando estas escribiendo en el input (se presta más para validación en tiempo real).
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
    * En la linea "inputEmail.addEventListener('blur', validar);" validar es una función, sin embargo, si le agregamos los paréntesis() la función se ejecuta inmediatamente el HTML esté listo pero, si no colocamos los paréntesis() la función será ejecutada únicamente cuando sea solicitada de acuerdo a nuestra lógica de programación.
*/

document.addEventListener('DOMContentLoaded', function() { // Se ejecuta una vez todo el código HTML haya sido descargado

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    
    // Asignar Eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    // Función para validar el formulario
    function validar(e) {
        // console.log(e.target.id);
        if (e.target.value.trim() === '') { // Colocar trim() nos ayuda a identificar que no exista espacios vacíos ya que si no lo agregamos, dichos espacios serán considerados como caracteres y nuestra validación no funcionará como esperamos.
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`);
        } else {
            console.log('NO esta Vacio');
        }
    }

    // Función para mostrar Alerta
    function mostrarAlerta(mensaje) {
        // Generar Alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        // Inyectar el error al formulario
        formulario.appendChild(error); // Seleccionamos el formulario y creamos un elemento de error, la diferencia con innerHTML es que este segundo reemplaza todo HTML.
    }
});