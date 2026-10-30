import { signIn, signUp } from '@/app/actions';
import { redirect } from 'next/navigation';
export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string; aviso?: string }> }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) redirect('/configuracao');
  const params = await searchParams;
  return <main className="auth panel"><div className="brand">SDV <span>ACCESS</span></div><p className="muted">Santa Rita · Acesso administrativo</p>
  {params.erro && <div className="notice">Não foi possível concluir a operação. Verifique seus dados.</div>}
  {params.aviso && <div className="notice">Confira seu e-mail para confirmar o cadastro, se a confirmação estiver habilitada.</div>}
  <form><label>E-mail<input className="field" name="email" type="email" autoComplete="email" required /></label>
  <label>Senha<input className="field" name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
  <button className="primary" formAction={signIn}>Entrar</button><p className="muted">Primeiro acesso?</p>
  <button className="secondary" formAction={signUp}>Criar conta de teste</button></form>
  <p className="muted" style={{fontSize:12}}>Ambiente independente. Não utilizar dados reais até validar segurança e permissões.</p></main>;
}
