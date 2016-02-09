import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router, CanReuse, OnReuse, ComponentInstruction} from 'angular2/router';
import {
	FormBuilder,
	Validators,
	Control,
	ControlGroup,
	FORM_DIRECTIVES

} from 'angular2/common';
import {Salary} from './salary';

@Component({
  template: require('../views/salary-form.html'),
  styles  : [
    require('../styles/salary-form.styl').toString()
  ],
  directives : [FORM_DIRECTIVES]
})

export class SalaryComponent implements OnInit, CanReuse, OnReuse {
  public salaryForm           : ControlGroup;
  public salary               = new Salary();
  public events               : {};
  public fn                   : {
                                  updateProgressBar      : () => void,
                                  createSalaryForm       : () => void,
                                  validQuestions         : () => boolean,
                                  renderCurrentQuestion  : () => void
                                };
  private _catchDom           : () => void;
  private _afterCatchDom      : () => void;
  private _suscribeEvents     : () => void;
  private _initialize         : () => void;
  private _numOfQuestions     : number;
  private _numCurrentQuestion : number;
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
      this.fn.createSalaryForm();
      this.fn.renderCurrentQuestion();
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
        if (this.fn.validQuestions()) {
          this.fn.updateProgressBar();
          this._dom.form.classList.add('is-change');
          this._dom.currentQuestion.classList.remove('is-active');
          this._dom.nextQuestion.classList.add('is-active');
        }
      }
    };

    this.fn = {
      updateProgressBar : () => {
        this._dom.progressBar.style.width = this._numCurrentQuestion * (
                                              100 /  this._numOfQuestions
                                            ) + '%';
      },
      createSalaryForm : () => {
        this.salaryForm = new ControlGroup({
          grossSalary           : new Control('', Validators.required),
          hasFamiliarAssigment  : new Control('', Validators.required),
          afp                   : new Control('', Validators.required)
        });
      },
      validQuestions: () => {
        let control = null;
        switch (this._numCurrentQuestion) {
          case 1:
            control = this.salaryForm.controls['grossSalary'];
            break;
          case 2:
            control = this.salaryForm.controls['hasFamiliarAssigment'];
            break;
          case 3:
            control = this.salaryForm.controls['afp'];
            break;
        }

        return control.valid;
      },
      renderCurrentQuestion: () => {
        this.fn.updateProgressBar();
        this._dom.form.classList.add('is-change');
        this._dom.currentQuestion.classList.remove('is-active');
        let renderQuestion = (<HTMLElement> document.querySelector(
                                                this._settings.questionItems +
                                                '[data-step="' +
                                                this._numCurrentQuestion +
                                                '"]'));
        renderQuestion.classList.add('is-active');
      }
    };

    this._initialize = () => {
      this._catchDom();
      this._afterCatchDom();
      this._suscribeEvents();
    };
  }

  ngOnInit() {
    this._initialize();
  }

  routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
    return true;
  }

  routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
    this._numCurrentQuestion = parseInt(next.params['id']);
  }
}
