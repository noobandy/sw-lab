'use strict'

import controller from './contactController'
import template from './contactTemplate.html'

const contactComponent = {
    controller: controller,
    template: template,
    controllerAs: 'vm'
}

export default contactComponent