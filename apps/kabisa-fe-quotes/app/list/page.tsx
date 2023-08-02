import {serverPortConfig} from "@kabisa-assessment/config";
import {Quote} from "@kabisa-assessment/types";
import {QuotesList} from "../../components/Quote";


export async function getQuotes() {
  console.log('getting quotes from', `http://localhost:${serverPortConfig.server.api.port}/quotes`)
  const response = await fetch(`http://localhost:${serverPortConfig.server.api.port}/quotes`);
  const data =  await response.json();
  console.log('response', data)
  return data.quotes;
}

export default async function Index() {
  const quotes: Quote[] = await getQuotes();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <QuotesList initialData={quotes}/>
  );
}
