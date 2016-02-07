import {Component} from 'angular2/core';
import {SalaryComponent} from './salary/scripts/salary.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ScaleService} from './scale/scripts/scale.service';

@Component({
  selector    : 'app',
  template    : '<router-outlet></router-outlet>',
  directives  : [ROUTER_DIRECTIVES],
  providers   : [ScaleService]
})

@RouteConfig ([
    {
      path: '/preguntas/:id',
      name: 'Preguntas',
      component: SalaryComponent
    },
     {
      path: '/',
      name: 'Home',
      redirectTo: ['/Preguntas', {id: 1}]
    }
])

export class App {

}
