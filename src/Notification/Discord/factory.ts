import { ERROR_ENUM } from '../interface';
import DiscordErrorMessage from './DiscordErrorMessage';
import DiscordNotifyMessage from './DiscordNotifyMessage';

export const discordFactory = (isError: boolean) => {
  switch (isError) {
    case true:
      return new DiscordErrorMessage();
    case false:
      return new DiscordNotifyMessage();
    default:
      throw new Error(ERROR_ENUM.TYPE_NOT_FOUND);
  }
};
