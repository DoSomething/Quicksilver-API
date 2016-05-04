module.exports =
  # Turn off migrations.
  migrate: 'safe'

  # Turn off auto fields.
  autoCreatedAt: off
  autoUpdatedAt: off
  autoPK: off

  # Validation rules.
  attributes:
    user_id:
      type: 'string'
      required: yes
      hexadecimal: yes
    email:
      type: 'string'
      required: yes
      email: yes
    mobile:
      type: 'string'
      required: yes
    application_id:
      type: 'string'
    email_template:
      type: 'string'

  # Validate presence at least one of fields.
  beforeValidate: (values, cb) ->
    # The list of fields.
    fields = ['user_id', 'email', 'mobile']

    # Check if at least one of the fields is found.
    found = false
    for field in fields
      if values[field]? and !_.isEmpty values[field]
        found = true
        break

    # Turn off presence validations when at least one fields is found,
    # turn on when all fields absent.
    this._validator.validations[field].required = !found for field in fields
    cb()
