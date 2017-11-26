import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Notification, NotificationType } from './notification';
@Injectable()
export class NotificationService {

  messageSource = new BehaviorSubject<Notification>(
    new Notification(NotificationType.ADD, 'intialied...'));

  message$ = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: Notification) {
    this.messageSource.next(message);
  }

}
