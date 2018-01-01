import _ from 'lodash';
import boom from 'boom';

export default async (req, res, next) => {
  const app = req.trailsApp;
  const { handler } = app.config.routes[_.findIndex(app.config.routes, (route) => {
    return route.path === req.url;
  })];
  const splitHandler = handler.split('.');
  if (splitHandler.length < 2) return next();
  const controllerName = splitHandler[0];
  const controllerMethodName = splitHandler[1];
  const validatorConfig = app.config.validators[controllerName];
  if (!validatorConfig) return next();
  const validatorMethods = validatorConfig[controllerMethodName];
  _.each(validatorMethods, (validatorMethod) => {
    const splitValidatorMethod = validatorMethod.split('.');
    if (splitValidatorMethod.length < 2) return true;
    const validatorName = splitValidatorMethod[0];
    const validatorMethodName = splitValidatorMethod[1];
    if (!app.validators[validatorName]) return true;
    if (!app.validators[validatorName][validatorMethodName]) return true;
    const validatorRules = app.validators[validatorName][validatorMethodName]();
    _.each(validatorRules, (rules, key) => {
      switch(key) {
        case 'body':
          req.checkBody(rules);
          break;
        case 'cookies'
          req.checkCookies(rules);
          break;
        case 'headers'
          req.checkHeaders(rules);
          break;
        case 'params'
          req.checkParams(rules);
          break;
        case 'query'
          req.checkQuery(rules);
          break;
      }
    });
  });
  await req.getValidationResult().then(result => result.throw()).catch((err) => {
    throw boom.badRequest(err.message, err.array());
  }).catch(next);
  return next();
}
