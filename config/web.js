import validator from 'express-validator';

export default {

  middlewares: {
    order: [ 'validator' ],
    validator: validator()
  }
};
