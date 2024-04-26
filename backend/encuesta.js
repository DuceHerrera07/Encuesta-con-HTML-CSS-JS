document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el formulario y el contenedor del grid
    const formulario = document.getElementById('formulario');
    const grid = document.getElementById('grid');

    // Obtener registros guardados del Local Storage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Función para guardar registros en el Local Storage
    const guardarRegistros = () => {
        localStorage.setItem('registros', JSON.stringify(registros));
    };

    // Función para renderizar los registros en el grid
    const renderizarRegistros = () => {
        grid.innerHTML = '';
        registros.forEach((registro, index) => {
            const div = document.createElement('div');
            div.classList.add('registro');
            div.innerHTML = `
                <p>Respuesta 1: ${registro.pregunta1}</p>
                <p>Respuesta 2: ${registro.pregunta2}</p>
                <p>Respuesta 3: ${registro.pregunta3}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            grid.appendChild(div);
        });
    };

    // Función para eliminar un registro
    const eliminarRegistro = (index) => {
        registros.splice(index, 1);
        guardarRegistros();
        renderizarRegistros();
    };

    // Renderizar los registros al cargar la página
    renderizarRegistros();

    // Evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const pregunta1 = this.elements['pregunta1'].value.trim();
        const pregunta2 = this.elements['pregunta2'].value.trim();
        const pregunta3 = this.elements['pregunta3'].value.trim();

        // Verificar que se hayan respondido todas las preguntas
        if (pregunta1 !== '' && pregunta2 !== '' && pregunta3 !== '') {
            // Guardar el registro en el Local Storage
            registros.push({ pregunta1, pregunta2, pregunta3 });
            guardarRegistros();
            renderizarRegistros();
            // Limpiar los campos del formulario
            this.reset();
        } else {
            alert('Por favor responde todas las preguntas.');
        }
    });

    // Delegación de evento para eliminar registros
    grid.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminar')) {
            const index = event.target.dataset.index;
            eliminarRegistro(index);
        }
    });
});

