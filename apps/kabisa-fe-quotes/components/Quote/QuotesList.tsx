'use client';


import {Quote} from "@kabisa-assessment/types";
import QuoteCard from "./QuoteCard";
import useQuotes from "../../hooks/useQuotes";
import {useQueryClient} from "@tanstack/react-query";

interface HomeQuotesProps {
  initialData: Quote[],
  isTop10?: boolean
}

export function QuotesList({initialData, isTop10 = false}: HomeQuotesProps) {
  const {data} = useQuotes(initialData, isTop10);
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
