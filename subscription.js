document.addEventListener('DOMContentLoaded', function() {
    // variables establecidas
    const form = document.getElementById('subscription-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const edadInput = document.getElementById('edad');
    const telefonoInput = document.getElementById('telefono');
    const direccionInput = document.getElementById('direccion');
    const ciudadInput = document.getElementById('ciudad');
    const codigoPostalInput = document.getElementById('codigo-postal');
    const dniInput = document.getElementById('dni');

    // mensajes de error para cada input
    const errorMessages = {
        nombre: 'El nombre completo debe tener más de 6 letras y al menos un espacio.',
        email: 'Ingrese un formato de email válido.',
        password: 'La contraseña debe tener al menos 8 caracteres, formados por letras y números.',
        passwordConfirm: 'Las contraseñas no coinciden.',
        edad: 'Ingrese una edad válida (mayor o igual a 18).',
        telefono: 'Ingrese un número de teléfono válido (sin espacios, guiones ni paréntesis).',
        direccion: 'La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.',
        ciudad: 'Ingrese al menos 3 caracteres para la ciudad.',
        codigoPostal: 'Ingrese al menos 3 caracteres para el código postal.',
        dni: 'El DNI debe tener 7 u 8 dígitos numéricos.'
    };

    //  mostrar mensajes de error debajo del campo
    function showError(input, message) {
        const formGroup = input.parentElement; // obtener el div padre del input
        const error = formGroup.querySelector('.error-msg');

        error.textContent = message;
        error.style.display = 'block';
    }

    // ocultar mensajes de error debajo del campo
    function hideError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-msg');

        error.textContent = '';
        error.style.display = 'none';
    }


    // validar nombre completo
    function validateNombre() {
        const value = nombreInput.value.trim();
        if (value.length > 6 && value.includes(' ')) {
            hideError(nombreInput);
        } else {
            showError(nombreInput, errorMessages.nombre);
        }
    }

    // validar email
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            hideError(emailInput);
        } else {
            showError(emailInput, errorMessages.email);
        }
    }

    // validar contraseña
    function validatePassword() {
        const value = passwordInput.value.trim();
        const confirmPassword = passwordConfirmInput.value.trim();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(value)) {
            hideError(passwordInput);
            // verificamos que las contraseñas coincidadn
            if (value === confirmPassword) {
                hideError(passwordConfirmInput);
            } else {
                showError(passwordConfirmInput, errorMessages.passwordConfirm);
            }
        } else {
            showError(passwordInput, errorMessages.password);
        }
    }

    // validar edad
    function validateEdad() {
        const value = parseInt(edadInput.value.trim());
        if (value >= 18) {
            hideError(edadInput);
        } else {
            showError(edadInput, errorMessages.edad);
        }
    }

    // validar telefono
    function validateTelefono() {
        const value = telefonoInput.value.trim();
        const telefonoRegex = /^\d{7,}$/;
        if (telefonoRegex.test(value)) {
            hideError(telefonoInput);
        } else {
            showError(telefonoInput, errorMessages.telefono);
        }
    }

    // validar direccion
    function validateDireccion() {
        const value = direccionInput.value.trim();
        const direccionRegex = /^[a-zA-Z0-9\s]{5,}$/;
        if (direccionRegex.test(value)) {
            hideError(direccionInput);
        } else {
            showError(direccionInput, errorMessages.direccion);
        }
    }

    // validar ciudad
    function validateCiudad() {
        const value = ciudadInput.value.trim();
        if (value.length >= 3) {
            hideError(ciudadInput);
        } else {
            showError(ciudadInput, errorMessages.ciudad);
        }
    }

    // validar cod postal
    function validateCodigoPostal() {
        const value = codigoPostalInput.value.trim();
        if (value.length >= 3) {
            hideError(codigoPostalInput);
        } else {
            showError(codigoPostalInput, errorMessages.codigoPostal);
        }
    }

    // validar dni
    function validateDNI() {
        const value = dniInput.value.trim();
        const dniRegex = /^\d{7,8}$/;
        if (dniRegex.test(value)) {
            hideError(dniInput);
        } else {
            showError(dniInput, errorMessages.dni);
        }
    }


    // blur
    nombreInput.addEventListener('blur', validateNombre);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    passwordConfirmInput.addEventListener('blur', validatePassword);
    edadInput.addEventListener('blur', validateEdad);
    telefonoInput.addEventListener('blur', validateTelefono);
    direccionInput.addEventListener('blur', validateDireccion);
    ciudadInput.addEventListener('blur', validateCiudad);
    codigoPostalInput.addEventListener('blur', validateCodigoPostal);
    dniInput.addEventListener('blur', validateDNI);

    // validar inputs antes de enviar 
    function validateForm(event) {
        event.preventDefault(); 

        // ejecutar todas las validaciones
        validateNombre();
        validateEmail();
        validatePassword();
        validateEdad();
        validateTelefono();
        validateDireccion();
        validateCiudad();
        validateCodigoPostal();
        validateDNI();

        // verificar si hay errores mostrados
        const errors = form.querySelectorAll('.error-msg');
        let hasErrors = false;
        errors.forEach(error => {
            if (error.style.display === 'block') {
                hasErrors = true;
            }
        });

        // mostrar errores en el mensaje emergente (si los hay)
        if (hasErrors) {
            showErrorMessage();
        } else {
            showSuccessMessage();
        }
    }

    // event listener para subir el formulario
    form.addEventListener('submit', validateForm);

    // mostrar mensaje de error general
    function showErrorMessage() {
        const errors = form.querySelectorAll('.error-msg');
        let errorMessage = 'Por favor, corrija los siguientes errores:\n\n';
        errors.forEach(error => {
            if (error.style.display === 'block') {
                const fieldName = error.previousElementSibling.textContent.replace(':', '');
                errorMessage += `- ${fieldName}: ${error.textContent}\n`;
            }
        });

        alert(errorMessage);
    }

    // mensaje de exito en caso de que salga todo bien
    function showSuccessMessage() {
        // obtener datos del formulario para mostrar en el mensaje emergente
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const edad = edadInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const direccion = direccionInput.value.trim();
        const ciudad = ciudadInput.value.trim();
        const codigoPostal = codigoPostalInput.value.trim();
        const dni = dniInput.value.trim();

        // crear mensaje emergente
        const mensaje = `Información enviada:\n
Nombre: ${nombre}
Email: ${email}
Edad: ${edad}
Teléfono: ${telefono}
Dirección: ${direccion}
Ciudad: ${ciudad}
Código Postal: ${codigoPostal}
DNI: ${dni}`;

        alert(mensaje);
    }



    // actualizar nombre
    nombreInput.addEventListener('input', function() {
        const nombre = nombreInput.value.trim();
        const tituloFormulario = document.getElementById('form-title');
        tituloFormulario.textContent = `HOLA ${nombre}`;
    });
});
