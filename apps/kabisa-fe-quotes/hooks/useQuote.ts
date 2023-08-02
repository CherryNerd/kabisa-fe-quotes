'use client';
import {useQuery} from "@tanstack/react-query";
import {Quote} from "@kabisa-assessment/types";
import {getQuoteByid, getRandomQuote} from "../app/page";
import {useEffect} from "react";
import {serverPortConfig, WebSocketEvents} from "@kabisa-assessment/config";


export default function useQuote(initialData: Quote) {
  const {data, refetch, ...rest} = useQuery<Quote>({
    queryKey: ['quote', initialData.id],
    initialData,
    queryFn: () => getQuoteByid(initialData.id),
  });


  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:${serverPortConfig.server.api.wss}`);

    ws.onmessage = (evt) => {
      const eventData = JSON.parse(evt.data);
      if (eventData.event === WebSocketEvents.QuoteScoreUpdate && initialData.id === eventData.id) {
        refetch();
      }
    }

    return () => {
      ws.close();
    }
  }, [initialData.id, refetch])

  return {data, refetch, ...rest};
}
