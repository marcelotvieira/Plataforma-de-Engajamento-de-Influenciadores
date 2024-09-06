"use client"
import useSWRInfinite from 'swr/infinite';
import { getInfluencers } from "@/app/(authPages)/panel/influencers/actions";
import { Influencer } from "@prisma/client";
import React from "react";
import InfiniteScroll from "../infinite-scroll";
import { Button } from "./button";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { getBrands } from '@/app/(authPages)/panel/brands/actions';

interface BrandListProps {
  search: string;
  nicho: string;
}

const fetcher = async ([page, search, nicho]: [number, string, string]) => {
  return getBrands(page, 10, search, nicho)
};

export default function BrandList({ search, nicho }: BrandListProps) {
  const router = useRouter();

  const getPayload = (pageIndex: number, previousPageData: Influencer[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return [pageIndex + 1, search, nicho];
  };

  // para garantir caching no lado do cliente
  const { data, size, setSize, isValidating } = useSWRInfinite(
    getPayload,
    fetcher
  );

  const brands = data ? data.flat() : [];
  const hasMore = !data || (data[size - 1]?.length === 10);

  return (
    <div className="w-full mb-4 sm:max-h-[71vh] max-h-[44vh] overflow-x-auto scrollbar">
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {brands.map((brand) => (
            <button key={brand.id} onClick={() => router.push(`/panel/brands/${brand.id}`)}>
              <div className="rounded overflow-hidden shadow-lg hover:shadow-custom  transition-all group bg-card border">
                <div className="h-32 flex flex-col justify-center gap-2 items-center">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{brand.nome}</h3>
                  <p className='px-2 h-12 text-muted-foreground text-xs max-w-64 sm:max-w-90 line-clamp-3 text-center'>{brand.descricao}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

      }

      <InfiniteScroll
        hasMore={hasMore}
        isLoading={isValidating}
        next={() => setSize(size + 1)}
        threshold={0}
      >
        {hasMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <div className='sm:w-full w-[100vmax] h-32 rounded bg-secondary animate-pulse'></div>
            <div className='sm:w-full w-[100vmax] h-32 rounded bg-secondary animate-pulse'></div>
          </div>
        )}
        {isValidating && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-2">
            <div className='sm:w-full w-[100vmax] h-32 rounded bg-secondary animate-pulse'></div>
            <div className='sm:w-full w-[100vmax] h-32 rounded bg-secondary animate-pulse'></div>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
