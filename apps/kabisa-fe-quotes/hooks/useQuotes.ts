'use client';

import {useQuery} from '@tanstack/react-query';
import {Quote} from '@kabisa-assessment/types';
import {getQuotes} from "../app/page";

interface useQuotesProps {
  initialData?: Quote[];
}

export function useQuotes({initialData}: useQuotesProps = {}) {
  return
}
