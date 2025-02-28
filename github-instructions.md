# Instruções para enviar atualizações para o GitHub

## Pré-requisitos
- Ter o Git instalado no seu computador
- Ter um repositório GitHub já criado para o projeto
- Ter acesso ao repositório (permissões para push)

## Passos para enviar as atualizações

### 1. Inicializar o Git no projeto (se ainda não estiver inicializado)

```bash
git init
```

### 2. Adicionar o repositório remoto (se ainda não estiver configurado)

```bash
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
```

Substitua `seu-usuario` e `seu-repositorio` pelos seus dados reais.

### 3. Adicionar os arquivos modificados

```bash
git add index.html js/supabase.js supabase/migrations/20250228040329_delicate_paper.sql
```

### 4. Fazer o commit das alterações

```bash
git commit -m "Implementa sistema de memórias públicas com controle de administrador"
```

### 5. Enviar as alterações para o GitHub

```bash
git push -u origin main
```

Nota: Se o seu branch principal for chamado de "master" em vez de "main", use:

```bash
git push -u origin master
```

## Solução de problemas comuns

### Se você receber um erro de conflito

1. Primeiro, obtenha as alterações mais recentes do repositório:

```bash
git pull origin main
```

2. Resolva os conflitos manualmente nos arquivos indicados
3. Adicione os arquivos resolvidos:

```bash
git add .
```

4. Continue o processo de merge:

```bash
git commit -m "Resolve conflitos de merge"
```

5. Envie as alterações:

```bash
git push origin main
```

### Se você estiver usando GitHub Desktop

1. Abra o GitHub Desktop
2. Adicione o projeto local (se ainda não estiver adicionado)
3. Faça commit das alterações com uma mensagem descritiva
4. Clique em "Push origin" para enviar as alterações

## Dica para trabalho futuro

Para facilitar atualizações futuras, sempre siga este fluxo:

1. `git pull` para obter as alterações mais recentes
2. Faça suas modificações
3. `git add .` para adicionar todas as alterações
4. `git commit -m "Sua mensagem descritiva"` 
5. `git push` para enviar as alterações