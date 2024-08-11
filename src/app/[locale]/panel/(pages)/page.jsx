'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import useRequest from '@/hooks/useRequest';
import { panelApis } from '@/services/apis';
import { getTodayHours, getCurrentMonthDays } from '@/utils';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: {
      min: 0,
    },
  },
};
export default function DashboardPage() {
  const { role } = useSelector((state) => state.auth.authData);

  const t = useTranslations();
  const [timePeriod, setTimePeriod] = useState('year'); //today,month,year
  const { resData, isLoading } = useRequest({ queryFn: panelApis.getDashBoard, queryKey: 'getDashBoard' });
  const chartDataObj = {
    today: {
      title: t('panel.dashboard.today'),
      labels: getTodayHours(), //x-axis
      ordersCurve: resData?.data?.charts?.orders_chart?.today || [],
      profitsCurve: resData?.data?.charts?.profits_chart?.today || [],
    },
    month: {
      title: t('panel.dashboard.month'),
      labels: getCurrentMonthDays(), //x-axis
      ordersCurve: resData?.data?.charts?.orders_chart?.month || [],
      profitsCurve: resData?.data?.charts?.profits_chart?.month || [],
    },
    year: {
      title: t('panel.dashboard.year'),
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], //x-axis
      ordersCurve: resData?.data?.charts?.orders_chart?.year || [],
      profitsCurve: resData?.data?.charts?.profits_chart?.year || [],
    },
  };
  const ChartData = {
    labels: chartDataObj[timePeriod].labels,
    datasets: [
      {
        label: t('panel.dashboard.orders'),
        data: chartDataObj[timePeriod].ordersCurve, //after label and dataset eachpoint (x-axis=label[index] ,y-axis=data[index])
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const statisticData = [

    {
      key: 'orders_count',
      title: t('panel.dashboard.product_orders'),
      number: resData?.data?.orders_count,
      icon: () => (
        <div className='rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-blue-500 dark:text-blue-100'>
          <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z'
            />
          </svg>
        </div>
      ),
    },
    {
      key: 'products_count',
      title: t('panel.dashboard.products'),
      number: resData?.data?.products_count,
      icon: () => (
        <div className='rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500 dark:text-red-100'>
          <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z'
            />
          </svg>
        </div>
      ),
    },
    {
      key: 'accepted_orders_count',
      title: t('panel.dashboard.accepted_orders'),
      number: resData?.data?.accepted_orders_count,
      icon: () => (
        <div className='rounded-full bg-green-100 p-3 text-green-500 dark:bg-green-500 dark:text-green-100'>
          <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z'
            />
          </svg>
        </div>
      ),
    },
    
  ];

  role == 'reseller' && statisticData.push(
    {
      key: 'reseller_profit',
      title: t('panel.dashboard.profit'),
      number: resData?.data?.reseller_profit,
      icon: () => (
        <div className='rounded-full bg-purple-100 p-3 text-purple-500 dark:bg-purple-500 dark:text-purple-100'>
          <svg className='w-6' width='{20}' height='{20}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.052 1.25H11.948C11.0495 1.24997 10.3003 1.24995 9.70552 1.32991C9.07773 1.41432 8.51093 1.59999 8.05546 2.05546C7.59999 2.51093 7.41432 3.07773 7.32991 3.70552C7.27259 4.13189 7.25637 5.15147 7.25179 6.02566C5.22954 6.09171 4.01536 6.32778 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34314 22 6.22876 22 9.99998 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14C22 10.2288 22 8.34315 20.8284 7.17157C19.9846 6.32778 18.7705 6.09171 16.7482 6.02566C16.7436 5.15147 16.7274 4.13189 16.6701 3.70552C16.5857 3.07773 16.4 2.51093 15.9445 2.05546C15.4891 1.59999 14.9223 1.41432 14.2945 1.32991C13.6997 1.24995 12.9505 1.24997 12.052 1.25ZM15.2479 6.00188C15.2434 5.15523 15.229 4.24407 15.1835 3.9054C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24644 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.9054C8.771 4.24407 8.75661 5.15523 8.75208 6.00188C9.1435 6 9.55885 6 10 6H14C14.4412 6 14.8565 6 15.2479 6.00188ZM12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V10.0102C13.8388 10.2845 14.75 11.143 14.75 12.3333C14.75 12.7475 14.4142 13.0833 14 13.0833C13.5858 13.0833 13.25 12.7475 13.25 12.3333C13.25 11.9493 12.8242 11.4167 12 11.4167C11.1758 11.4167 10.75 11.9493 10.75 12.3333C10.75 12.7174 11.1758 13.25 12 13.25C13.3849 13.25 14.75 14.2098 14.75 15.6667C14.75 16.857 13.8388 17.7155 12.75 17.9898V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.9898C10.1612 17.7155 9.25 16.857 9.25 15.6667C9.25 15.2525 9.58579 14.9167 10 14.9167C10.4142 14.9167 10.75 15.2525 10.75 15.6667C10.75 16.0507 11.1758 16.5833 12 16.5833C12.8242 16.5833 13.25 16.0507 13.25 15.6667C13.25 15.2826 12.8242 14.75 12 14.75C10.6151 14.75 9.25 13.7903 9.25 12.3333C9.25 11.143 10.1612 10.2845 11.25 10.0102V10C11.25 9.58579 11.5858 9.25 12 9.25Z'
              fill='currentColor'
            />
          </svg>
        </div>
      ),
      }
  )
  role == 'admin' && statisticData.push(
  {
    key: 'stores_count',
    title: t('panel.dashboard.stores'),
    number: resData?.data?.stores_count,
    icon: () => (
      <div className='rounded-full bg-orange-100 p-3 text-orange-500 dark:bg-orange-500 dark:text-orange-100'>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M1 10c.41.29.96.43 1.5.43c.55 0 1.09-.14 1.5-.43c.62-.46 1-1.17 1-2c0 .83.37 1.54 1 2c.41.29.96.43 1.5.43c.55 0 1.09-.14 1.5-.43c.62-.46 1-1.17 1-2c0 .83.37 1.54 1 2c.41.29.96.43 1.51.43c.54 0 1.08-.14 1.49-.43c.62-.46 1-1.17 1-2c0 .83.37 1.54 1 2c.41.29.96.43 1.5.43c.55 0 1.09-.14 1.5-.43c.63-.46 1-1.17 1-2V7l-3-7H4L0 7v1c0 .83.37 1.54 1 2zm2 8.99h5v-5h4v5h5v-7c-.37-.05-.72-.22-1-.43c-.63-.45-1-.73-1-1.56c0 .83-.38 1.11-1 1.56c-.41.3-.95.43-1.49.44c-.55 0-1.1-.14-1.51-.44c-.63-.45-1-.73-1-1.56c0 .83-.38 1.11-1 1.56c-.41.3-.95.43-1.5.44c-.54 0-1.09-.14-1.5-.44c-.63-.45-1-.73-1-1.57c0 .84-.38 1.12-1 1.57c-.29.21-.63.38-1 .44v6.99z'
          />
        </svg>
      </div>
    ),
  },
  )


  return (
    <section className='flex w-full flex-col gap-20'>
      <article>
        <h1 className="relative mb-6 border-b text-lg font-bold text-gray-400 after:absolute after:bottom-0  after:start-0 after:h-[2px] after:w-[20px] after:rounded-sm   after:bg-rose-500 after:content-['']    sm:text-2xl">
          {t('panel.dashboard.statistics')}
        </h1>
        <div className=' grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {statisticData.map((statistic, i) => (
            <div key={i} className='shadow-xs  flex items-center gap-4 overflow-hidden rounded-lg bg-white px-4 py-6 shadow-md transition-all duration-300  hover:shadow-xl dark:bg-gray-800 '>
              <statistic.icon />
              <div>
                <p className='mb-2 text-sm font-medium capitalize text-gray-600 dark:text-gray-400'>{statistic.title}</p>
                <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>{statistic.number}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article>
        <h1 className="relative mb-6 border-b text-lg font-bold text-gray-400 after:absolute  after:bottom-0 after:start-0 after:h-[2px] after:w-[20px] after:rounded-sm   after:bg-rose-500 after:content-['']    sm:text-2xl">
          {t('panel.dashboard.analytics')}
        </h1>
        <article className='w-full rounded-lg border border-gray-200 bg-gray-200/10 p-6 shadow-md dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div>
              <svg className='h-7 w-7 fill-primary' xmlns='http://www.w3.org/2000/svg' width={22} height={22} viewBox='0 0 24 24'>
                <path d='M6 21H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1z' />
              </svg>
            </div>
            <div className='rounded border border-[#161E22] p-1 dark:border-gray-600'>
              {Object.entries(chartDataObj).map(([objKey, objVal], index) => (
                <button
                  key={index}
                  onClick={() => setTimePeriod(objKey)}
                  className={`rounded border-none px-4 py-1 text-[.875rem] font-bold hover:bg-slate-600/10 ${timePeriod === objKey ? 'bg-slate-600/10' : ''}`}
                >
                  {objVal.title}
                </button>
              ))}
            </div>
          </div>
          <Line options={chartOptions} data={ChartData} />
        </article>
      </article>
    </section>
  );
}
