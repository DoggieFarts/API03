const express = require('express')
var bodyParser = require('body-parser')
const {response} = require("express");
const app = express();
const puerto = process.env.PORT || 3000;

let categorias = [
    { id: 1, nombre: 'Cocina', descripcion: 'Cocina' },
    { id: 2, nombre: 'Electronica', descripcion: 'Electronica' },
    { id: 3, nombre: 'Hogar', descripcion: 'Hogar' },
    { id: 4, nombre: 'Jardín', descripcion: 'Jardín' },
    { id: 5, nombre: 'Muebles', descripcion: 'Muebles' },
    { id: 6, nombre: 'Ropa', descripcion: 'Ropa' },
    { id: 7, nombre: 'Salud', descripcion: 'Salud' },
    { id: 8, nombre: 'Tecnología', descripcion: 'Tecnología' },
    { id: 9, nombre: 'Vehículos', descripcion: 'Vehículos' },
    { id: 10, nombre: 'Videojuegos', descripcion: 'Videojuegos' }

]

app.get('/socios/v1/categorias', (req, res) => {
    //Obtener todas las categorias
    if (categorias.length === 0) {
        return res.status(404).json({
        estado:0,
        mensaje:'No hay categorias',
        categorias:categorias})
    }else {
        return res.json({ categorias: categorias,
        estado:1,
        mensaje:'Categorias obtenidas con exito'
        })
    }


    res.send('Obtener todas las categorias')
})
app.get('/socios/v1/categorias/:id', (req, res) => {
    //Solo una categoria
    const id = req.params.id
    const categoria = categorias.find(categoria => categoria.id === parseInt(id))
    if (categoria) {
        return res.status(200).json({ categoria: categoria,
        estado:1,
        mensaje:'Categoria obtenida con exito'
        })
    }else {
        return res.status(404).json({ estado:0, mensaje:'Categoria no encontrada' })
    }


})
const jsonParser = bodyParser.json(); //middleware
app.use(jsonParser); //Utilizar middleware
app.post('/socios/v1/categorias', jsonParser, (req, res) => {
//Crear una categoria

        const { nombre, descripcion } = req.body; //Destructuring de objetos
      //  console.log(req.body);
        const id = Math.round(Math.random() * 1000);
        // Comprobar que el cliente  = usuario  = programador
        if (nombre == undefined || descripcion == undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "BAD REQUEST Faltan parametros en la solicitud",
            });
        } else {
            //En javascript como agregar un nuevo elemento al arreglo
            const categoria = { id: id, nombre: nombre, descripcion: descripcion };
            const longitudInicial = categorias.length;
            categorias.push(categoria);
            if (categorias.length > longitudInicial) {
                res.status(201).json({
                    estado: 1,
                    mensaje: "Categoria creada correctamente",
                    categoria: categoria,
                });
            } else {
                res.status(500).json({
                    estado: 0,
                    mensaje: "No se agrego correctamente",
                });
            }
        }



})
app.put('/socios/v1/categorias/:id', (req, res) => {
    //Actualizar una categoria
    // ID viene en params
    // nombre y descripcion vienen en el body

    const {id} = req.params; //Obtiene el id de los parametros
    const {nombre, descripcion} = req.body; //Obtiene el nombre y descripcion del body

if (nombre == undefined || descripcion == undefined) { //Si no vienen los parametros
    res.status(400).json({ //Envia la respuesta
        estado: 0,  //Estado 0 = Error
        mensaje: "BAD REQUEST Faltan parametros en la solicitud" //Mensaje
    });
}
else {
    const categoria = categorias.find((categorias) => categorias.id == id); //Busca el elemento en el arreglo
    if (categoria) { //Si existe
        categoria.nombre = nombre; //Actualiza el nombre con lo que viene en el body
        categoria.descripcion = descripcion; //Actualiza la descripcion con lo que viene en el body
        res.status(200).json({ //Envia la respuesta
            estado: 1, //Estado 1 = OK
            mensaje: "Categoria actualizada correctamente", //Mensaje
            categoria: categoria, //Envia la categoria actualizada
        });
    } else {
        res.status(404).json({  //Si no existe
            estado: 0, //Estado 0 = Error
            mensaje: "No se actualizo", //Mensaje
        });
    }
}


})
app.delete('/socios/v1/categorias/:id', (req, res) => {
    //Eliminar una categoria
    const id = req.params.id;
    const  categoria = categorias.find(categoria => categoria.id === parseInt(id)) //Busca la categoria
    if (categoria) { //Si existe
        const index = categorias.indexOf(categoria); //Obtiene el indice
        categorias.splice(index, 1); //Elimina el elemento del arreglo
        res.status(200).json({ //Envia la respuesta
            estado: 1, //Estado 1 = OK
            mensaje: "Categoria eliminada correctamente", //Mensaje
            categoria: categoria, //Envia la categoria eliminada
        });
    } else {
        res.status(404).json({ //Si no existe
            estado: 0, //Estado 0 = Error
            mensaje: "No se elimino", //Mensaje
        });
    }


})

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
})