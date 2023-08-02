import {Quote} from '@kabisa-assessment/types';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from "@heroicons/react/24/solid";
import {useMutation} from "@tanstack/react-query";
import {serverPortConfig} from "@kabisa-assessment/config";

interface ScoreProps {
  score: number;
}

function Score({score}: ScoreProps) {

  let textColor = 'text-gray-500';
  let icon = <MinusIcon className="h-5 w-5" aria-hidden="true"/>;
  if (score > 0) {
    textColor = 'text-green-500';
    icon = <ArrowUpIcon className="h-5 w-5" aria-hidden="true"/>;
  } else if (score < 0) {
    textColor = 'text-red-500';
    icon = <ArrowDownIcon className="h-5 w-5" aria-hidden="true"/>;
  }


  return (
    <>
      <div className="flex flex-row items-center space-x-2">
        {icon}
        <p className={`text-base font-medium text-center ${textColor}`}>{score}</p>
      </div>
    </>
  )
}

interface QuoteProps {
  quote: Quote;
}

export default function QuoteCard({quote}: QuoteProps) {
  const upVote = useMutation((quote: Quote) => {
    return fetch(`http://localhost:${serverPortConfig.server.api.port}/quote/${quote.id}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    }).then(res => res.json())
  });
  const downVote = useMutation((quote: Quote) => {
    return fetch(`http://localhost:${serverPortConfig.server.api.port}/quote/${quote.id}/downvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    }).then(res => res.json())
  });


  return (
    <>
      <div
        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-slate-800 shadow">
        <div className="w-full items-center justify-between space-x-6 p-6 flex flex-row">
          <div>
            <Score score={quote.score}/>
          </div>
          <div className="truncate flex-1">
            <div className="flex items-center space-x-3 w-full">
              <h3 className="truncate text-base font-medium text-violet-500 text-center w-full">{quote.author}</h3>
            </div>
            <p className="mt-1 truncate text-sm w-full text-center">{quote.text}</p>
          </div>
          <div>

          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <button
                onClick={() => downVote.mutate(quote)}
                type="button"
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
              >
                <ArrowDownIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
              </button>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <button
                onClick={() => upVote.mutate(quote)}
                type="button"
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
              >
                <ArrowUpIcon className="h-5 w-5 font-bold text-green-400" aria-hidden="true"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
