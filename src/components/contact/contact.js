'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import contactComponent from './contactComponent'

const contactModule = angular.module('contact', [uiRouter])
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
.component('contact', contactComponent)

export default contactModule.name
