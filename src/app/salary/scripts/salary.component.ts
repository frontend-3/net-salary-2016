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
  private _afterCatchDom      : () => void;
  private _suscribeEvents     : () => void;
  private _initialize         : () => void;
  private _numOfQuestions     : number;
  private _numCurrentQuestion : number;
  private _fn                 : {
    updateProgressBar         : () => void
  };
  private _dom                : {
    progressBar     : HTMLElement,
    form            : HTMLElement,
    questionItems   : any,
    currentQuestion : HTMLElement,
    nextQuestion    : HTMLElement
  } = <any> {};
  private _settings            : {
    progressBar         : string,
    questionItems       : string,
    currentQuestion     : string,
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
      questionItems       : '.QuestionList-item',
      currentQuestion     : '.QuestionList-item.is-active',
      form                : '.SalaryForm',
      transitionEventName : 'webkitTransitionEnd'
    };

    this._catchDom = () => {
      this._dom.progressBar     =
        (<HTMLElement> document.querySelector(this._settings.progressBar));
      this._dom.form            =
        (<HTMLElement> document.querySelector(this._settings.form));
      this._dom.questionItems   =
        document.querySelectorAll(this._settings.questionItems);
      this._dom.currentQuestion =
        (<HTMLElement> document.querySelector(this._settings.currentQuestion));
      this._dom.nextQuestion    =
      (<HTMLElement> this._dom.currentQuestion.nextElementSibling);
    };

    this._afterCatchDom = () => {
      this._numOfQuestions      = this._dom.questionItems.length;
      this._numCurrentQuestion  = parseInt(this._routeParams.get('id'));
    };

    this._suscribeEvents = () => {
      this._dom.progressBar.addEventListener(
          this._settings.transitionEventName,
          () => {
            let nextId;

            nextId = this._numCurrentQuestion + 1;
            this._dom.form.classList.remove('is-change');
            this._router.navigate( ['Questions', { id: nextId }] );
          }
      );
    };

    this.events = {
      onNextQuestion: () => {
        this._fn.updateProgressBar();
        this._dom.form.classList.add('is-change');
        this._dom.currentQuestion.classList.remove('is-active');
        this._dom.nextQuestion.classList.add('is-active');
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
      this._catchDom();
      this._afterCatchDom();
      this._suscribeEvents();
      console.log(this._routeParams.get('id'));
    };
  }

  ngOnInit() {
    this._initialize();
  }
}
