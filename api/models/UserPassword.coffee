module.exports =
  # Allow only whitelisted attributes.
  schema: true

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
      defaultsTo: ""
    email:
      type: 'string'
      required: yes
      email: yes
      defaultsTo: ""
    mobile:
      type: 'string'
      required: yes
      defaultsTo: ""
    application_id:
      type: 'string'
    email_template:
      type: 'string'

  # Validate presence at least one of fields.
  beforeValidate: (values, cb) ->
    # The list of fields.
    fields = ['user_id', 'email', 'mobile']

    # Check if at least one field is present.
    found = false
    for field in fields
      if values[field]? and !_.isEmpty values[field]
        found = true
        break

    # Turn off presence validations when at least one fields is present,
    # turn on when all fields are absent.
    for field in fields
      if found
        # It should be possible to just set required to false,
        # but for some reason it turns off the rest of field rules.
        delete this._validator.validations[field].required
      else
        # Reenable presence validation if no fields found.
        this._validator.validations[field].required = yes

    # Continue.
    cb()

  # Remove empty values from model.
  # afterValidate: (values, cb) ->
    # delete values[i] for i of values when !values[i]
    # cb()
