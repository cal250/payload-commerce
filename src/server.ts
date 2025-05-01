/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
import next from 'next';
import nextBuild from 'next/dist/build';
import path from 'path';
import express from 'express';
import payload from 'payload';
import { seed } from './payload/seed';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure PAYLOAD_SECRET is set
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is not defined in the environment variables.');
}

const start = async (): Promise<void> => {
  // eslint-disable-next-line prettier/prettier
  try {
    // Initialize Payload CMS
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Handle seeding if required
    if (process.env.PAYLOAD_SEED === 'true') {
      await seed(payload);
      process.exit();
    }

    // Handle Next.js build if required
    if (process.env.NEXT_BUILD) {
      app.listen(PORT, async () => {
        payload.logger.info('Next.js is now building...');
        // Build Next.js application
        await nextBuild(path.join(__dirname, '../'));
        process.exit();
      });
      return;
    }

    // Initialize Next.js app
    const nextApp = next({
      dev: process.env.NODE_ENV !== 'production',
    });

    const nextHandler = nextApp.getRequestHandler();

    // Handle all other requests with Next.js
    app.use((req, res) => nextHandler(req, res));

    // Prepare Next.js and start the server
    nextApp.prepare().then(() => {
      payload.logger.info('Starting Next.js...');

      app.listen(PORT, async () => {
        payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`);
      });
    });

  } catch (error) {
    payload.logger.error(`Error starting the app: ${error.message}`);
    process.exit(1);
  }
};

start();
