import sinon from 'sinon';
import test from 'ava';
import Discord from '../../../Notification/Discord/Discord';
import { MessageEmbed, WebhookClient } from 'discord.js';
import { IEventNotification } from 'src/Notification/interface';

const mockedTest = { ...test };

mockedTest.serial.afterEach.always(() => {
  sinon.restore();
});

class MockDiscord extends Discord {
  protected buildTitle(): MessageEmbed {
    throw new Error('Method not implemented.');
  }
  protected buildDescription(): MessageEmbed {
    throw new Error('Method not implemented.');
  }
}

mockedTest.serial('should test for verify a build message method', (t) => {
  const stubBuildTitle = sinon
    .stub(MockDiscord.prototype, <any>'buildTitle')
    .returns('');

  const stubBuildDescription = sinon
    .stub(MockDiscord.prototype, <any>'buildDescription')
    .returns('');

  const mockDiscord = new MockDiscord()['buildMessage']({ message: '' } as any);

  t.true(stubBuildTitle.calledOnceWithExactly({ message: '' }));
  t.true(stubBuildDescription.calledOnceWithExactly({ message: '' }));
  t.true(mockDiscord instanceof MessageEmbed);
});

mockedTest.serial('should test for verify a sendNotification method', (t) => {
  const stubBuildMessage = sinon
    .stub(MockDiscord.prototype, <any>'buildMessage')
    .returns('');

  const stubWebhookClientSend = sinon
    .stub(WebhookClient.prototype, <any>'send')
    .resolves('');

  sinon.stub(WebhookClient.prototype, <any>'destroy').returns('');

  const instance = new MockDiscord();

  instance.sendNotification({ message: '' } as any);

  t.true(stubBuildMessage.calledOnceWithExactly({ message: '' }));
  t.true(
    stubWebhookClientSend.calledOnceWithExactly({
      avatarURL:
        'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2022.png',
      username: 'MEMO-GROUP',
      embeds: [''],
    }),
  );
});
