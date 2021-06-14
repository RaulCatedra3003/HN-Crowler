const axios = require("axios");
const cheerio = require("cheerio");

async function getHackerNewsPageInfo(page) {
  const news = []
  const response = await axios.get(`https://news.ycombinator.com/news?p=${page}`);
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

  return news;
};

module.exports = {
  getHackerNewsPageInfo: getHackerNewsPageInfo
}