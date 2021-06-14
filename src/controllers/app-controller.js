async function getNews(req, res) {
  const { numberOfPages } = req.params;

  try {
    res.status(200).send({numberOfPages})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getNews: getNews
}