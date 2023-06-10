export interface IEventNotification {
  description: string;
  id: string;
  resource: string;
  title: string;
}
export interface IDiscordWebhookOptions {
  username?: string;
  avatarURL?: string;
}

export interface INotify {
  sendNotification(message: IEventNotification): Promise<void>;
}

export enum SERVICE_ENUM {
  DISCORD = 'discord',
}

export interface INotifyFactory {
  service: string;
  isError: boolean;
}

export enum ERROR_ENUM {
  SERVICE_NOT_FOUND = 'Service not found',
  TYPE_NOT_FOUND = 'Message Type not found',
}
