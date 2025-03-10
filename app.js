const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // Importa MongoClient
const app = express();

// Configuración
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const uri = 'mongodb://localhost:27017'
const dbName = 'uni';
let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Conectado a MongoDB');
        db = client.db(dbName); // Guarda la referencia a la base de datos
    })
    .catch(error => console.error('Error conectando a MongoDB:', error));

// Rutas
app.get('/', (req, res) => {
    res.render('form',{ alumno: null });
});
app.get('/profc', (req, res) => {
    res.render('form2',{ profe: null });
});
app.get('/cursoc', (req, res) => {
    res.render('form3',{curso:null});
});
app.get('/eventoc', (req, res) => {
    res.render('form4',{evento:null});
});
app.get('/libroc', (req, res) => {
    res.render('form5',{libro:null});
});

//Create------------------------------------------------------------------------------------------------------------

app.post('/inscripcion', (req, res) => {
    const alumno = req.body;

    // Inserta los datos en la colección "alumnos"
    db.collection('alumnos')
        .insertOne(alumno)
        .then(result => {
            console.log('Alumno registrado:', result);
            res.render('form', { alumno });
        })
        .catch(error => {
            console.error('Error al insertar en la colección:', error);
            res.status(500).send('Ocurrió un error al registrar al alumno.');
        });
});

app.post('/profn', (req, res) => {
    const profe = req.body;

    // Inserta los datos en la colección "alumnos"
    db.collection('profesores')
        .insertOne(profe)
        .then(result => {
            console.log('Profesro contratado', result);
            res.render('form2', { profe });
        })
        .catch(error => {
            console.error('Error al insertar en la colección:', error);
            res.status(500).send('Ocurrió un error al registrar al alumno.');
        });
});

app.post('/curson', (req, res) => {
    const curso = req.body;

    // Inserta los datos en la colección "alumnos"
    db.collection('cursos')
        .insertOne(curso)
        .then(result => {
            console.log('Cusros añadido', result);
            res.render('form3', { curso });
        })
        .catch(error => {
            console.error('Error al insertar en la colección:', error);
            res.status(500).send('Ocurrió un error al registrar al alumno.');
        });
});
app.post('/eventon', (req, res) => {
    const evento = req.body;

    // Inserta los datos en la colección "alumnos"
    db.collection('eventos')
        .insertOne(evento)
        .then(result => {
            console.log('evento añadido', result);
            res.render('form5', { evento });
        })
        .catch(error => {
            console.error('Error al insertar en la colección:', error);
            res.status(500).send('Ocurrió un error al registrar al alumno.');
        });
});
app.post('/libron', (req, res) => {
    const libro = req.body;

    // Inserta los datos en la colección "alumnos"
    db.collection('libros')
        .insertOne(libro)
        .then(result => {
            console.log('Libro añadido', result);
            res.render('form5', { libro});
        })
        .catch(error => {
            console.error('Error al insertar en la colección:', error);
            res.status(500).send('Ocurrió un error al registrar al alumno.');
        });
});

//Listas-----------------------------------------------------------------------------------------------------
app.get('/alumnol', (req, res) => {
    res.render('lista',{ alumno: null });
});
app.get('/profl', (req, res) => {
    res.render('lista2',{ profe: null });
});
app.get('/cursol', (req, res) => {
    res.render('lista3',{curso:null});
});
app.get('/eventol', (req, res) => {
    res.render('lista4',{evento:null});
});
app.get('/librol', (req, res) => {
    res.render('lista5',{libro:null});
});

//Edicion------------------------------------------------------------------------------------------------
app.get('/alumnoe', (req, res) => {
    res.render('edit',{ alumno: null });
});
app.get('/profe', (req, res) => {
    res.render('edit2',{ profe: null });
});
app.get('/cursoe', (req, res) => {
    res.render('edit3',{curso:null});
});
app.get('/eventoe', (req, res) => {
    res.render('edit4',{evento:null});
});
app.get('/libroe', (req, res) => {
    res.render('edit5',{libro:null});
});

//Eliminadion----------------------------------------------------------------------------------------------
app.get('/alumnod', (req, res) => {
    res.render('dele',{ alumno: null });
});
app.get('/profd', (req, res) => {
    res.render('dele2',{ profe: null });
});
app.get('/cursod', (req, res) => {
    res.render('dele3',{curso:null});
});
app.get('/eventod', (req, res) => {
    res.render('dele4',{evento:null});
});
app.get('/librod', (req, res) => {
    res.render('dele5',{libro:null});
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 