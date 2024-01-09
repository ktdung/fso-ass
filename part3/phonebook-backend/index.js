/* eslint-disable comma-dangle */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/person');

app.use(express.json());

morgan.token('data', (req) => {
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

app.get('/info', async (req, res, next) => {
  try {
    const date = new Date();

    const count = await Person.countDocuments();

    res.send(
      `<p>Phonebook has info for ${count} people</p><p>${date.toString()}</p>`
    );
  } catch (error) {
    next(error);
  }
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      // console.log(person);
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', async (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).json({
      error: 'new person must have a name',
    });
  }

  const found = await Person.findOne({
    name: body.name.trim().toLowerCase(),
  });
  // console.log(found);

  if (found) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }
  //   console.log(person);
  const newPerson = new Person({
    name: body.name,
    number: body.number || '00-000000',
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (req, res, next) => {
  // console.log(req.params.id);

  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      // console.log(person);

      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };
  // console.log(person);

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  // console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  }
  if (error.code === 'ENOENT') {
    return res.status(400).send({ error: 'File did not exits' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({
      error: error.message,
    });
  }
  return next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server listening on port: ', PORT);
});
