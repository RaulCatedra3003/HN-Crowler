function numberOfPagesValidation(req, res, next) {
  let { numberOfPages } = req.params;
  if (!numberOfPages) {
    numberOfPages = "1";
  }

  try {
    if (!parseInt(numberOfPages)) {
      return res.status(400).send({error: 'The url param need to be a number'});
    }
    req.params.numberOfPages = parseInt(numberOfPages);
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { numberOfPagesValidation };