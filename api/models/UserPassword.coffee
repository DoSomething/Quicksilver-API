module.exports =
  # Turn off migrations.
  migrate: 'safe'

  # Turn off auto fields.
  autoCreatedAt: false
  autoUpdatedAt: false
  autoPK: false

  # Validation rules.
  attributes:
    user_id:
      type: 'string'
      hexadecimal: true
      required: true
    email:
      type: 'string'
      email: true
      required: true
