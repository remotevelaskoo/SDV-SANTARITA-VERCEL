# Evolução SDV Santa Rita Vercel

## Entregue em código
- Estrutura Next.js com autenticação Supabase e RLS por usuário.
- Dashboard, imóveis, pessoas e entradas/saídas manuais.
- Veículos com placa, modelo e vínculo opcional com imóvel.
- Encomendas com recebimento, destinatário, imóvel e baixa de entrega.

## Pendente antes de qualquer operação real
- Rodar `npm install && npm run build` e testes automatizados em ambiente conectado.
- Criar projeto Supabase de homologação, executar `supabase/schema.sql` (novo projeto) OU migração `supabase/migrations/20261030_vehicles_packages.sql` (projeto existente).
- Importar repositório na Vercel e configurar as variáveis.
- Implementar RBAC por implantação, múltiplos operadores, auditoria, vínculos pessoa-imóvel e autorização de visitantes.
- Desativar criação pública de contas antes de expor o sistema.
- Realizar análise LGPD, gestão de dados pessoais, logs, backups, segurança e testes de concorrência.
- Equipamentos e portões: serviço local independente, com operação offline e homologação.
