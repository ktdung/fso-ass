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

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.wwg7ir4.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookScheme = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', phonebookScheme);

Person.find({}).then((persons) => {
  persons.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});

// insert many document
// Person.insertMany([
//   {
//     name: 'Arto',
//     number: '045-1232456',
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '040-1231236',
//   },
// ]).then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

// insert 1 document
// const person = new Person({
//   name: 'Anna',
//   number: '040-1234556',
// });

// person.save().then((result) => {
//   console.log('person saved!');
//   mongoose.connection.close();
// });
