import { discordFactory } from './Discord/factory';
import { ERROR_ENUM, INotifyFactory, SERVICE_ENUM } from './interface';

export const notifyFactory = (message: INotifyFactory) => {
  switch (message.service) {
    case SERVICE_ENUM.DISCORD:
      return discordFactory(message.isError);
    default:
      throw new Error(ERROR_ENUM.SERVICE_NOT_FOUND);
  }
};
