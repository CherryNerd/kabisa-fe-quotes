
export interface ZenquoteDTO {
  q: string;
  a: string;
  i?: string;
  c: string;
  h: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  date: number;
  votes: QuoteVote[];
  score: number;
}

export interface QuoteVote {
  id: string;
  score: number;
  date: number;
}
