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

  const columns = [
    { key: 'id', header: 'Order ID', renderCell: (row) => `#${row.id}` },
    { key: 'status', header: 'Status', renderCell: (row) => row.status },
    { key: 'date', header: 'Date', renderCell: (row) => row.date },
    { key: 'total', header: 'Total', renderCell: (row) => `$${row.total}` },
    { key: 'quantity', header: 'Quantity', renderCell: (row) => `${row.quantity}x` },
  ];
  const data = [
    { id: 1, status: 'Completed', date: '2024-09-01', total: 100, quantity: 2 },
    { id: 2, status: 'Pending', date: '2024-09-02', total: 150, quantity: 3 },
  ];
  return (
    <>
      <Table>
        <Table.Header>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope='col' className='px-6 py-3 text-start'>
                {column.header}
              </th>
            ))}
          </tr>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((column) => (
                <Table.Cell key={column.key} header={column.header}>
                  {column.renderCell(row)}
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
