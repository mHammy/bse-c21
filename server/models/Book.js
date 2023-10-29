const { Schema } = require('mongoose');

const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  title: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  genres: [
    {
      type: String,
    },
  ],
});

module.exports = bookSchema;
