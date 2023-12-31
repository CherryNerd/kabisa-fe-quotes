'use client';
import {useQuery} from "@tanstack/react-query";
import {Quote} from "@kabisa-assessment/types";
import {getQuotes} from "../app/recent/page";
import {useEffect} from "react";
import {serverPortConfig, WebSocketEvents} from "@kabisa-assessment/config";
import {getTop10Quotes} from "../app/top10/page";

export default function useQuotes(initialData?: Quote[], isTop10: boolean = false) {
  const {data, refetch, ...rest} = useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: isTop10 ? getTop10Quotes : getQuotes,
    initialData
  });

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:${serverPortConfig.server.api.wss}`);

    ws.onmessage = (evt) => {
      const eventData = JSON.parse(evt.data);

      if(eventData.event === WebSocketEvents.Reload) {
        refetch();
      }
    }

    return () => {
      ws.close();
    }
  }, [])


  return {data : data || [], refetch, ...rest};
}
