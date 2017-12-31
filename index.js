import Trailpack from 'trailpack';
import _ from 'lodash';

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
    return undefined;
  }
};
