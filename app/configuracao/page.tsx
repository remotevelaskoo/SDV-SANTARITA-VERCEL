export const dynamic = 'force-dynamic';
export default function Setup() {
  return <main className="auth panel" style={{maxWidth:650}}>
    <div className="brand">SDV <span>ACCESS</span></div>
    <h1>Configuração pendente</h1>
    <p className="muted">A aplicação está publicada, mas a conexão com o banco de dados de testes ainda não foi configurada.</p>
    <div className="notice">Este ambiente não está pronto para operar a portaria. Não utilize dados reais.</div>
    <h2>Próximas etapas</h2>
    <ol><li>Crie um projeto de testes no Supabase.</li>
    <li>Execute o arquivo <code>supabase/schema.sql</code> no SQL Editor do Supabase.</li>
    <li>Na Vercel, abra Settings → Environment Variables e adicione <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
    <li>Crie uma nova implantação para aplicar as variáveis.</li></ol>
    <p className="muted">As credenciais devem ser cadastradas somente no painel da Vercel. Não as envie pelo chat.</p>
  </main>;
}
