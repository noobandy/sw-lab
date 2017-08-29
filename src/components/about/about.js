'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import aboutComponent from './aboutComponent'

const aboutModule = angular.module('about', [uiRouter])
.config(
    /*@ngInject*/
    function($stateProvider) {
        $stateProvider.state({
            name: 'about',
            url: '/about',
            component: 'about',
        })
    }
)
.component('about', aboutComponent)

export default aboutModule.name
