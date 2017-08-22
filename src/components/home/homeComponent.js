'use strict'

import controller from './homeController'
import template from './homeTemplate.html'

let homeComponent = {
    controller: controller,
    template: template,
    controllerAs: 'vm'
}

export default homeComponent;