'use strict';

/**
 * simulado service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::simulado.simulado');
