import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// A list of all locales that are supported
export const locales = ['en', 'ar'];
// Used when no locale matchesrouter
export const defaultLocale = 'en';
export const localePrefix = 'never'; //never to hide prefix in url ||always to put prefix always in url ||"as-needed" to remove prefix from url in case that current lang is  deafult lang
//below extra details when switch between two local it will hide it form url
export const localeDetection = true; //true; enable locale detection based on the accept-language header and a potentially existing cookie value from a previous visit. ||false; This will disable locale detection based on the accept-language header and a potentially existing cookie value from a previous visit.

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, defaultLocale, localePrefix, localeDetection });
