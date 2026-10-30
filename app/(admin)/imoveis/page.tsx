import { createProperty } from '@/app/actions';
import { supabase } from '@/lib/supabase';
export default async function Properties() {
 const db=await supabase(); const {data, error}=await db.from('properties').select('id,name,block,created_at').order('created_at',{ascending:false}).limit(100);
 return <><h1>Imóveis</h1><p className="muted">Cadastro de unidades e lotes</p><section className="panel"><h2>Novo imóvel</h2><form action={createProperty} className="form"><input className="field" name="name" placeholder="Identificação do imóvel" required maxLength={120}/><input className="field" name="block" placeholder="Quadra / bloco" maxLength={60}/><button className="primary">Cadastrar</button></form></section>
 <section className="panel"><h2>Imóveis cadastrados</h2>{error?<p>Erro ao consultar banco de dados.</p>:<table className="table"><thead><tr><th>Imóvel</th><th>Quadra / bloco</th></tr></thead><tbody>{(data||[]).map(x=><tr key={x.id}><td>{x.name}</td><td>{x.block||'—'}</td></tr>)}</tbody></table>}</section></>;
}
