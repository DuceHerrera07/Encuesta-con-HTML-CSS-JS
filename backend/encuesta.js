document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el formulario y el contenedor del grid
    const formulario = document.getElementById('formulario');
    const grid = document.getElementById('grid');
    const botonEliminarContenido = document.getElementById('eliminarContenido');

    // Obtener registros guardados del Local Storage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Función para guardar registros en el Local Storage
    const guardarRegistros = () => {
        localStorage.setItem('registros', JSON.stringify(registros));
    };

    // Función para renderizar los registros en el grid
    const renderizarRegistros = () => {
        grid.innerHTML = '';
        registros.forEach((registro) => {
            const div = document.createElement('div');
            div.classList.add('registro');
            div.innerHTML = `
                <p>Respuesta 1: ${registro.pregunta1}</p>
                <p>Respuesta 2: ${registro.pregunta2}</p>
                <p>Respuesta 3: ${registro.pregunta3}</p>
            `;
            grid.appendChild(div);
        });
    };

    // Función para limpiar el contenido del grid
    const limpiarGrid = () => {
        grid.innerHTML = '';
        registros = [];
    };

    // Evento para el botón de eliminar contenido del grid
    botonEliminarContenido.addEventListener('click', function() {
        limpiarGrid();
    });

    // Renderizar los registros al cargar la página
    renderizarRegistros();

    // Evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const pregunta1 = this.elements['pregunta1'].value.trim();
        const pregunta2 = this.elements['pregunta2'].value.trim();
        const pregunta3 = this.elements['pregunta3'].value.trim();

        // Imprimir los valores en la consola para verificar
        console.log('Respuesta 1:', pregunta1);
        console.log('Respuesta 2:', pregunta2);
        console.log('Respuesta 3:', pregunta3);

        // Verificar que se hayan respondido todas las preguntas
        if (pregunta1 !== '' && pregunta2 !== '' && pregunta3 !== '') {
            // Guardar el registro en el Local Storage
            registros.push({ pregunta1, pregunta2, pregunta3 });
            guardarRegistros();
            renderizarRegistros();
            this.reset(); // Limpiar los campos del formulario
        } else {
            alert('Por favor responde todas las preguntas.');
        }
    });
});