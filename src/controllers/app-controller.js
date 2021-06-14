const axios = require("axios");
const cheerio = require("cheerio");
const NodeCache = require('node-cache');

const appCache = new NodeCache();

async function getNews(req, res) {
  const { numberOfPages } = req.params;

  try {
    let responseToSend = []

    for (let i = 1; i <= numberOfPages; i++) {
      const pageCached = appCache.get(`Pages${i}`);

      if (!pageCached) {
        const news = []
        const response = await axios.get(`https://news.ycombinator.com/news?p=${i}`);
        const $ = cheerio.load(response.data);

        $('.itemlist .athing').each((_, element) => {
          const newsInfo = {
            rank: $(element).find('.title .rank').text().trim(),
            title: $(element).find('.title .storylink').text().trim(),
            url: $(element).find('.title .storylink').attr('href').trim(),
            points: parseInt($(element).next().find('.subtext .score').text().trim().split(' ')[0]),
            owner: $(element).next().find('.subtext .hnuser').text().trim(),
            age: $(element).next().find('.subtext .age').text().trim(),
            comments: parseInt($(element).next().find('.subtext .age').next().next().next().text().trim().split(' ')[0]),
          }

          news.push(newsInfo);
        });

        appCache.set(`Pages${i}`, news, 300);
        responseToSend = responseToSend.concat(news);
      } else {
        responseToSend = responseToSend.concat(pageCached);
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