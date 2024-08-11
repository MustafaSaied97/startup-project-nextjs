'use client';
import React, { useEffect, useRef, useState } from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
// import { getTheme } from '@table-library/react-table-library/baseline';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

import { useSort } from '@table-library/react-table-library/sort';
import { HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect } from '@table-library/react-table-library/select';
import { usePagination } from '@table-library/react-table-library/pagination';
import { ArrowIcon, SpinnerIcon } from '@/assets/icons/components';
import { NoResultsFound } from '@/components';
import { useTranslations } from 'next-intl';
import { debounceFunc } from '@/utils';

export default function PanelTable({
  id,
  isLoading,
  updateTable = () => {},
  columnsData = [],
  resData = {},
  rowsData = [],
  isSearchable = false,
  isPagination = false,
  placeholder,
  getSelectedItems = () => {},
}) {
  const t = useTranslations();

  //rows;
  let data = { nodes: [...rowsData] };
  const [isMounting, setIsMounting] = useState(true);
  useEffect(() => {
    setIsMounting(false);
  }, []);
  //columns
  const COLUMNS = [...columnsData];
  //styling
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    // horizontalSpacing: 1,
    // verticalSpacing: 1,
    striped: false,
    highlightOnHover: true,
  });
  // --data-table-library_grid-template-columns:  200px repeat(${COLUMNS[0]?.select ? COLUMNS.length : COLUMNS.length - 1}, minmax(min-content, 1fr));

  const theme = useTheme([
    materialTheme,
    {
      Table: `
             --data-table-library_grid-template-columns: ${COLUMNS[0]?.select ? `100px repeat(${COLUMNS.length}` : `repeat(${COLUMNS.length} `}  , minmax(min-content, 1fr));

        margin: 16px 10px;
        overflow-y: visible;
        overflow-x: auto;

      `,
      Cell: `
      padding:10px;
      `,
      HeaderCell: `
      padding:10px;
      text-align:center;
    `,
      HeaderRow: `
      color: var(--pr-text);
      background-color: var(--panel-bg-4) ;
    `,
      Row: `
      color: var(--pr-text);
      &:nth-of-type(odd) {
        background-color: var(--panel-bg-4); 
      }
      &:nth-of-type(even) {
        background-color: var(--panel-bg-4); 
      }

      &:hover{
      // cursor:pointer;
      background-color: #9898985e ;
      }
      &.tr.tr-body.row-select.row-select-selected {
        background-color: #9898985e;
        border-bottom: 1px solid #bddffd;
      }
    `,
      BaseCell: `
        &:last-child {
          // left: 0px;
        }
        &>div {
          overflow: visible;
        }
      `,
    },
  ]);

  //pagination
  // const pagination = usePagination(data, {
  //   state: {
  //     page: 1,
  //     size: 5,
  //   },
  //   onChange: onPaginationChange,
  // });
  // function onPaginationChange(action, state) {
  //   updateTable({ pagination: state });
  // }

  //select
  const select = useRowSelect(
    data,
    {
      onChange: onSelectChange,
    },
    {
      // rowSelect: SelectTypes.MultiSelect,
      clickType: SelectClickTypes.ButtonClick,

      // buttonSelect: SelectTypes.MultiSelect,
      // isPartialToAll: true,
      isCarryForward: true,
    }
  );
  function onSelectChange(action, state) {
    const selectedId = action?.payload?.id || null;
    const selectedIds = state?.ids || [];
    const selectedRows = selectedIds.map((selectedId) => rowsData.find((row) => row.id == selectedId));
    getSelectedItems(selectedRows);
  }
  //sort
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconUp: <ArrowIcon className='' />,
        iconDown: <ArrowIcon className='rotate-180' />,
        iconDefault: (
          <>
            <ArrowIcon className='w-4 rotate-180' />
            <ArrowIcon className='w-4 ' />
          </>
        ),
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );
  function onSortChange(action, state) {
    updateTable({ sort: state });
  }

  //search by name or type inside nodes
  // const [search, setSearch] = useState('');
  const onSearch = (event) => {
    debounceFunc(() => {
      updateTable({ search: event.target.value });
    }, 1500)();
    // setSearch(event.target.value);
  };
  // data = {
  //   nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.type.toLowerCase().includes(search.toLowerCase())),
  // };

  return (
    <section className='relative m-1 flex flex-col gap-3  p-1 shadow-md dark:shadow-[#0000004f]'>
      {isSearchable && (
        <div className='relative mx-auto w-full'>
          <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
            <svg className='h-4 w-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input
            type='search'
            // value={search}
            onChange={onSearch}
            id='default-search'
            className='block w-full rounded-sm border border-gray-300 p-3  ps-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder={placeholder || t('panel.popups.actions.search')}
            required
          />
        </div>
      )}
      <section className='relative'>
        {isLoading && !rowsData.length ? (
          <div className='absolute z-10 grid h-full w-full place-items-center bg-gray-100/10	 backdrop-blur-[2px]'>
            <SpinnerIcon />
          </div>
        ) : !isLoading && rowsData.length ? (
          <CompactTable
            theme={theme}
            layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
            columns={COLUMNS}
            data={data}
            sort={sort}
            select={select}
            // pagination={isPagination ? pagination : null}
          />
        ) : !isLoading && !rowsData.length && !isMounting ? (
          <section className=' mb-8'>
            <NoResultsFound />
          </section>
        ) : (
          ''
        )}
      </section>

      {isPagination && <TablePagination data={data} updateTable={updateTable} resData={resData} />}
    </section>
  );
}
function TablePagination({ updateTable, data, resData }) {
  const { current_page, per_page, pages_total, item_count } = resData;
  const onPrevPage = () => {
    updateTable({
      pagination: {
        page: current_page - 1,
        size: per_page,
      },
    });
  };
  const onNextPage = () => {
    updateTable({
      pagination: {
        page: current_page + 1,
        size: per_page,
      },
    });
  };

  const updatePageSize = (e) => {
    updateTable({
      pagination: {
        page: 1,
        size: e.target.value,
      },
    });
  };
  return (
    <section className='flex flex-wrap items-center justify-center gap-1'>
      <nav className='flex items-center gap-x-1'>
        <button
          disabled={current_page == 1}
          onClick={onPrevPage}
          type='button'
          className='inline-flex min-h-[32px] min-w-8 items-center justify-center gap-x-2 rounded-lg px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 rtl:rotate-180'
        >
          <svg
            className='size-3.5 flex-shrink-0'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6' />
          </svg>
        </button>
        <div className='flex items-center gap-x-1'>
          <span className='flex min-h-[32px] min-w-8 items-center justify-center rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-800 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:bg-gray-800'>
            {current_page}
          </span>
          <span className='flex min-h-[32px] items-center justify-center px-1.5 py-1.5 text-sm text-gray-500 dark:text-gray-500'>of</span>
          <span className='flex min-h-[32px] items-center justify-center px-1.5 py-1.5 text-sm text-gray-500 dark:text-gray-500'>{pages_total}</span>
        </div>
        <button
          disabled={current_page >= pages_total}
          onClick={onNextPage}
          type='button'
          className='inline-flex min-h-[32px] min-w-8 items-center justify-center gap-x-2 rounded-lg px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 rtl:rotate-180'
        >
          <svg
            className='size-3.5 flex-shrink-0'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        </button>
      </nav>
      <div className='flex items-center space-x-2 rtl:space-x-reverse'>
        <span className='text-sm font-medium dark:text-white'>per page</span>
        <select
          value={per_page}
          onChange={updatePageSize}
          className=' h-6  cursor-pointer rounded-lg border-gray-100 bg-white pe-1 text-sm leading-none shadow-sm outline-none transition duration-75 focus:ring-1 focus:ring-inset dark:border-gray-600 dark:bg-gray-700 dark:text-white'
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
    </section>
  );
}
