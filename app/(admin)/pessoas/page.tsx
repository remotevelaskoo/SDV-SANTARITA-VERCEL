import { createPerson } from '@/app/actions';
import { supabase } from '@/lib/supabase';
export default async function People() {
 const db=await supabase(); const {data,error}=await db.from('people').select('id,name,category').order('created_at',{ascending:false}).limit(100);
 return <><h1>Pessoas</h1><p className="muted">Moradores, visitantes e prestadores</p><section className="panel"><h2>Novo cadastro</h2><form action={createPerson} className="form"><input className="field" name="name" placeholder="Nome completo" maxLength={120} required/><select className="field" name="category"><option value="morador">Morador</option><option value="visitante">Visitante</option><option value="prestador">Prestador</option></select><button className="primary">Cadastrar</button></form></section>
 <section className="panel"><h2>Pessoas cadastradas</h2>{error?<p>Erro ao consultar banco de dados.</p>:<table className="table"><thead><tr><th>Nome</th><th>Categoria</th></tr></thead><tbody>{(data||[]).map(x=><tr key={x.id}><td>{x.name}</td><td>{x.category}</td></tr>)}</tbody></table>}</section></>;
}
