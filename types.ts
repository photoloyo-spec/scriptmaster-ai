
export enum Sender {
  USER = 'USER',
  AI = 'AI'
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
  isCode?: boolean;
}

export interface ScriptSession {
  id: string;
  name: string;
  messages: Message[];
}
