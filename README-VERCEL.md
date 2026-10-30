# SDV Access — Santa Rita (Vercel)
Nova implementação independente, inspirada nos fluxos do SDV-SANTARITA original. **Não é uma cópia do Laravel.**

## Stack
Next.js 15 (App Router), React 19, TypeScript, Supabase Auth e PostgreSQL com Row Level Security.

## Escopo implementado
- Login e criação de conta de teste via Supabase Auth
- Dashboard com contagens reais do banco
- Cadastro e consulta de imóveis
- Cadastro e consulta de pessoas
- Registro manual e histórico de entradas/saídas
- Isolamento por usuário no banco (RLS)

## Como executar
1. Crie um projeto Supabase de **teste**, separado da operação atual.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Configure as variáveis de `.env.example` em `.env.local`.
4. `npm install && npm run dev`
5. Na Vercel, importe este repositório como Next.js e configure as mesmas variáveis.
6. Configure o Supabase Auth (Site URL / Redirect URLs) para o domínio de produção.

## Segurança e limites
**Protótipo funcional para desenvolvimento, NÃO sistema de portaria pronto para produção.**
Não use dados pessoais reais, documentos, imagens faciais ou senhas de equipamentos.
Não há gestão de implantações, RBAC, auditoria imutável, aprovação de visitantes, relação pessoa-imóvel, filas, LGPD operacional nem integração física.
Os dados são isolados por usuário, não compartilhados entre operadores.
Desative a criação pública de contas no Supabase Auth antes de disponibilizar a terceiros.
Portões, câmeras e terminais permanecem sem integração.
O Laravel original não é alterado.

## Próximos módulos
Implantações e equipes; perfis/permissões; vínculo imóvel-pessoa; veículos; pré-cadastro com aprovação; encomendas; relatórios; auditoria; serviço local para equipamentos com operação offline.
