'use strict'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import angularSanitize from 'angular-sanitize'
import translate from 'angular-translate'
import translatePartialLoader from 'angular-translate-loader-partial'
import swLabComponents from './components/components'


angular.module('swLab', [uiRouter, angularSanitize, translate, swLabComponents])
.config(
    /*@ngIngect*/
    function($urlRouterProvider, $translateProvider, $translatePartialLoaderProvider) {
        $urlRouterProvider.otherwise('/')

        $translateProvider.useSanitizeValueStrategy('sanitize')
        
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/{part}/{lang}.json'
        })

        $translatePartialLoaderProvider.addPart('I18N')


        $translateProvider.preferredLanguage('en')
    }
)
.run(
    /*@ngInject*/
    function($rootScope) {
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options){ 
        console.log(event);
        //event.preventDefault(); 
        // transitionTo() promise will be rejected with 
        // a 'transition prevented' error
    })

    $rootScope.$on('$stateNotFound', 
    function(event, unfoundState, fromState, fromParams){ 
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
    })

    $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams){
        console.log(event);
     })

    
     $rootScope.$on('$stateChangeError', 
     function(event, toState, toParams, fromState, fromParams, error){
         console.log(event)
     })
})
