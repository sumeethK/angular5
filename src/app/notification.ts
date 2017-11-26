export class Notification {
    type: NotificationType;
    message: string;
    constructor(_type: NotificationType, _message: string ) {
        this.type = _type;
        this.message = _message;
    }
}
export enum NotificationType {
    ADD, UPDATE
}

