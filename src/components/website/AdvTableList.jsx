'use client';
import React, { useEffect } from 'react';
import { apis } from '@/services/apis';
import { useTranslations } from 'next-intl';
import useCachedRequest from '@/hooks/useCachedRequest';
import useLocale from '@/hooks/useLocale';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Pagination, Table } from '../ui';
export default function AdvTableList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const { locale } = useLocale();
  const { resData: ProductsRes, isLoading, fetchData } = useCachedRequest({ queryFn: apis.getProducts, queryKey: 'getProducts' });

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') ?? 1);
    (!ProductsRes || currentPage != ProductsRes?.current_page) && fetchData({ page: currentPage });
  }, [searchParams, ProductsRes?.current_page]);

  const headers = [
    { field: 'id', label: <span className='!text-yellow-500'>Order ID</span> },
    { field: 'status', label: 'Status' },
    { field: 'date', label: 'Date' },
    { field: 'total', label: 'Total' },
    { field: 'quantity', label: 'Quantity' },
  ];

  const rows = [
    { id: '1', status: 'Shipped', date: '2023-09-01', total: '100', quantity: '2' },
    { id: '2', status: 'Pending', date: '2023-09-02', total: '200', quantity: '4' },
  ];
  return (
    <>
      <Table>
        <Table.Header>
          <Table.HeaderRow>
            {headers.map((header) => (
              <Table.HeaderCell key={header.field}>{header.label}</Table.HeaderCell>
            ))}
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              {headers.map((header) => (
                <Table.Cell key={header.field} header={header.label}>
                  {row[header.field]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        currentPage={ProductsRes?.current_page}
        totalPages={ProductsRes?.pages_total}
        onPageChange={(newPage) => {
          router.push(`/?page=${newPage}`);
        }}
        isBlockPageChange={isLoading}
      />
    </>
  );
}
