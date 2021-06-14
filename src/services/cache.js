const NodeCache = require('node-cache');
const TIME_TO_EXPIRE = 300;
const CACHE_BASE_KEY = 'Page'

const appCache = new NodeCache();

function setPage(page, data) {
  return appCache.set(`${CACHE_BASE_KEY}${page}`, data, TIME_TO_EXPIRE);
}

function getPage(page) {
  return appCache.get(`${CACHE_BASE_KEY}${page}`);
}

module.exports = {
  setPage: setPage,
  getPage: getPage
}