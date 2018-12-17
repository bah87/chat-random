export interface IRequestRandomChatResponse {
  readonly chatId: string;
  readonly participants: string[];
}

export interface IBaseMessage {
  readonly _id: string;
  readonly author: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IChatMessage extends IBaseMessage {
  readonly chatId: string;
  readonly body: string;
}

export interface IGroupedMessage extends IBaseMessage {
  readonly messages: IChatMessage[];
}

export enum SocketEventsEnum {
  RegisterUser = "register user",
  RequestRandomChat = "request random chat",
  NewMessage = "new message"
}

export enum PairingStatusEnum {
  Paired = "paired",
  Unpaired = "unpaired",
  Pairing = "pairing"
}

export interface IAppState {
  readonly username: string;
}
