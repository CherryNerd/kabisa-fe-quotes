import {serverPortConfig} from "@kabisa-assessment/config";
import {Quote} from "@kabisa-assessment/types";
import {QuotesList} from "../../components/Quote";


export async function getQuotes() {
  const response = await fetch(`http://localhost:${serverPortConfig.server.api.port}/quotes`);
  const data =  await response.json();
  return data.quotes;
}

export default async function Index() {
  const quotes: Quote[] = await getQuotes();

  return (
    <QuotesList initialData={quotes}/>
  );
}
