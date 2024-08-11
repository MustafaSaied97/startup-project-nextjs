// 'use client';
// import React from 'react';
// import { useSelector } from 'react-redux';

// export default function ThemeProvider({ children }) {
//   const currentTheme = useSelector((state) => state.theme.currentTheme);
//   // const serverTheme = cookies().get('theme').value||'light';
//   return (
//     <section className={currentTheme}>
//       {/* theme: {currentTheme} */}
//       {children}
//     </section>
//   );
// }
import React from 'react';
import { cookies } from 'next/headers';
export default function ThemeProvider({ children }) {
const serverTheme = cookies().get('theme')?.value||'light';

  return (
    <section className={serverTheme}>
      {/* theme: {currentTheme} */}
      {children}
    </section>
  );
}
