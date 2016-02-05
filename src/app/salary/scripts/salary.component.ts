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
  numOfQuestions: number;
  progressBar: HTMLElement;
  currentQuestion: number;
  form: HTMLElement;
  transEndEventName: string = 'webkitTransitionEnd';
  _this: Object = this;

  ngOnInit() {
    this.progressBar = (<HTMLElement> document.querySelector('.ProgressBar'));
    this.numOfQuestions = 3;
    this.currentQuestion = 3;
    this.form = (<HTMLElement> document.querySelector('.SalaryForm'));
    this.setupEvents();
  }

  onNextQuestion() {
    this.updateProgressBar();
    let currentQuestion =  (<HTMLElement> document.querySelector('.QuestionList-item.is-active'));
    let nextQuestion = (<HTMLElement> currentQuestion.nextElementSibling);
    this.form.classList.add('is-change');
    currentQuestion.classList.remove('is-active');
    nextQuestion.classList.add('is-active');
  }

  onEndTransitionFn() {
    this.form.classList.remove('is-change');
  }

  setupEvents() {
    this.progressBar.addEventListener(
        this.transEndEventName,
        () => this.form.classList.remove('is-change')
    );
  }

  updateProgressBar() {
    this.progressBar.style.width = this.currentQuestion * (100 /  this.numOfQuestions) + '%';
  }

}
