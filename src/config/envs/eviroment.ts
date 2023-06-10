import { config } from 'dotenv';

config();

export const ENVIROMENT_VARS = {
  DISCORD: {
    ID: process.env.DISCORD_CHANNEL_ID!,
    TOKEN: process.env.DISCORD_CHANNEL_TOKEN!,
  },
  HOST: process.env.HOST,
};
