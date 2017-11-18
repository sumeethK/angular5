import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';
import { Status } from './todo/model/task-status';

export const fadeIn = trigger('fadeIn', [
     transition('void =>*', animate('300ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))),
      transition('* => void', animate('200ms ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0)', offset: 0}),
        style({opacity: 1, border: '1em yellow', transform: 'translateX(75%)',     offset: .5}),
        style({opacity: 0, transform: 'translateX(100%)',     offset: 1.0})
      ]))),
      transition(Status.IN_PROGRESS + '=>' + Status.COMPLETED, animate('200ms ease-out', keyframes([
        style({opacity: 0, color: '#fff', background : '#5cb85c', offset: 1.0})
      ])))
  ]);

  export const done = trigger('doneAnimation', [
        transition(Status.IN_PROGRESS + '=>' + Status.COMPLETED, animate('200ms ease-out', keyframes([
          style({opacity: 0, color: '#fff', background : '#5cb85c', offset: 1.0})
        ])))
    ]);


