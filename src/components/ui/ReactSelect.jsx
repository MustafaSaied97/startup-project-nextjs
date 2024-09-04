'use client';
import { useTranslations } from 'next-intl';
import Select, { components } from 'react-select';
import { useSelector } from 'react-redux';

const CustomComponents = {
  IndicatorsContainer: (props) => {
    return (
      <div style={props.isDisabled ? { display: 'none' } : {}}>
        <components.IndicatorsContainer {...props} />
      </div>
    );
  },
};

export default function ReactSelect(props) {
  const t = useTranslations();
  const isDark = useSelector((state) => state.theme.currentTheme) == 'dark';
  const reactSelectDarkTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#80808040',
        neutral0: '#212121', //menue background
        neutral5: 'white',
        neutral10: '#646161', //chip bg-color
        neutral80: 'white', //selected option text
      },
    };
  };
  return (
    <Select
      className='my-react-select-container'
      classNamePrefix='my-react-select'
      theme={isDark ? reactSelectDarkTheme : {}}
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
