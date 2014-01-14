var Schema, TagSchema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

TagSchema = new Schema({
  name: {
    type: String
  },
  slug: {
    type: String,
    lowercase: true,
    index: true
  }
});

module.exports = TagSchema;
