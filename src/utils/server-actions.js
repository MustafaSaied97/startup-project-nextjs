'use server';

import { redirect } from '@/navigation';

export async function navigate() {
  redirect(`/`);
}
