import { IEventNotification } from '../interface';
import Discord from './Discord';

export default class DiscordErrorMessage extends Discord {
  protected buildTitle(message: IEventNotification) {
    this.embed
      .setAuthor(`🔥 ${message.title} - ${message.resource}🔥`)
      .setTitle(`IDENTIFICADOR: ${message.id}`)
      .setColor('DARK_RED');

    return this.embed;
  }

  protected buildDescription(message: IEventNotification) {
    this.embed.setDescription(`DESCRIÇÃO: ${message.description}`);
    return this.embed;
  }
}
