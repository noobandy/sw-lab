'use strict'

import angular from 'angular'

import message from './message/message'
import home from './home/home'
import about from './about/about'
import contact from './contact/contact'

let swLabComponents = angular.module('swLab.Components', 
[
    message,
    home,
    about,
    contact
])
// external module exports name
export default swLabComponents.name
