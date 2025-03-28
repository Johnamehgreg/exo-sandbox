import { Agent } from '@/types/general';
import { QueryClient } from '@tanstack/react-query';
import clsx, { type ClassValue } from 'clsx';
import { Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const hasAccess = (agent: Agent, session: Session | null) =>
  session?.user?.agentAccess?.includes(agent);

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};

export const queryClient = new QueryClient();
