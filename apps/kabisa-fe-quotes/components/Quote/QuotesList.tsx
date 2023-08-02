'use client';


import {useQuery} from "@tanstack/react-query";
import {Quote} from "@kabisa-assessment/types";
import {getQuotes} from "../../app/page";
import QuoteCard from "./QuoteCard";

interface HomeQuotesProps {
  initialData: Quote[]
}

export function QuotesList({initialData}: HomeQuotesProps) {
  const {data} = useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: getQuotes,
    initialData
  });

  return (
    <>
      <div className="flex flex-col">
        <ul role="list" className="grid grid-cols-1 divide-y divide-y-2 divide-violet-200 divide-round ">
          {data.map((quote) => {
            return (
              <li key={quote.id} className={"py-6"}>
                <QuoteCard quote={quote}/>
              </li>
            )
          })}
        </ul>
      </div>

    </>
  );
}
