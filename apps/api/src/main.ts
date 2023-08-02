/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import {serverPortConfig, WebSocketEvents} from '@kabisa-assessment/config'
import {WebSocketServer} from "ws";
import {QuoteHandler} from "./lib/QuoteHandler";
import cors from 'cors';

const app = express();

const wss = new WebSocketServer({port: serverPortConfig.server.api.wss});

const quoteHandler = new QuoteHandler();


async function start() {
  await quoteHandler.init();
}

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/quotes', (req, res) => {
  res.send({ quotes: quoteHandler.quotes });
});

app.get('/quotes/random', async (req, res) => {
  const quote = await quoteHandler.fetchRandomQuote();
  wss.emit(WebSocketEvents.Reload);
  res.send({ quote });
});


const port = serverPortConfig.server.api.port;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


start();