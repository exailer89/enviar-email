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

    const emailFullValidation = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    // Asignar Eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', resetearFormulario);

    // Función para validar el formulario
    function validar(e) {
        // console.log(e.target);
        if (e.target.value.trim() === '') { // Colocar trim() nos ayuda a identificar que no exista espacios vacíos ya que si no lo agregamos, dichos espacios serán considerados como caracteres y nuestra validación no funcionará como esperamos.
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement); // Con e.target.parentElement tomamos el elemento padre del ID en relación.
            emailFullValidation[e.target.name] = ''; // Reinicia el objeto emailFullValidation y lo deja vacioo para que nuevamente se muestren las alertas.
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            emailFullValidation[e.target.name] = ''; // Reinicia el objeto emailFullValidation y lo deja vacioo para que nuevamente se muestren las alertas.
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        emailFullValidation[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
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

    // Funcion para comprobar el Email
    function comprobarEmail() {
        //console.log(emailFullValidation); // Permite ver como se van llenando las propiedades del objeto cada que pasa una validación.
        //console.log(Object.values(emailFullValidation).includes('')); // Con Objet.values podemos ver el valor del objeto, si colocáramos Objet.keys nos mostraria solo las llaves. || Con includes('') le colocamos un string vació, esto lo que hará será mandarnos true si existe por lo menos un campo vacio.

        if(Object.values(emailFullValidation).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    // Función para enviar el Email
    function enviarEmail(e) {
        e.preventDefault(); // Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.

        // Añadir/retirar clases para que se muestre/oculte el spinner.
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // Despues de 4 segundos, ocultamos el Spinner y reiniciamos el formulario.
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // Reiniciar el Objeto
            resetearFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 4000);
        }, 4000);
    }

    // Funcion para resetear el formulario
    function resetearFormulario() {
        // Reiniciar el Objeto
        emailFullValidation.email = '';
        emailFullValidation.asunto = '';
        emailFullValidation.mensaje = '';

        // Resetear Formulario
        formulario.reset();

        comprobarEmail();
    }
});