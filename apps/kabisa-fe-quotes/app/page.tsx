import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Quote} from "@kabisa-assessment/types";
import {serverPortConfig} from "@kabisa-assessment/config";
import {getQuotes} from "./recent/page";
import {RandomQuote} from "../components/Quote/RandomQuote";

export async function getRandomQuote() {
  const response = await fetch(`http://localhost:${serverPortConfig.server.api.port}/quote/random`);
  const data = await response.json();

  return data.quote;
}

export async function getQuoteByid(id: string) {
  const response = await fetch(`http://localhost:${serverPortConfig.server.api.port}/quote/${id}`);
  const data = await response.json();

  return data.quote;
}

export default async function Index() {
  const quote: Quote = await getRandomQuote();


  // console.log(queryClient.unmount())


  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  // if (isFetching) return (<div>Loading...</div>);


  return (
    <>
      <div className="h-full w-full flex items-center justify-center">

      <RandomQuote initialData={quote}/>
      </div>
    </>
  )

  return (<>Demo</>)

  // return (
  //   <QuoteCard quote={data as Quote}/>
  // );
}
