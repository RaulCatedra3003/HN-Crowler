const axios = require("axios");
const cheerio = require("cheerio");

async function getNews(req, res) {
  const { numberOfPages } = req.params;

  try {

    const news = []
    for (let i = 1; i <= numberOfPages; i++) {
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
    }

    res.status(200).send(news)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getNews: getNews
}