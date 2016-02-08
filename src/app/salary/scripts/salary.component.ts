import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Salary} from './salary';

@Component({
  template: require('../views/salary-form.html'),
  styles  : [
    require('../styles/salary-form.styl').toString()
  ]
})

export class SalaryComponent implements OnInit {
  public salary               = new Salary();
  public events               : {};
  private _catchDom           : () => void;
  private _suscribeEvents     : () => void;
  private _initialize         : () => void;
  private _numOfQuestions     : number;
  private _numCurrentQuestion : number;
  private _currentQuestion    : HTMLElement;
  private _fn                 : {
    updateProgressBar         : () => void
  };
  private _dom                : {
    progressBar : HTMLElement,
    form        : HTMLElement
  } = <any> {};
  private _settings           : {
    progressBar         : string,
    questionItem        : string,
    questionItemActive  : string,
    form                : string,
    transitionEventName : string
  };

  constructor(
    private _router       : Router,
    private _routeParams  : RouteParams
  ) {
    this.initModule();
  }

  initModule() {
    this._settings = {
      progressBar         : '.ProgressBar',
      questionItem        : '.QuestionList-item',
      questionItemActive  : '.QuestionList-item.is-active',
      form                : '.SalaryForm',
      transitionEventName : 'webkitTransitionEnd'
    };

    this._catchDom = () => {
      console.log(this._dom);
      this._dom = {
        progressBar : (<HTMLElement> document.querySelector(this._settings.progressBar)),
        form        : (<HTMLElement> document.querySelector(this._settings.form))
      };
    };

    this._suscribeEvents = () => {
      this._dom.progressBar.addEventListener(
          this._settings.transitionEventName,
          () => this._dom.form.classList.remove('is-change')
      );
    };

    this.events = {
      onNextQuestion: () => {
        let nextQuestion;

        this._currentQuestion =  (<HTMLElement> document.querySelector(
                                                          this._settings.
                                                          questionItemActive));
        nextQuestion          = (<HTMLElement> this._currentQuestion.nextElementSibling);
        this._fn.updateProgressBar();
        this._dom.form.classList.add('is-change');
        this._currentQuestion.classList.remove('is-active');
        nextQuestion.classList.add('is-active');
      },
      onEndTransitionFn: () => {
        this._dom.form.classList.remove('is-change');
      }
    };

    this._fn = {
      updateProgressBar : () => {
        this._dom.progressBar.style.width = this._numCurrentQuestion * (
                                              100 /  this._numOfQuestions
                                            ) + '%';
      }
    };

    this._initialize = () => {
      this._numOfQuestions      = (document.querySelectorAll(
                                                this._settings.questionItem
                                                )).length;
      this._numCurrentQuestion  = parseInt(this._routeParams.get('id'));
      this._catchDom();
      this._suscribeEvents();
    };
  }

  ngOnInit() {
    this._initialize();
  }
}
