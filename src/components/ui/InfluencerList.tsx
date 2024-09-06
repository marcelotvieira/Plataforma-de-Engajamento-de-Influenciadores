"use client"
import useSWRInfinite from 'swr/infinite';
import { getInfluencers } from "@/app/(authPages)/panel/influencers/actions";
import { Influencer } from "@prisma/client";
import React from "react";
import InfiniteScroll from "../infinite-scroll";
import { Button } from "./button";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface InfluencerListProps {
  search: string;
  minAlcance: string;
  maxAlcance: string;
  nicho: string;
}

const fetcher = async ([page, search, nicho, minAlcance, maxAlcance]: [number, string, string, string, string]) => {
  return getInfluencers(page, 16, search, nicho, minAlcance, maxAlcance)
};

export default function InfluencerList({ search, minAlcance, maxAlcance, nicho }: InfluencerListProps) {
  const router = useRouter();

  const getPayload = (pageIndex: number, previousPageData: Influencer[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return [pageIndex + 1, search, nicho, minAlcance, maxAlcance];
  };

  // para garantir caching no lado do cliente
  const { data, size, setSize, isValidating } = useSWRInfinite(
    getPayload,
    fetcher
  );

  const influencers = data ? data.flat() : [];
  const hasMore = !data || (data[size - 1]?.length === 16);

  return (
    <div className="w-full mb-4 sm:max-h-[71vh] max-h-[44vh] overflow-x-auto scrollbar">
      <table className="w-full text-foreground font-normal text-sm min-w-max">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 w-12">#</th>
            <th className="text-left w-1/4">USERNAME</th>
            <th className="text-left w-1/4">NOME</th>
            <th className="text-left w-1/4">EMAIL</th>
            <th className="text-left w-1/6">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {influencers.map((i, index) => (
            <tr key={i.id} className="border-t py-4">
              <td className="text-left py-2">{index + 1}</td>
              <td className="text-left truncate whitespace-nowrap">{i.usernameInstagram}</td>
              <td className="text-left truncate whitespace-nowrap">{i.nome}</td>
              <td className="text-left truncate whitespace-nowrap">{i.email}</td>
              <td className="text-left">
                <Button
                  size="icon"
                  className="text-xs"
                  onClick={() => router.push(`/panel/influencers/${i.id}`)}
                  variant="ghost"
                >
                  <BsEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfiniteScroll
        hasMore={hasMore}
        isLoading={isValidating}
        next={() => setSize(size + 1)}
        threshold={0}
      >
        {hasMore && (
          <div className='w-full'>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
          </div>
        )}
        {isValidating && (
          <div className='w-full'>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
            <div className='sm:w-full w-[100vmax] h-8 rounded bg-secondary animate-pulse mb-4'></div>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
