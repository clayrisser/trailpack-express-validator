import boom from 'boom';
import expressValidator from 'express-validator';
import validator from '../lib/validator';

export default {

  middlewares: {
    order: [
      'expressValidator',
      'validator'
    ],

    expressValidator: expressValidator(),

    validator
  }
};
