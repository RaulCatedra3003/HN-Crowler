const hackerNewsService = require('./get-hacker-news-info');
const cacheService = require('./cache');

module.exports = {
  hackerNewsService: hackerNewsService,
  cacheService: cacheService,
}