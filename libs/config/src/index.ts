interface ProjectPortConfig {
  server: {
    api: {
      name: string;
      wss: number;
      port: number;
    }
  }
}

export const serverPortConfig: ProjectPortConfig = {
  server: {
    api: {
      name: 'API',
      wss: 3002,
      port: 3001
    }
  }
} as const

export enum WebSocketEvents {
  Reload = 'Reload',
  NewQuote = 'NewQuote',
}

