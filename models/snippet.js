var Schema, SnippetSchema;

Schema = require('mongoose').Schema;

SnippetSchema = new Schema({
  created_on: {
    type: Date,
    index: true
  },
  last_updated: {
    type: Date,
    "default": Date.now
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  language: {
    type: String
  },
  history: [
    {
      created_on: {
        type: Date
      },
      version: {
        type: Number,
        index: true
      },
      content: {
        type: String
      }
    }
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      index: true
    }
  ]
});

module.exports = SnippetSchema;
