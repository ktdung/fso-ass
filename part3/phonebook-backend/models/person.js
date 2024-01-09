const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

console.log('connecting to ', url);

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message);
  });

const personScheme = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        // Kiểm tra số điện thoại có đúng định dạng không
        return (
          /^\d{2,3}-\d{}}+$/.test(v) &&
          v.split('-').join().length >= 8
        );
      },
      message: (props) =>
        `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number is required'],
  },
});

personScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personScheme);
