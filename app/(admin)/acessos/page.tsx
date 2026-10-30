import { registerAccess } from '@/app/actions';
import { supabase } from '@/lib/supabase';
export default async function Access() {
 const db=await supabase(); const {data,error}=await db.from('access_events').select('id,person_name,direction,created_at').order('created_at',{ascending:false}).limit(100);
 return <><h1>Entradas e saídas</h1><p className="muted">Registro manual de movimentações para homologação</p><section className="panel"><h2>Registrar movimentação</h2><form action={registerAccess} className="form"><input className="field" name="person_name" placeholder="Nome da pessoa" required maxLength={120}/><select className="field" name="direction"><option value="entrada">Entrada</option><option value="saida">Saída</option></select><button className="primary">Registrar</button></form></section>
 <section className="panel"><h2>Histórico recente</h2>{error?<p>Erro ao consultar banco de dados.</p>:<table className="table"><thead><tr><th>Pessoa</th><th>Movimento</th><th>Data</th></tr></thead><tbody>{(data||[]).map(x=><tr key={x.id}><td>{x.person_name}</td><td>{x.direction}</td><td>{new Date(x.created_at).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'})}</td></tr>)}</tbody></table>}</section></>;
}
