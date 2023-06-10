import { MessageEmbed, WebhookClient } from 'discord.js';
import { ENVIROMENT_VARS } from '../../config/envs/eviroment';
import {
  IDiscordWebhookOptions,
  IEventNotification,
  INotify,
} from '../interface';

export default abstract class Discord implements INotify {
  protected abstract buildTitle(message: IEventNotification): MessageEmbed;
  protected abstract buildDescription(
    message: IEventNotification,
  ): MessageEmbed;

  protected options: IDiscordWebhookOptions = {
    avatarURL:
      'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2022.png',
    username: 'MEMO-GROUP',
  };

  protected webHookClient: WebhookClient = new WebhookClient(
    ENVIROMENT_VARS.DISCORD.ID,
    ENVIROMENT_VARS.DISCORD.TOKEN,
  );

  protected embed: MessageEmbed = new MessageEmbed();

  protected buildMessage(message: IEventNotification) {
    this.buildTitle(message);
    this.buildDescription(message);
    return this.embed;
  }

  public async sendNotification(message: IEventNotification) {
    try {
      const embed = this.buildMessage(message);
      await this.webHookClient.send({
        ...this.options,
        embeds: [embed],
      });
      this.webHookClient.destroy();
    } catch (err) {
      console.log(err);
    }
  }
}
