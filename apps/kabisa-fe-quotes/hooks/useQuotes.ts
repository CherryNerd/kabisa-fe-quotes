'use client';
import {useQuery} from "@tanstack/react-query";
import {Quote} from "@kabisa-assessment/types";
import {getQuotes} from "../app/page";
import {useEffect} from "react";
import {serverPortConfig, WebSocketEvents} from "@kabisa-assessment/config";

export default function useQuotes(initialData?: Quote[]) {
  const {data, refetch, ...rest} = useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: getQuotes,
    initialData
  });

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:${serverPortConfig.server.api.wss}`);

    ws.onopen = () => {
      console.log('useQuotes WS Connected')
    };

    ws.onmessage = (evt) => {
      if(evt.data === WebSocketEvents.Reload) {
        refetch();
      }
    }

    return () => {
      ws.close();
    }
  }, [])


  return {data : data || [], refetch, ...rest};
}
