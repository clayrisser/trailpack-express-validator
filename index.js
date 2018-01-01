import Trailpack from 'trailpack';
import _ from 'lodash';
import web from './config/web';

module.exports = class ValidatorTrailpack extends Trailpack {

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    });
  }

  validate() {
    if (!_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('This Trailpack only works for express'));
    }
    return Promise.resolve();
  }

  configure() {
    const c = this.app.config;
    c.web.middlewares.expressValidator = c.web.middlewares.expressValidator || web.middlewares.expressValidator;
    c.web.middlewares.validator = c.web.middlewares.validator || web.middlewares.validator;
    const { order } = c.web.middlewares;
    order.splice(_.indexOf(order, 'bodyParser') + 1, 0, web.middlewares.order);
    c.web.middlewares.order = _.flatten(order);
    this.app.validators = _.zipObject(
      _.map(_.keys(this.app.api.validators), key => key),
      _.map(this.app.api.validators, (Validator) => {
        return new Validator(this.app);
      })
    );
  }
};
