import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// A list of all locales that are supported
export const locales = ['en', 'ar'];
// Used when no locale matchesrouter
export const defaultLocale = 'en';
export const localePrefix = 'never'; //never to hide prefix in url ||always to put prefix always in url ||"as-needed" to remove prefix from url in case that current lang is  deafult lang
//below extra details when switch between two local it will hide it form url
export const localeDetection = true; //forced to put locale in cookies ||false; not put locale in cookies

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, defaultLocale, localePrefix, localeDetection });
