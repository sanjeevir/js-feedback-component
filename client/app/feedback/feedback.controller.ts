'use strict';

(function() {

    class FeedbackController {

        constructor() {
            console.log('feedback controller here...');
        }
}

angular.module('helloWorldApp')
  .component('feedback', {
    templateUrl: 'app/feedback/feedback.html',
    controller: FeedbackController
  });

})();
