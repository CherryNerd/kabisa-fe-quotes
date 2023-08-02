import {Quote, ZenquoteDTO} from "@kabisa-assessment/types";
import fetch from 'node-fetch';
import {wait} from "@kabisa-assessment/util";
import {existsSync} from "node:fs";
import {readFile, writeFile,} from 'node:fs/promises';
import {join} from "path";
import {WebSocket, WebSocketServer} from "ws";
import * as process from "process";
import {v4 as uuidv4} from 'uuid';
import {WebSocketEvents} from "@kabisa-assessment/config";

const dataFolderPath = join(process.cwd(), 'apps', 'api', 'data');

const timeSinceLastQuotePath = join(dataFolderPath, 'timeSinceLastQuote.txt');
const quotesPath = join(dataFolderPath, 'quotes.json');

export class QuoteHandler {

  quotes: Quote[] = [];

  wss: WebSocketServer;

  async init(amount: number = 10) {
    if (!existsSync(timeSinceLastQuotePath)) {
      console.log('Creating timeSinceLastQuote.txt')
      await writeFile(timeSinceLastQuotePath, '0', 'utf-8');
    }
    if (!existsSync(quotesPath)) {
      console.log('Creating quotes.json')
      await this.writeAndBroadcastQuotes();
    } else {
      const quotesFileContent = await readFile(quotesPath, 'utf-8');
      this.quotes = JSON.parse(quotesFileContent);
    }


    for (let i = 0; i < amount - this.quotes.length; i++) {
      await this.fetchRandomQuote();
    }
  }

  private async getTimeSinceLastQuote() {
    const lastQuoteAt = await readFile(timeSinceLastQuotePath, 'utf-8');

    return Date.now() - parseInt(lastQuoteAt);
  }

  private broadcastReload() {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(WebSocketEvents.Reload);
      }
    });
  }

  private async writeAndBroadcastQuotes() {
    await writeFile(quotesPath, JSON.stringify(this.quotes, null, 4), 'utf-8');
    this.broadcastReload();
  }

  async voteOnQuote(id: string, upvote: boolean) {
    const quote = this.quotes.find(q => q.id === id);
    if (!quote) {
      throw new Error('Quote not found');
    }

    const score = upvote ? 1 : -1;
    quote.votes.push({
      id: uuidv4(),
      score,
      date: Date.now()
    });

    quote.score += score;
    await writeFile(quotesPath, JSON.stringify(this.quotes, null, 4), 'utf-8');
    return quote;
  }

  async fetchRandomQuote() {
    const timeSinceLastQuote = await this.getTimeSinceLastQuote();
    if (timeSinceLastQuote < 6500) {
      // Wait for a max of 6.5 seconds before loading the next quote
      // Usage limited to 5 per 30 seconds without an account on zenquotes.io
      // https://docs.zenquotes.io/zenquotes-documentation/#use-limits
      await wait(6500 - timeSinceLastQuote);
    }


    const response = await fetch('https://zenquotes.io/api/random');
    const data: ZenquoteDTO[] = await response.json();

    await writeFile(timeSinceLastQuotePath, Date.now().toString(), 'utf-8');

    console.log(data)

    const quote = {
      id: uuidv4(),
      text: data[0].q,
      author: data[0].a,
      votes: [],
      score: 0,
      date: Date.now()
    }

    console.log('Fetched quote: ', `${quote.author}: ${quote.text}`);

    const quoteExists = this.quotes.find(q => q.text === quote.text && q.author === quote.author);
    if (quoteExists) {
      console.log('Quote already exists, skipping...');
      return quoteExists;
    }


    this.quotes.unshift(quote)

    this.writeAndBroadcastQuotes();
    return quote;
  }

}
