'use client';
import { useTranslations } from 'next-intl';
import Select, { components, IndicatorsContainerProps } from 'react-select';
import { reactSelectDarkTheme } from '@/utils/react-select-theme';
import { useSelector } from 'react-redux';

const CustomComponents = {
  // Option: ({ data, innerProps, isDisabled, isSelected }) => {
  //   // console.log('data', data);
  //   // console.log('innerProps', innerProps);
  //   return !isDisabled ? (
  //     <div className={`border-b px-2 py-1 ${isSelected ? 'bg-slate-500' : ''} last:border-0 hover:bg-slate-300`} {...innerProps}>
  //       {data.label}
  //     </div>
  //   ) : null;
  // },

  // SingleValue: ({ data, innerProps, isDisabled, isSelected }) => {
  //   // console.log('data', data);
  //   // console.log('innerProps', innerProps);
  //   return !isDisabled ? <p className={`inline  text-black hover:bg-slate-300`}>{data.label}</p> : null;
  // },
  // ValueContainer: ({ data, innerProps, isDisabled, isSelected, children }) => {
  //   // console.log('data', data);
  //   // console.log('innerProps', innerProps);
  //   return (
  //     <div className={`relative ms-2 flex items-center text-black hover:bg-slate-300`} {...innerProps}>
  //       {children}
  //     </div>
  //   );
  // },
  IndicatorsContainer: (props) => {
    return (
      <div style={props.isDisabled ? { display: 'none' } : {}}>
        <components.IndicatorsContainer {...props} />
      </div>
    );
  },
};

export default function CustomSelect(props) {
  const t = useTranslations();
  const isDark = useSelector((state) => state.theme.currentTheme) == 'dark';
  return (
    <Select
      className='my-react-select-container'
      classNamePrefix='my-react-select'
      theme={isDark ? reactSelectDarkTheme : {}}
      // styles={{
      //   control: (baseStyles, state) => ({
      //     ...baseStyles,
      //     borderColor: errors.country ? 'red' : '',
      //     backgroundColor: errors?.country ? '#f112370d' : '',
      //     padding: '3px 0px',
      //   }),
      // }}
      noOptionsMessage={() => t('nothing_found')}
      components={{ ...CustomComponents }}
      isDisabled={false}
      isLoading={false}
      isClearable={true}
      isRtl={false}
      isSearchable={true}
      {...props}
    />
  );
}
