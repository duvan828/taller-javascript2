// console.log("Este mensaje se va por consola desde archivo .js")

var fecha = new Date();
document.getElementById('fecha_ini').max = fecha.toISOString().split('T')[0];

tallerJS = [];
var ubicacion = 0;

var tipo_persona1 = document.getElementById('tipo_persona1');
var tipo_persona2 = document.getElementById('tipo_persona2');
var dataStudent = document.getElementById('dataStudent');
var dataTeacher = document.getElementById('dataTeacher');

var inpCodigo = document.getElementById('codigo');
var inpTipo = document.getElementById('tipo');
var inpFechaIni = document.getElementById('fecha_ini');
var inpFechaFin = document.getElementById('fecha_fin');
var inpNombre = document.getElementById('nombre');
var inpResponsable = document.getElementById('responsable');
var inpPresupuesto = document.getElementById('presupuesto');
var inpTipoPersona = null;
var inpDatoPersona = null;
inpTipoPersona = tipo_persona1;
inpDatoPersona = document.getElementById('semestre');
inpTipoPersona = tipo_persona2;
inpDatoPersona = document.getElementById('tipo_profesor');


//ocultar selects radio buttons
tipo_persona1.addEventListener('input', (e) => {
    inpTipoPersona = tipo_persona1;
    inpDatoPersona = document.getElementById('semestre');
    dataStudent.classList.remove('hidden');
    dataTeacher.classList.add('hidden');
});

tipo_persona2.addEventListener('input', (e) => {
    inpTipoPersona = tipo_persona2;
    inpDatoPersona = document.getElementById('tipo_profesor');
    dataStudent.classList.add('hidden');
    dataTeacher.classList.remove('hidden');
});

function contarDias(pos) {
    let inicio = new Date(tallerJS[pos].fechaInicio);
    let fin = new Date(tallerJS[pos].fechaFin)
    let diasDif = fin.getTime() - inicio.getTime();
    console.log(diasDif);
    // 1 día = 24 horas, 1 hora = 60 min, 1 min = 60 seg, 1 seg = 1000ms
    return Math.round(diasDif / (1000 * 60 * 60 * 24))
}



function listarProyectos() {
    let texto = "";
    for (i in tallerJS) {
        texto += `
            <tr class="odd:bg-white even:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${tallerJS[i].nom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${tallerJS[i].responsable}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${tallerJS[i].fechaInicio}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${tallerJS[i].fechaFin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${contarDias(i)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">                                    
                    <input type="button" onclick="editar(${i})" value="Editar" class="cursor-pointer bg-green-600 text-green-200 text-sm p-1 border border-green-800">
                    <input type="button" onclick="eliminar(${i})" value="Eliminar" class="cursor-pointer bg-red-600 text-red-200 text-sm p-1 border border-red-800">
                    <input type="button" onclick="mostrar(${i})" value="Vista Rápida" class="cursor-pointer bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
                </td>
            </tr>
        `
    }

    document.getElementById('body').innerHTML = texto;
}

function limpiar() {
    inpCodigo.value = "";
    inpNombre.value = "";
    inpTipo.value = "";
    inpFechaIni.value = "";
    inpFechaFin.value = "";
    inpResponsable.value = "";
    inpPresupuesto.value = "";
    inpTipoPersona.value = "";
    inpDatoPersona.value = "";
}

function agregarProyecto() {
    usuario = {
        cod: '',
        nom: '',
        tipo: '',
        fechaInicio: '',
        fechaFin: '',
        responsable: '',
        presupuesto: 0,
        tipo_persona: '',
        dato_persona: ''
    }
    if (val_name() && val_resp() && val_pres()) {
        usuario.cod = inpCodigo.value;
        usuario.nom = inpNombre.value;
        usuario.tipo = inpTipo.value;
        usuario.fechaInicio = inpFechaIni.value;
        usuario.fechaFin = inpFechaFin.value;
        usuario.responsable = inpResponsable.value;
        usuario.presupuesto = inpPresupuesto.value;
        usuario.tipo_persona = inpTipoPersona.value;
        usuario.dato_persona = inpDatoPersona.value;
        tallerJS.push(usuario);
        listarProyectos();
        limpiar();
        alert('Proyecto registrado correctamente.')
    }
}

var btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener('click', agregarProyecto);

var btnActualizar = document.getElementById("btnActualizar");

function editar(pos) {
    ubicacion = pos;
    inpCodigo.value = tallerJS[pos].cod;
    inpNombre.value = tallerJS[pos].nom;
    inpTipo.value = tallerJS[pos].tipo;
    inpFechaIni.value = tallerJS[pos].fechaInicio;
    inpFechaFin.value = tallerJS[pos].fechaFin;
    inpResponsable.value = tallerJS[pos].responsable;
    inpPresupuesto.value = tallerJS[pos].presupuesto;
    inpTipoPersona.value = tallerJS[pos].tipo_persona;
    inpDatoPersona.value = tallerJS[pos].dato_persona;
    btnActualizar.classList.remove('hidden');
    btnAgregar.classList.add('hidden');
}

function actualizarDatos() {
    tallerJS[ubicacion].cod = inpCodigo.value;
    tallerJS[ubicacion].nom = inpNombre.value;
    tallerJS[ubicacion].tipo = inpTipo.value;
    tallerJS[ubicacion].fechaInicio = inpFechaIni.value;
    tallerJS[ubicacion].fechaFin = inpFechaFin.value;
    tallerJS[ubicacion].responsable = inpResponsable.value;
    tallerJS[ubicacion].presupuesto = inpPresupuesto.value;
    tallerJS[ubicacion].tipo_persona = inpTipoPersona.value;
    tallerJS[ubicacion].dato_persona = inpDatoPersona.value;
    btnActualizar.classList.add('hidden');
    btnAgregar.classList.remove('hidden');
    listarProyectos();
    limpiar();
}
btnActualizar.addEventListener('click', actualizarDatos);

function eliminar(pos) {
    tallerJS.splice(pos, 1);
    listarProyectos();
}

function mostrar(pos) {
    let texto = `
        Código: ${tallerJS[pos].cod}
        Nombre: ${tallerJS[pos].nom}
        Tipo: ${tallerJS[pos].tipo}
        Fecha Inicio: ${tallerJS[pos].fechaInicio}
        Fecha Fin: ${tallerJS[pos].fechaFin}
        Responsable: ${tallerJS[pos].responsable}
        Presupuesto: ${tallerJS[pos].presupuesto}
        Tipo persona: ${tallerJS[pos].tipo_persona}
    `;
    if (tallerJS[pos].tipo_persona == "estudiante") {
        texto += '   Semestre: ' + tallerJS[pos].dato_persona;
    } else {
        texto += '   Tipo profesor: ' + tallerJS[pos].dato_persona;
    }

    alert(texto);
}


// var codigo = document.getElementById('codigo').value;
// var nombre = document.getElementById('nombre').value;
// var tipo_proyecto = document.getElementById('tipo').value;
// var fecha_ini = document.getElementById('fecha_ini').value;
// var fecha_fin = document.getElementById('fecha_fin').value;
// var responsable = document.getElementById('responsable').value;
// var presupuesto = document.getElementById('presupuesto').value;
// var tipo_persona = document.getElementById('tipo_persona').value;
// var tipo_profesor = document.getElementById('tipo_profesor').value;
// var semestre_estudiante = document.getElementById('semestre').value;