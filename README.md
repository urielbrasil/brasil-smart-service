# Brasil Smart Service

Site institucional e painel administrativo da Brasil Smart Service, publicado na Vercel e com área restrita para visualizar e operar bots hospedados na Railway.

## O que o projeto faz

- apresenta a proposta comercial da Brasil Smart Service
- oferece páginas de demonstração, implantação e contato
- protege a rota `/admin` com sessão HTTP-only
- lista bots/serviços conectados ao projeto Railway configurado
- permite criar, reativar e desabilitar bots no ambiente selecionado

## Stack atual

- Next.js 16
- React 19
- Tailwind CSS 4
- Railway GraphQL API para leitura e operação dos serviços

## Variáveis de ambiente

Obrigatórias para login admin:

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

O e-mail de login padrão já é `contato@brasilsmart.com`. Se quiser trocar, defina:

- `ADMIN_LOGIN_EMAIL`

Obrigatórias para integração com Railway:

- `RAILWAY_TOKEN`
- `RAILWAY_PROJECT_ID`

Opcionais:

- `RAILWAY_ENVIRONMENT_ID`
- `RAILWAY_BOT_REPO` padrão: `urielbrasil/brasil-smart-bot`
- `RAILWAY_BOT_BRANCH` padrão: `main`
- `RAILWAY_BOT_SERVICE_PREFIX` para filtrar quais serviços aparecem no painel

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Admin

- Login em `/admin/login`
- Usuário padrão: `contato@brasilsmart.com`
- O painel mostra resumo operacional, status de deploy, health check e links públicos dos serviços Railway

## Melhorias estruturais já consideradas

- autenticação centralizada entre páginas, rotas e `proxy`
- normalização das URLs públicas da Railway antes de health check e navegação
- remoção de componentes admin client-side que estavam sem uso
- documentação alinhada ao produto real, sem boilerplate do create-next-app
