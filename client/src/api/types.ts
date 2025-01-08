import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type CustomMutationResult<TData, TArgs = unknown> = UseMutationResult<
    TData,
    Error,
    TArgs,
    unknown
>;

export type CustomQueryResult<TData, TArgs = unknown> = Omit<
    UseQueryResult<TData, TArgs>,
    "data" | "refetch" | "promise"
> & { data: TData; refetch: () => void; promise: unknown };

export interface TextResponse {
    text: string;
    user: string;
    channel?: 'direct' | 'backroom';
    attachments?: {
        url: string;
        contentType: string;
        title: string;
    }[];
}
