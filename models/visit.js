var Schema, VisitSchema, logger, mongoose, _;

mongoose = require('mongoose');

Schema = mongoose.Schema;

_ = require('../lib/_');

logger = require('../lib/logger');

logger("Instantiating visit schema");

VisitSchema = new Schema({
  timestamp: {
    type: Date,
    "default": Date.now,
    index: true
  },
  hr_timestamp: {
    type: String
  },
  ip: {
    type: String,
    "default": ''
  },
  path: {
    type: String,
    "default": '',
    index: true
  },
  xhr: {
    type: Boolean,
    "default": false
  },
  subdomains: {
    type: Array,
    "default": []
  },
  originalUrl: {
    type: String,
    "default": ''
  },
  protocol: {
    type: String,
    "default": 'http'
  },
  acceptedLanguages: {
    type: Array
  },
  acceptedCharsets: {
    type: Array
  },
  params: {
    type: Array
  },
  body: {
    type: Object
  },
  query: {
    type: Object
  },
  pjax: {
    type: Boolean
  },
  contentType: {
    type: String
  }
});

VisitSchema.methods.createFromRequest = function(req) {
  var self;
  logger("Logging visit from " + req.ip + "...");
  self = this;
  this.set('hr_timestamp', _.pretty_utc_date());
  this.set('ip', req.ip);
  this.set('path', req.path);
  this.set('xhr', req.xhr);
  this.set('subdomains', req.subdomains);
  this.set('original_url', req.originalUrl);
  this.set('protocol', req.protocol);
  this.set('accepted_languages', req.acceptedLanguages);
  this.set('accepted_charsets', req.acceptedCharsets);
  this.set('params', req.params);
  this.set('body', req.body);
  this.set('query', req.query);
  this.set('pjax', req.headers['X-PJAX'] != null ? true : false);
  this.set('content_type', req.get('content-type'));
  return this.save(function(err) {
    if (!err) {
      return logger("Visit #" + self._id + " saved!");
    } else {
      return logger.error("Visit unable to be saved :(");
    }
  });
};

module.exports = VisitSchema;