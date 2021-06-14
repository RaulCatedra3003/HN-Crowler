async function getNews(req, res) {
  const { numberOfPages } = req.params;

  res.status(200).send({numberOfPages})
}

module.exports = {
  getNews: getNews
}