'use client';


import {Quote} from "@kabisa-assessment/types";
import QuoteCard from "./QuoteCard";
import useQuote from "../../hooks/useQuote";

interface HomeQuotesProps {
  initialData: Quote
}

export function RandomQuote({initialData}: HomeQuotesProps) {
  const {data, refetch, ...rest} = useQuote(initialData);


  return (
    <>
      <QuoteCard quote={data as Quote}/>

    </>
  );
}
