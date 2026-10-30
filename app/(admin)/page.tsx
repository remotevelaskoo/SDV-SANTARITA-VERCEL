import Link from 'next/link';
import { supabase } from '@/lib/supabase';
export default async function Dashboard() {
  const db = await supabase();
  const [p, people, access] = await Promise.all([
    db.from('properties').select('*', { count:'exact', head:true }),
    db.from('people').select('*', { count:'exact', head:true }),
    db.from('access_events').select('*', { count:'exact', head:true })
  ]);
  return <><h1>Painel Santa Rita</h1><p className="muted">Gestão de portaria e controle de acesso · Nova plataforma web</p>
  <div className="cards"><div className="card">Imóveis<div className="metric">{p.count ?? '—'}</div></div>
  <div className="card">Pessoas<div className="metric">{people.count ?? '—'}</div></div>
  <div className="card">Registros de acesso<div className="metric">{access.count ?? '—'}</div></div></div>
  <section className="panel"><h2>Operação</h2><p className="muted">Cadastre imóveis e pessoas, depois registre entradas e saídas.</p>
  <div className="form"><Link className="primary" href="/imoveis">Imóveis</Link><Link className="secondary" href="/pessoas">Pessoas</Link><Link className="secondary" href="/acessos">Histórico de acesso</Link></div></section>
  <section className="panel"><h2>Integrações físicas</h2><p className="muted">Abertura de portões, reconhecimento facial e equipamentos estão desabilitados neste ambiente.</p></section></>;
}
