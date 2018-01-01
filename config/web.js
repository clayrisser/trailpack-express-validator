import expressValidator from 'express-validator';
import _ from 'lodash';
import boom from 'boom';

export default {

  middlewares: {
    order: [
      'expressValidator',
      'validator'
    ],

    expressValidator: expressValidator(),

    validator: async (req, res, next) => {
      const validator = {
        body: {}
      };
      _.each(validator, (rules, key) => {
        switch(key) {
          case 'body':
            req.checkBody(rules);
            break;
        }
      });
      await req.getValidationResult().then(result => result.throw()).catch((err) => {
        throw boom.badRequest(err.message, err.array());
      }).catch(next);
      return next();
    }
  }
};
