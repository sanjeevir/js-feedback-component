'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Feedback',
    'state': 'feedback'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
      console.log('hello');
    }
}

angular.module('helloWorldApp')
  .controller('NavbarController', NavbarController);
