import {Injectable} from "angular2/core";
import {Message} from "./message-model";
@Injectable()
export class MessageService {
    messagelist: Message[] = [
        // new Message(new Date, "DebugChannel","DebugUser","debug")
    ];
    
    addMessage(message: Message) {
        message.time = new Date();
        this.messagelist.unshift(message);
    }
}
