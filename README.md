# trailpack-express-validator

Trailpack validation for Trails application using express validator

![](assets/trailpack-express-validator.png)

## Usage

```sh
npm install --save trailpack-express-validator
```

```js
// api/validators/SomeValidator.js

import Validator from 'trailpack-express-validator/validator';

export default class UserValidator extends Validator {
  register() {
    return {
      body: {
        firstName: {
          notEmpty: true
        },
        lastName: {
          notEmpty: true
        },
        email: {
          isEmail: true
        },
        username: {
          notEmpty: true
        },
        password: {
          notEmpty: true
        }
      }
    };
  }

  login() {
    return {
      body: {
        email: {
          isEmail: true
        },
        password: {
          notEmpty: true
        }
      }
    };
  }
}
```

```js
// config/validators.js

export default {

  UserController: {
    register: ['UserValidator.register'],
    login: ['UserValidator.login']
  }
};
```
