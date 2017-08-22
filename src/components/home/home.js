'use strict'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import homeComponent from './homeComponent'

let homeModule = angular.module('home', [uiRouter])
.config(
    /*@ngInject*/
    function ($stateProvider) {
    
    $stateProvider.state({
        name: 'home',
        url: '/',
        component: 'home'
    })
})
.component('home', homeComponent)
// external module exports name
export default homeModule.name