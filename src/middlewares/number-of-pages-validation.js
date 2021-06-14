function numberOfPagesValidation(req, res, next) {
  const { numberOfPages } = req.params;
  try {
    if (!numberOfPages) {
      req.params.numberOfPages = 1;
    } else if (!parseInt(numberOfPages)) {
      return res.status(400).send({error: 'The url param need to be a number'});
    }
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { numberOfPagesValidation };