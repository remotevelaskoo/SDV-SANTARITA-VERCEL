import { createVehicle } from '@/app/actions';
import { supabase } from '@/lib/supabase';
export default async function Vehicles({searchParams}:{searchParams:Promise<{erro?:string}>}) {
 const db=await supabase();const params=await searchParams;
 const [vehicles,properties]=await Promise.all([db.from('vehicles').select('id,plate,model,property_id,created_at').order('created_at',{ascending:false}).limit(100),db.from('properties').select('id,name').order('name')]);
 const names=new Map((properties.data||[]).map(x=>[x.id,x.name]));
 return <><h1>Veículos</h1><p className="muted">Controle de veículos por imóvel</p>
 {params.erro&&<div className="notice">Não foi possível salvar. Confira a placa, o imóvel e os dados informados.</div>}
 <section className="panel"><h2>Cadastrar veículo</h2><form action={createVehicle} className="form">
 <input className="field" name="plate" placeholder="Placa (ABC1D23)" required minLength={7} maxLength={8}/>
 <input className="field" name="model" placeholder="Modelo e cor" required maxLength={100}/>
 <select className="field" name="property_id"><option value="">Sem imóvel associado</option>{(properties.data||[]).map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
 <button className="primary">Cadastrar</button></form></section>
 <section className="panel"><h2>Veículos cadastrados</h2>{vehicles.error?<p>Não foi possível consultar os veículos. Confira a migração do banco.</p>:
 <table className="table"><thead><tr><th>Placa</th><th>Modelo</th><th>Imóvel</th></tr></thead><tbody>{(vehicles.data||[]).map(x=><tr key={x.id}><td>{x.plate}</td><td>{x.model}</td><td>{names.get(x.property_id)||'—'}</td></tr>)}</tbody></table>}</section></>;
}
