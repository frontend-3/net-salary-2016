import {Component} from 'angular2/core';
import {Salary} from './salary';

@Component({
  selector: 'salary',
  template: require('../views/salary-form.html'),
  styles  : [
    require('../styles/salary-form.styl').toString()
  ]
})

export class SalaryComponent {
  salary = new Salary();

  onNextQuestion() {
    let currentQuestion = document.querySelector('.QuestionList-item.is-active');
    let nextQuestion = currentQuestion.nextSibling;
    (<Element> currentQuestion).classList.remove('is-active');
    (<Element> nextQuestion).classList.add('is-active');
  }

}
