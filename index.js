import express from 'express'
import cors from 'cors'
import routeStudent from './routes/student.route.js'

const app = express()

// Habilitar cors público
app.use(cors())

// Habilitar el req.body tanto de json como formularios html
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Habilitar los archivos estáticos (public)
app.use(express.static('public'))

// Rutas
app.use('/', routeStudent)

//Levantar el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})