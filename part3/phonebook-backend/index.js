require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

app.use(express.json());

morgan.token('data', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return ' ';
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :total-time ms  :data'
  )
);
app.use(cors());
app.use(express.static('dist'));

// app.use(morgan('tiny'));

app.get('/info', (req, res) => {
  let date = new Date();
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${date.toString()}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(
    (person) => person.id === Number(req.params.id)
  );

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({
      error: 'person not found',
    });
  }
});

app.post('/api/persons', async (req, res) => {
  let body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'new person must have a name',
    });
  }

  let found = await Person.findOne({
    name: body.name.trim().toLowerCase(),
  });
  console.log(found);

  if (found) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }
  //   console.log(person);
  const newPerson = new Person({
    name: body.name,
    number: body.number || '000-000000',
  });

  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id);

  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      console.log(person);

      res.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('server listening on port: ', PORT);
});

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];
