import {serverPortConfig} from "@kabisa-assessment/config";
import {Quote} from "@kabisa-assessment/types";
import {QuotesList} from "../../components/Quote";
import {useQueryClient} from "@tanstack/react-query";

export async function getTop10Quotes() {
  const response = await fetch(`http://localhost:${serverPortConfig.server.api.port}/quotes/top10`);
  const data = await response.json();
  return data.quotes;
}

export default async function Index() {
  const quotes: Quote[] = await getTop10Quotes();


  return (
    <QuotesList initialData={quotes} isTop10/>
  );
}
