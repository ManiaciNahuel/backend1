const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.urlencoded({ extended: true }))

const productos = JSON.parse(fs.readFileSync("productos.txt", 'utf-8'))

// Pug
app.set("view engine", ".pug");
app.set("views", "./views/pug");


app.get('/', (request, respuesta) => {
    respuesta.render("index", { productos })
})

app.get('/productos', (request, respuesta) => {
    respuesta.render("form", { productos })
})

app.post('/productos', (req, res) => {
    const newObject = req.body
    productos.push(newObject)
    console.log(newObject);
    res.redirect("/")
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + server.address().port);
})

server.on("error", error => console.log(error))


/* 
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
    if (newObject.imagen) {
        found.imagen = newObject.imagen
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
}) */