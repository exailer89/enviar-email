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
        // console.log(e.target);
        if (e.target.value.trim() === '') { // Colocar trim() nos ayuda a identificar que no exista espacios vacíos ya que si no lo agregamos, dichos espacios serán considerados como caracteres y nuestra validación no funcionará como esperamos.
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement); // Con e.target.parentElement tomamos el elemento padre del ID en relación.
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            return;
        }

        limpiarAlerta(e.target.parentElement);
    }

    // Función para mostrar Alerta
    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Generar Alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        // Inyectar el error al formulario
        referencia.appendChild(error); // Seleccionamos el formulario y creamos un elemento de error, la diferencia con innerHTML es que este segundo reemplaza todo HTML.
    }

    // Función para limpiar Alerta
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    // Función para validar el Email
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Expresión Regular para validar el Email.
        const resultado = regex.test(email); // El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
        return resultado;
    }
});