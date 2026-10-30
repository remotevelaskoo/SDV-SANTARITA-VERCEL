'use server';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
async function current() {
  const db = await supabase();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect('/entrar');
  return { db, user };
}
export async function signIn(form: FormData) {
  const db = await supabase();
  const { error } = await db.auth.signInWithPassword({ email: String(form.get('email') || ''), password: String(form.get('password') || '') });
  if (error) redirect('/entrar?erro=credenciais');
  redirect('/');
}
export async function signUp(form: FormData) {
  const db = await supabase();
  const { error } = await db.auth.signUp({ email: String(form.get('email') || ''), password: String(form.get('password') || '') });
  if (error) redirect('/entrar?erro=cadastro');
  redirect('/entrar?aviso=confirmacao');
}
export async function signOut() { const db = await supabase(); await db.auth.signOut(); redirect('/entrar'); }
export async function createProperty(form: FormData) {
  const { db, user } = await current();
  const name = String(form.get('name') || '').trim().slice(0,120);
  if (!name) redirect('/imoveis?erro=nome');
  const { error } = await db.from('properties').insert({ name, block: String(form.get('block') || '').slice(0,60), owner_id: user.id });
  if (error) redirect('/imoveis?erro=salvar');
  redirect('/imoveis');
}
export async function createPerson(form: FormData) {
  const { db, user } = await current();
  const name = String(form.get('name') || '').trim().slice(0,120);
  if (!name) redirect('/pessoas?erro=nome');
  const { error } = await db.from('people').insert({ name, category: String(form.get('category') || 'morador'), owner_id: user.id });
  if (error) redirect('/pessoas?erro=salvar');
  redirect('/pessoas');
}
export async function registerAccess(form: FormData) {
  const { db, user } = await current();
  const person = String(form.get('person_name') || '').trim().slice(0,120);
  if (!person) redirect('/acessos?erro=nome');
  const direction = form.get('direction') === 'saida' ? 'saida' : 'entrada';
  const { error } = await db.from('access_events').insert({ person_name: person, direction, owner_id: user.id });
  if (error) redirect('/acessos?erro=salvar');
  redirect('/acessos');
}
