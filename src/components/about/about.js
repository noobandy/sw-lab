'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

class AboutController {
    constructor() {
    }

    $onInit() {
        this.message = 'About'
    }
}

let template = '<message message="vm.message"><message>'

let aboutModule = angular.module('about', [uiRouter])
.config(
    /*@ngInject*/
    function($stateProvider) {
        $stateProvider.state({
            name: 'about',
            url: '/about',
            component: 'about'
        })
    }
)
.component('about', {
    controller: AboutController,
    template: template,
    controllerAs: 'vm'
})

export default aboutModule.name
