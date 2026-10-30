import { createPackage, deliverPackage } from '@/app/actions';
import { supabase } from '@/lib/supabase';
export default async function Packages({searchParams}:{searchParams:Promise<{erro?:string}>}) {
 const db=await supabase();const params=await searchParams;
 const [packages,properties]=await Promise.all([db.from('packages').select('id,description,recipient,property_id,status,created_at').order('created_at',{ascending:false}).limit(100),db.from('properties').select('id,name').order('name')]);
 const names=new Map((properties.data||[]).map(x=>[x.id,x.name]));
 return <><h1>Encomendas</h1><p className="muted">Recebimento e entrega de encomendas na portaria</p>
 {params.erro&&<div className="notice">Não foi possível concluir a operação. Confira os dados.</div>}
 <section className="panel"><h2>Registrar recebimento</h2><form action={createPackage} className="form">
 <input className="field" name="description" placeholder="Descrição da encomenda" required maxLength={180}/>
 <input className="field" name="recipient" placeholder="Destinatário" required maxLength={120}/>
 <select className="field" name="property_id" required><option value="">Selecione o imóvel</option>{(properties.data||[]).map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
 <button className="primary">Receber</button></form></section>
 <section className="panel"><h2>Controle de encomendas</h2>{packages.error?<p>Não foi possível consultar encomendas. Confira a migração do banco.</p>:
 <table className="table"><thead><tr><th>Descrição</th><th>Destinatário</th><th>Imóvel</th><th>Status</th><th>Ação</th></tr></thead><tbody>{(packages.data||[]).map(x=><tr key={x.id}><td>{x.description}</td><td>{x.recipient}</td><td>{names.get(x.property_id)||'—'}</td><td>{x.status}</td><td>{x.status==='recebida'?<form action={deliverPackage}><input type="hidden" name="id" value={x.id}/><button className="secondary">Marcar entregue</button></form>:'—'}</td></tr>)}</tbody></table>}</section></>;
}
