
import React from 'react';
import { cookies } from 'next/headers';
export default function ThemeProvider({ children }) {
const serverTheme = cookies().get('theme')?.value||'light';

  return (
    <section className={serverTheme}>
      {children}
    </section>
  );
}
