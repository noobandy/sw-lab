'use strict'

import angular from 'angular'

import messageComponent from './messageComponent'


let messageModule = angular.module('message', [])
.component('message', messageComponent)
// external module exports name
export default messageModule.name




