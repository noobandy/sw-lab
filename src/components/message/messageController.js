'use strict'

class MessageController {

    /*@ngInject*/
    constructor($scope) {
        this.$scope = $scope
    }
   
    $onInit() {

    }

    $onChanges(changes) {
        if(changes.message) {
            //this.message = changes.message.currentValue
            //this.$scope.$apply();
            // if(!changes.message.isFirstChange()) {
            //     this.$scope.$apply();
            // }
        }
    }

}

export default MessageController