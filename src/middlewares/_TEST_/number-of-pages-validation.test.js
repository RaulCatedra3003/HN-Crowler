const { numberOfPagesValidation } = require('../number-of-pages-validation');

describe('Test number of pagers validation middleware', () => {
  it('When does not exist req.params :numberOfPages should return 1 in req.params.numberOfPages', () => {
    const req = { params: {} };
    const next = jest.fn();

    numberOfPagesValidation(req, {}, next);

    expect(next).toHaveBeenCalled();
    expect(req.params.numberOfPages).toBe(1);
  });

  it('When req.params.numberOfPages value is not posible to parse to integer sould response with a 400 status and error message', () => {
    const req = { params: { numberOfPages: "antonio" } };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();

    numberOfPagesValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({error: 'The url param need to be a number'});
  });
})