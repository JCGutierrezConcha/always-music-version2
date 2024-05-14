const listaEstudiantes = document.querySelector('#listaEstudiantes')
const formAgregarEstudiante = document.querySelector('#formAgregarEstudiante')

const formEditarEstudiante = document.querySelector('#formEditarEstudiante')

const exampleModal = document.querySelector('#exampleModal')
const myModal = new bootstrap.Modal(exampleModal)

const URL_DOMAIN = "http://localhost:3000"

formAgregarEstudiante.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = event.target.nombre.value
    const rut = event.target.rut.value
    const curso = event.target.curso.value
    const nivel = event.target.nivel.value

    if (!nombre.trim() || !rut.trim() || !curso.trim() || !nivel.trim()) {
        return alert('campos obligatorios')
    }

    try {
        await axios.post(URL_DOMAIN + '/students', {
            nombre, rut, curso, nivel
        })
        formAgregarEstudiante.reset()
        obtenerEstudiantes()
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)

    }

})

const obtenerEstudiantes = async () => {
    try {
        const { data: estudiantes } = await axios.get(URL_DOMAIN + '/students')
        listaEstudiantes.innerHTML = ""
        estudiantes.forEach(estudiante => {
            listaEstudiantes.innerHTML += /*html*/ `
            <li class="list-group-item">
            Nombre: ${estudiante.nombre} - Rut: ${estudiante.rut} - Curso: ${estudiante.curso} - Nivel: ${estudiante.nivel}
            <div>
            <button onclick="eliminarLibro('${estudiante.id}')" class="btn btn-danger btn-sm">Eliminar</button>
            <button onclick="editarLibro('${estudiante.id}')" class="btn btn-info btn-sm">Editar</button>
            </div>
            </li>
            `
        })
    }
    catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
}

obtenerEstudiantes()

const eliminarLibro = async (id) => {
    try {
        if (confirm('¿Esta seguro que quiere eliminar este registro?')) {
            await axios.delete(URL_DOMAIN + '/students/' + id)
            obtenerEstudiantes()
        }
    }
    catch (error) {
        alert(error?.response?.data?.msg)
    }
}

const editarLibro = async (id) => {
    try {
        console.log('editando registro...' + id)
        const { data: estudiante } = await axios.get(URL_DOMAIN + '/students/' + id)

        formEditarEstudiante.idStudent.value = estudiante.id
        formEditarEstudiante.nombre.value = estudiante.nombre
        formEditarEstudiante.rut.value = estudiante.rut
        formEditarEstudiante.curso.value = estudiante.curso
        formEditarEstudiante.nivel.value = estudiante.nivel
        myModal.show()

    } catch (error) {
        alert(error?.response?.data?.msg)
    }

}

formEditarEstudiante.addEventListener('submit', async (event) => {
    event.preventDefault()
    const idStudent = event.target.idStudent.value
    const nombre = event.target.nombre.value
    const rut = event.target.rut.value
    const curso = event.target.curso.value
    const nivel = event.target.nivel.value

    await axios.put(URL_DOMAIN + '/students/' + idStudent, {
        nombre, rut, curso, nivel
    })
    obtenerEstudiantes()
    myModal.hide()

})