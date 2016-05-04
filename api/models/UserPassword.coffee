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
      hexadecimal: yes
      required: yes
    email:
      type: 'string'
      email: yes
      required: yes
