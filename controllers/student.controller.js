import { nanoid } from "nanoid"
import { modelStudent } from "../models/student.model.js"
import { handleError } from "../database/errors.js"

// Listar todos los estudiantes
const getAllStudents = async (req, res) => {
    try {
        const students = await modelStudent.findAll()
        return res.json(students)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

// Agregar un estudiante
const createStudent = async (req, res) => {
    try {
        const id = nanoid()
        const { nombre, rut, curso, nivel } = req.body
        if (!nombre || !rut || !curso || !nivel) {
            return res.status(400).json({ ok: false, msg: "campos obligatorios" })
        }
        const newStudent = await modelStudent.create({ id, nombre, rut, curso, nivel })
        return res.json(newStudent)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })

    }
}

// Listar un único estudiante mediante su id
const getOneStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await modelStudent.findOneById(id)
        if (!student) {
            return res.status(404).json({ ok: false, msg: '404' })
        }
        return res.json(student)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

// Eliminar un estudiante por su id
const removeStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await modelStudent.remove(id)
        return res.json(student)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}


// Editar un estudiante por su id
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, rut, curso, nivel } = req.body
        const studentUpdate = {
            id,
            nombre,
            rut,
            curso,
            nivel
        }
        const student = await modelStudent.update(studentUpdate)
        return res.json(student)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const controllerStudent = {
    getAllStudents,
    getOneStudent,
    createStudent,
    removeStudent,
    updateStudent
}