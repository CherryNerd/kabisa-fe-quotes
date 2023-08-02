import {Quote} from "@kabisa-assessment/types";
import {serverPortConfig} from "@kabisa-assessment/config";
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

  return (
    <>
      <div className="h-full w-full flex md:items-center justify-center ">

      <RandomQuote initialData={quote}/>
      </div>
    </>
  )

}
