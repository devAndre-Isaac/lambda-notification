import sinon from 'sinon';
import test from 'ava';
import { discordFactory } from '../../Notification/Discord/factory';
import { ERROR_ENUM } from '../../Notification/interface';
import DiscordErrorMessage from '../../Notification/Discord/DiscordErrorMessage';
import DiscordNotifyMessage from '../../Notification/Discord/DiscordNotifyMessage';

const mockedTest = { ...test };

mockedTest.serial.afterEach.always(() => {
  sinon.restore();
});

mockedTest.serial(
  'should test for verify a call discordFactory with a isError true case',
  async (t) => {
    const instance = discordFactory(true);

    t.true(instance instanceof DiscordErrorMessage);
  },
);

mockedTest.serial(
  'should test for verify a call discordFactory with a isError false case',
  async (t) => {
    const instance = discordFactory(false);

    t.true(instance instanceof DiscordNotifyMessage);
  },
);

mockedTest.serial(
  'should test for verify a call discordFactory with a isError is not a valid type',
  async (t) => {
    try {
      discordFactory('false' as any);
    } catch (e) {
      t.true(e instanceof Error);
      t.is(e.message, ERROR_ENUM.TYPE_NOT_FOUND);
    }
  },
);
