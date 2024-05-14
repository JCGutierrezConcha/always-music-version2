import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM STUDENTS',
        //rowMode: "array"
    }
    const { rows } = await pool.query(query)
    return rows
}


const create = async ({ id, nombre, rut, curso, nivel }) => {
    const query = {
        text: "INSERT INTO STUDENTS (id, nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
        values: [id, nombre, rut, curso, nivel]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const findOneById = async (id) => {
    const query = {
        text: "SELECT * FROM STUDENTS WHERE id = $1",
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (id) => {
    const query = {
        text: "DELETE FROM STUDENTS WHERE id = $1 RETURNING *",
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async (student) => {
    const query = {
        text: "UPDATE STUDENTS SET nombre= $1, rut= $2, curso= $3, nivel= $4 WHERE id= $5 RETURNING *",
        values: [student.nombre, student.rut, student.curso, student.nivel, student.id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const modelStudent = {
    findAll,
    create,
    findOneById,
    remove,
    update
}

