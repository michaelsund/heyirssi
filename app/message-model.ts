export class Message {
    constructor(public time: Date, public channel: string, public nick: string, public msg: string) {
    }
}