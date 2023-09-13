const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = 3000;

//SIMULACION DE LA DB
const superheroes = [
  { id: 1, nombre: 'Spider-Man', superpoder: 'Trepar paredes', editorial: 'Marvel', año_creacion: 1962, calificacion: 9.0 },
  { id: 2, nombre: 'Superman', superpoder: 'Super fuerza, vuelo', editorial: 'DC Comics', año_creacion: 1938, calificacion: 8.5 },
  { id: 3, nombre: 'Wonder Woman', superpoder: 'Fuerza sobrehumana, lazo de la verdad', editorial: 'DC Comics', año_creacion: 1941, calificacion: 8.8 },
];


app.get('/api/superheroes', (req, res) => {
  res.json(superheroes);
});


app.get('/api/superheroes/:id', (req, res) => {
  const superheroId = parseInt(req.params.id);
  const superhero = superheroes.find(hero => hero.id === superheroId);

  if (superhero) {
    res.json(superhero);
  } else {
    res.status(404).json({ message: 'Superhéroe no encontrado' });
  }
});


app.post('/api/superheroes', (req, res) => {
  const newSuperhero = req.body;
  superheroes.push(newSuperhero);
  res.status(201).json(newSuperhero);
});


app.put('/api/superheroes/:id', (req, res) => {
  const superheroId = parseInt(req.params.id);
  const updatedSuperhero = req.body;

  const index = superheroes.findIndex(hero => hero.id === superheroId);
  if (index !== -1) {
    superheroes[index] = updatedSuperhero;
    res.json(updatedSuperhero);
  } else {
    res.status(404).json({ message: 'Superhéroe no encontrado' });
  }
});


app.delete('/api/superheroes/:id', (req, res) => {
  const superheroId = parseInt(req.params.id);
  const index = superheroes.findIndex(hero => hero.id === superheroId);

  if (index !== -1) {
    const deletedSuperhero = superheroes.splice(index, 1)[0];
    res.json(deletedSuperhero);
  } else {
    res.status(404).json({ message: 'Superhéroe no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor API en ejecución en el puerto ${port}`);
});
