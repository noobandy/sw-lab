'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

class ContactController {
    constructor() {
    }

    $onInit() {
        this.message = 'Contact'
    }
}

let template = '<message message="vm.message"><message>'

let contactModule = angular.module('contact', [uiRouter])
.config(
    /*@ngInject*/
    function($stateProvider) {
        $stateProvider.state({
            name: 'contact',
            url: '/contact',
            component: 'contact'
        })
    }
)
.component('contact', {
    controller: ContactController,
    template: template,
    controllerAs: 'vm'
})

export default contactModule.name
