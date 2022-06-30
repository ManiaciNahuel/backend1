const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (request, respuesta) => {
    respuesta.send("Entrega servidor express")
})

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    getAll() {
        const array = fs.readFileSync(this.fileName, 'utf-8')
        const arrParsed = JSON.parse(array);
        return arrParsed
    }

    getRandom(array) {
        const random = Math.random() * (array.length - 0) + 0
        return random
    }
}
const contenedor1 = new Contenedor("productos.txt");
const productos = contenedor1.getAll()

//Todos los productos
app.get('/productos', (request, respuesta) => {
    respuesta.send(contenedor1.getAll())

})

//Un producto random
app.get('/productoRandom', (request, respuesta) => {
    const productos = contenedor1.getAll()
    const indice = Math.round(contenedor1.getRandom(productos))
    respuesta.send(productos[indice])
})

const server = app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

server.on("error", error => console.log(error))