import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  searchText;
  message = 'Defaut';
  newMessage = false;
  constructor(private _notificationService: NotificationService) {

    this._notificationService.message$
    .subscribe((change: Notification) => {
      this.newMessage = true;
      this.message = change.message;
    console.log('change :' + this.message); });
  }

  close() {
    this.newMessage = false;
  }

  }
