import { User } from "./userTypes";

export interface Message {
    text: string;
    user: User;
    date: string;
}