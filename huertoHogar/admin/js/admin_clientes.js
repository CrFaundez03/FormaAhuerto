document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    // Datos de ejemplo (no hay backend)
    let clientes = [
        {id: 'CL001', nombre: 'Juan', apellido: 'Pérez', pais: 'Chile', ordenes: 12, frecuente: true},
        {id: 'CL002', nombre: 'María', apellido: 'López', pais: 'Argentina', ordenes: 3, frecuente: false},
        {id: 'CL003', nombre: 'Carlos', apellido: 'Gómez', pais: 'Chile', ordenes: 8, frecuente: true},
        {id: 'CL004', nombre: 'Ana', apellido: 'Torres', pais: 'Perú', ordenes: 2, frecuente: false},
        {id: 'CL005', nombre: 'Lucía', apellido: 'Rojas', pais: 'Chile', ordenes: 15, frecuente: true},
    ];

    function renderTabla(filtroPais, filtroFrecuente, filtroNombre) {
        const tbody = document.querySelector("#tabla-clientes tbody");
        tbody.innerHTML = "";
        clientes
            .filter(c => (filtroPais === 'todos' || c.pais === filtroPais))
            .filter(c => (filtroFrecuente === 'todos' || (filtroFrecuente === 'si' ? c.frecuente : !c.frecuente)))
            .filter(c => (!filtroNombre || (c.nombre + ' ' + c.apellido).toLowerCase().includes(filtroNombre.toLowerCase())))
            .forEach(c => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.nombre} ${c.apellido}</td>
                    <td>${c.pais}</td>
                    <td>${c.ordenes}</td>
                    <td><span class="badge ${c.frecuente ? 'green' : 'grey'} white-text">${c.frecuente ? 'Sí' : 'No'}</span></td>
                `;
                tbody.appendChild(tr);
            });
    }

    // Filtros
    document.getElementById("filtro-pais").addEventListener("change", function() {
        renderTabla(this.value, document.getElementById('filtro-frecuente').value, document.getElementById('filtro-nombre').value);
    });
    document.getElementById("filtro-frecuente").addEventListener("change", function() {
        renderTabla(document.getElementById('filtro-pais').value, this.value, document.getElementById('filtro-nombre').value);
    });
    document.getElementById("filtro-nombre").addEventListener("input", function() {
        renderTabla(document.getElementById('filtro-pais').value, document.getElementById('filtro-frecuente').value, this.value);
    });

    // Formulario para crear cliente
    document.getElementById("form-cliente").addEventListener("submit", function(e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const pais = document.getElementById("pais").value;
        const ordenes = parseInt(document.getElementById("ordenes").value) || 0;
        const frecuente = document.getElementById("frecuente").value === 'si';
        const id = 'CL' + String(clientes.length + 1).padStart(3, '0');
        clientes.push({id, nombre, apellido, pais, ordenes, frecuente});
        renderTabla(document.getElementById('filtro-pais').value, document.getElementById('filtro-frecuente').value, document.getElementById('filtro-nombre').value);
        this.reset();
        M.updateTextFields();
        M.FormSelect.init(document.querySelectorAll('select'));
        M.toast({html: 'Cliente agregado', classes: 'green'});
    });

    renderTabla('todos', 'todos', '');
});
