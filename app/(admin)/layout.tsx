import Link from 'next/link';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/app/actions';
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const db = await supabase();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect('/entrar');
  return <div className="shell"><aside className="side"><div className="brand">SDV <span>ACCESS</span></div><nav>
  <Link href="/">Visão geral</Link><Link href="/imoveis">Imóveis</Link><Link href="/pessoas">Pessoas</Link><Link href="/acessos">Entradas e saídas</Link><Link href="/veiculos">Veículos</Link><Link href="/encomendas">Encomendas</Link>
  </nav><p className="muted" style={{fontSize:12,marginTop:35}}>Santa Rita · Ambiente de desenvolvimento</p></aside>
  <main className="main"><header className="top"><span className="muted">{user.email}</span><form action={signOut}><button className="secondary">Sair</button></form></header>{children}</main></div>;
}
