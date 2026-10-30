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

export async function createVehicle(form: FormData) {
  const { db, user } = await current();
  const plate = String(form.get('plate') || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const model = String(form.get('model') || '').trim().slice(0,100);
  const propertyId = String(form.get('property_id') || '');
  if (!/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(plate) || !model) redirect('/veiculos?erro=dados');
  if (propertyId) {
    const { data } = await db.from('properties').select('id').eq('id',propertyId).single();
    if (!data) redirect('/veiculos?erro=imovel');
  }
  const { error } = await db.from('vehicles').insert({ owner_id:user.id, plate, model, property_id:propertyId || null });
  if (error) redirect('/veiculos?erro=salvar');
  redirect('/veiculos');
}
export async function createPackage(form: FormData) {
  const { db, user } = await current();
  const description = String(form.get('description') || '').trim().slice(0,180);
  const recipient = String(form.get('recipient') || '').trim().slice(0,120);
  const propertyId = String(form.get('property_id') || '');
  if (!description || !recipient || !propertyId) redirect('/encomendas?erro=dados');
  const { data } = await db.from('properties').select('id').eq('id',propertyId).single();
  if (!data) redirect('/encomendas?erro=imovel');
  const { error } = await db.from('packages').insert({ owner_id:user.id, property_id:propertyId, description, recipient });
  if (error) redirect('/encomendas?erro=salvar');
  redirect('/encomendas');
}
export async function deliverPackage(form: FormData) {
  const { db } = await current();
  const id = String(form.get('id') || '');
  if (!/^[a-f0-9-]{36}$/i.test(id)) redirect('/encomendas?erro=dados');
  const { error } = await db.from('packages').update({ status:'entregue', delivered_at:new Date().toISOString() }).eq('id',id).eq('status','recebida');
  if (error) redirect('/encomendas?erro=salvar');
  redirect('/encomendas');
}
