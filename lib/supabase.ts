import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function supabase() {
  const store = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return createServerClient(url, key, {
    cookies: {
      getAll() { return store.getAll(); },
      setAll(items) { try { items.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* Server Component: refresh middleware handles cookie updates */ } }
    }
  });
}
