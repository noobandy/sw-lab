'use strict'

import angular from 'angular'

import messageComponent from './message/message'

let swLabComponents = angular.module('swLab.Components', [messageComponent.name])

export default swLabComponents
