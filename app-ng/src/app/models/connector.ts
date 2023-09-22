export interface IConnector {
    chatId: string;
    name: string;
    avatar: string;
    latestMessage: string;
    time: Date;
    isRead: boolean;
}
