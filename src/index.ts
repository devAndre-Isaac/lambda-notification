import { ENVIROMENT_VARS } from './config/envs/eviroment';
import { notifyFactory } from './Notification/factory';

export const parseSqsMessage = (messages: any) => {
  return JSON.parse(messages.body).map((record: any) => {
    return record;
  });
};

export const handleSqsEnviroment = (events: any) => {
  if (ENVIROMENT_VARS.HOST !== 'local') {
    return events;
  }
  const body = JSON.parse(events.body);

  return {
    ...events,
    Records: body.map((payloadInstance: any) => {
      return {
        body: JSON.stringify(payloadInstance),
      };
    }),
  };
};
export const handler = async (
  events: AWSLambda.SQSEvent,
  context: AWSLambda.Context,
  callback: AWSLambda.Callback,
): Promise<void> => {
  events = handleSqsEnviroment(events);
  const messages = parseSqsMessage(events);
  try {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const { serviceToDispare, isError, ...notification } = message;

      await notifyFactory({
        service: serviceToDispare,
        isError: isError,
      }).sendNotification(notification);
    }
  } catch (err) {
    throw err;
  }

  finishEvent(context, callback);
};

export const finishEvent = (
  context: AWSLambda.Context,
  callback: AWSLambda.Callback,
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  callback(null, 1);
};
