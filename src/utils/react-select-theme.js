export function reactSelectDarkTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#80808040',
      // primary: 'black',
      neutral0: '#212121', //menue background
      neutral5: 'white',
      neutral10: '#646161', //chip bg-color
      // neutral20:'white',
      // neutral30:'white',
      // neutral40:'white',
      // neutral50:'white',
      // neutral60:'white',
      // neutral70:'white',
      neutral80: 'white', //selected option text
      // neutral90:'white',
    },
  };
}
