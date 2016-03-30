# userAPIRegistrationQueue

##### Purpose
User registration transaction messages for consumption by `mbc-userAPI-registration` consumer to send transaction details to `mb-user-api` POST `/user` to create user documents in `mb-user` database.

##### Consumer
User API registration consumer: [mbc-userAPI-registration](https://github.com/DoSomething/mbc-userAPI-registration).

##### Exchange
`transactionalExchange`

##### Binding Kyes
- `user.registration.#`
