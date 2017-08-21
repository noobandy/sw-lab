'use strict'

import angular from 'angular'

import template from './messageTemplate.html'
import controller from './messageController.js'

let messageComponent = angular.component('swLabMessage', {
    controller: controller,
    controllerAs: 'vm',
    bindings: {
        message: '<'
    },
    template: template
})

export default messageComponent




