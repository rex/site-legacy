mongo = require '../drivers/mongo'
config = require '../config'
logger = require '../lib/logger'
_ = require '../lib/_'

schemas =
  activity: require './activity'
  env: require './env'
  job: require './job'
  link: require './link'
  oauth_token: require './oauth_token'
  post: require './post'
  services:
    lastfm:
      scrobble: require './services/lastfm/scrobble'
    github:
      repo: require './services/github/repo'
      commit: require './services/github/commit'
  snippet: require './snippet'
  tag: require './tag'
  visit: require './visit'

exports.initialize = (after_connected = ->) ->
  # Instantiate our models, grouped by service

  # LastFM
  mongo.model 'lastfm_scrobble', schemas.services.lastfm.scrobble

  # GitHub
  mongo.model 'github_commit', schemas.services.github.commit
  mongo.model 'github_repo', schemas.services.github.repo

  # Application
  mongo.model 'activity', schemas.activity, 'activities'
  mongo.model 'env', schemas.env, 'env_vars'
  mongo.model 'job', schemas.job
  mongo.model 'link', schemas.link
  mongo.model 'oauth_token', schemas.oauth_token
  mongo.model 'post', schemas.post
  mongo.model 'snippet', schemas.snippet
  mongo.model 'tag', schemas.tag
  mongo.model 'visit', schemas.visit

  # Connect to Mongo
  mongo.initialize after_connected