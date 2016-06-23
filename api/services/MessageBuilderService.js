'use strict';

const Case = require('change-case');
const moment = require('moment');

module.exports = {
  /**
   * Builds activity.
   */
  getActivity(modelClass) {
    return Case.snake(modelClass.globalId);
  },

  /**
   * Builds email template.
   */
  getEmailTemplate(template, activity, country) {
    return template || `mb-${Case.param(activity)}-${Case.upper(country)}`;
  },

  /**
   * Builds email tags.
   */
  getEmailTags(activity, applicationId) {
    const tags = [activity];
    if (applicationId) {
      tags.push(Case.snake(applicationId));
    }
    return tags;
  },

  /**
   * Returns Unix timestamp, string.
   */
  getActivityTimestamp() {
    return moment().unix();
  },
};
