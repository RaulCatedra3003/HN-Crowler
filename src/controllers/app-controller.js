const { hackerNewsService, cacheService } = require('../services')

async function getNews(req, res) {
  const { numberOfPages } = req.params;

  try {
    let responseToSend = []

    for (let i = 1; i <= numberOfPages; i++) {
      const cachedPage = cacheService.getPage(i);

      if (!cachedPage) {
        const news = await hackerNewsService.getHackerNewsPageInfo(i);
        cacheService.setPage(i, news);
        responseToSend = responseToSend.concat(news);
      } else {
        responseToSend = responseToSend.concat(cachedPage);
      }
    }

    res.status(200).send(responseToSend)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getNews: getNews
}