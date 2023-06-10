import sinon from 'sinon';
import test from 'ava';
import { notifyFactory } from '../../../Notification/factory';
import * as factory from '../../../Notification/Discord/factory';
import { ERROR_ENUM } from '../../../Notification/interface';

const mockedTest = { ...test };

mockedTest.serial.afterEach.always(() => {
  sinon.restore();
});

mockedTest.serial(
  'should test for verify a call notifyFactory with a correct service',
  async (t) => {
    const stubDiscordFactory = sinon
      .stub(factory, 'discordFactory')
      .returns('' as any);

    notifyFactory({ service: 'discord', isError: false } as any);

    t.true(stubDiscordFactory.calledOnceWithExactly(false));
  },
);

mockedTest.serial(
  'should test for verify a call notifyFactory with a incorrect service',
  async (t) => {
    try {
      notifyFactory({ service: 'slack', isError: false } as any);
    } catch (e) {
      t.is(e.message, ERROR_ENUM.SERVICE_NOT_FOUND);
      t.true(e instanceof Error);
    }
  },
);
