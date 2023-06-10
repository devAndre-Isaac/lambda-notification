import sinon from 'sinon';
import test from 'ava';
import * as functions from '../';
import * as factory from '../Notification/factory';
const mockedTest = { ...test };

mockedTest.serial.afterEach.always(() => {
  sinon.restore();
});

mockedTest.serial(
  'should test for verify a call notifyFactory with service and type',
  async (t) => {
    sinon.stub(functions, 'handleSqsEnviroment').returns({ sqsevent: 'test' });
    const stubParseSqsMessage = sinon
      .stub(functions, 'parseSqsMessage')
      .returns([
        {
          serviceToDispare: 'test',
          isError: true,
        },
      ]);
    sinon.stub(functions, 'finishEvent').returns({} as any);

    const stubNotifyFactory = sinon.stub(factory, 'notifyFactory').returns({
      sendNotification: () => {
        return '';
      },
    } as any);

    functions.handler({} as any, {} as any, {} as any);

    t.true(stubParseSqsMessage.calledOnceWithExactly({ sqsevent: 'test' }));
    t.true(
      stubNotifyFactory.calledOnceWithExactly({
        service: 'test',
        isError: true,
      }),
    );
  },
);
