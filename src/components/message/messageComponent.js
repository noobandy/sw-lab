'use strict'

import angular from 'angular'

import template from './messageTemplate.html'
import controller from './messageController'

let messageComponent = {
    controller: controller,
    controllerAs: 'vm',
    bindings: {
        message: '<'
    },
    template: template
}

export default messageComponent




