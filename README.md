# trailpack-validator

## Usage

```sh
npm install --save trailpack-validator
```

```js
// api/validators/SomeValidator.js

import Validator from 'trailpack-validator/validator';

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
