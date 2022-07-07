const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

app.use("/api/productos", router);
app.use(express.static("public"));


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAll() {
        const array = fs.readFileSync(this.fileName, 'utf-8')
        const arrParsed = JSON.parse(array);
        return arrParsed
    }
}
const contenedor1 = new Contenedor("productos.txt")


router.get('/', (request, respuesta) => {
    respuesta.json(contenedor1.getAll())
})

router.get('/:id', (req, res) => {
    const id = req.query.id
    const found = (contenedor1.getAll()).find(el => el.id == id)
    if (found) {
        res.json(found)
    } else {
        res.json({
            error: "producto no encontrado"
        });
    }
})

router.post('/product', (req, res) => {
    const newObject = req.body
    newObject.id = (contenedor1.getAll()).length + 1(contenedor1.getAll()).push(newObject)
    res.json((contenedor1.getAll()))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const found = (contenedor1.getAll()).find(el => el.id == id)
    const newObject = req.body
    if (newObject.title) {
        found.title = newObject.title
    }
    if (newObject.price) {
        found.price = newObject.price
    }
    if (newObject.thumbnail) {
        found.thumbnail = newObject.thumbnail
    }
    res.json(found)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    if (arrParsed.find(el => el.id == id)) {
        const product = arrParsed.splice(parseInt(id) - 1, 1)
        res.json({ Producto_eliminado: product })
    } else {
        res.json({
            error: "productod s no encontrado"
        });
    }
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + server.address().port);
})

server.on("error", error => console.log(error))