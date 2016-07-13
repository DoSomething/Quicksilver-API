# Quicksilver-API [![wercker status](https://app.wercker.com/status/ee29a549f6d3b68e7b3cb101a7c9a943/s/master "wercker status")](https://app.wercker.com/project/bykey/ee29a549f6d3b68e7b3cb101a7c9a943)
API gateway to Quicksilver (Message Broker) functionality.

## Endpoints

#### Users

| Endpoint               | Functionality                                                              | Message                                                                                            |
| ---------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `POST /user/register`  | [User registration](documentation/endpoints/user.md#user-registration)     | [user.registration.transactional](documentation/messages/user.registration.transactional.md)       |
| `POST /user/password`  | [User password reset](documentation/endpoints/user.md#user-password-reset) | [user.password_reset.transactional](documentation/messages/user.password_reset.transactional.md)   |


#### Campaigns

| Endpoint                    | Functionality                                                                    | Message                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `POST /campaign/signup`     | [Campaign signup](documentation/endpoints/campaign.md#campaign-signup)           | [campaign.signup.transactional](documentation/messages/campaign.signup.transactional.md)      |
| `POST /campaign/reportback` | [Campaign report back](documentation/endpoints/campaign.md#campaign-report-back) | [campaign.report_back.transactional](documentation/messages/campaign.signup.transactional.md) |

## Development
### Requirements
- [Node.js](https://nodejs.org/en/download/) v4.4
- [Docker](https://www.docker.com/products/overview) with support
  of Compose file [v2](https://docs.docker.com/compose/compose-file/#/versioning)
  for running dependent services (like RabbitMQ).

### Installation
1. Install dependencies `npm install`
2. Create `config/local.js` file with following settings:

   ```js
   module.exports = {
      // Northstar.
      northstar: {
        apiBaseURI: 'https://northstar-qa.dosomething.org/v1/users',
        apiKey: '{{ nothstar_access_key }}',
      },

      // Phoenix.
      phoenix: {
       baseURI: 'https://staging.beta.dosomething.org/api/v1',
       username: '{{ phoenix_api_user }}',
       password: '{{ phoenix_api_pass }}',
      },

     // RabbitMQ.
     amqp: {
       management: {
         username: 'dosomething',
         password: 'dosomething',
         hostname: 'localhost:15672',
         protocol: 'http',
         vhost: 'dosomething',
       },
       connection: {
         user: 'dosomething',
         password: 'dosomething',
         ssl: false,
         host: 'localhost',
         port: 5672,
         vhost: 'dosomething',
       },
     },
   };
```

### Dependent services
#### Start

1. Make sure Docker is running
2. Run `npm run start-dev-services`

#### Stop

Run `npm run stop-dev-services`.

#### Available services

- `localhost:5672`: RabbitMQ AMQP
- [`localhost:15672`](http://localhost:15672): RabbitMQ management.
  User and password are `dosomething`.

### Running app in development mode

**Important**: Make sure dependent services are up and running.

Watch mode (prefered):
Run `nodemon` to lift up the application and watch for code changes. Application
will be reloaded on any changes in `.js` and `.json` files.

Normal mode:
You can start Sails as usual by running `sails lift` or `npm start`.

## Tests

**Important**: Make sure dependent services are up and running.

To run all of the tests defined in `/test` recursively.

```
$ npm test
```

Test and code style coverage uses the following utilities:
- [Mocha](https://www.npmjs.com/package/mocha)
- [Should](https://www.npmjs.com/package/should)
- [Supertest](https://www.npmjs.com/package/supertest)
- [ESLint](http://eslint.org/)
