# Finanças da Casa — gerar o APK pelo celular

Tudo pelo **Chrome do Android**, gratuito. Leva uns 30–40 minutos, uma vez só.
Dica: nos sites do Firebase e do GitHub, se algum botão não aparecer, toque em **⋮ › Site para computador**.

## Passo 0 — Extrair o zip
Abra o app **Arquivos** do celular › Downloads › toque em `financas-app.zip` › **Extrair**. Vai surgir a pasta `financas-app`.

## Passo 1 — Firebase (banco de dados)
1. Acesse **console.firebase.google.com** › **Criar projeto** (ex.: `financas-casa`). Pode desativar o Analytics.
2. Toque no ícone **`</>`** (Web) › dê um apelido › **Registrar app**. Aparece o bloco `firebaseConfig`. **Deixe essa aba aberta**: você vai copiar esses valores no Passo 2.
3. Menu › **Authentication › Vamos começar › Método de login › E-mail/senha** › ativar › Salvar.
4. Menu › **Firestore Database › Criar banco de dados** › região **southamerica-east1** › modo **produção**.
5. Aba **Regras** › apague tudo › cole o conteúdo de `firestore.rules` (abra o arquivo no celular com qualquer editor de texto, ou copie do GitHub depois do Passo 2) › **Publicar**.

## Passo 2 — GitHub (hospedagem)
1. Crie conta em **github.com**. Anote seu nome de usuário.
2. **New repository** › nome **exatamente** `SEU-USUARIO.github.io` (ex.: `joaosilva.github.io`) › **Public** › Create.
3. Toque em **uploading an existing file** › selecione **todos os arquivos** da pasta `financas-app` › **Commit changes**.
   - Se o arquivo `.nojekyll` não aparecer para seleção (arquivos que começam com ponto ficam ocultos): toque em **Add file › Create new file**, nome `.nojekyll`, deixe vazio e salve.
4. Abra o arquivo `firebase-config.js` no GitHub › ícone de lápis ✏️ › troque cada `COLE_AQUI` pelos valores do Firebase (aba que ficou aberta) › **Commit changes**.
5. **Settings › Pages** › Branch **main** › pasta **/(root)** › Save. Em 1–2 minutos o app estará em `https://SEU-USUARIO.github.io`.
6. No Firebase: **Authentication › Configurações › Domínios autorizados › Adicionar** › `SEU-USUARIO.github.io`.

Teste abrindo `https://SEU-USUARIO.github.io` no Chrome: deve aparecer a tela de login.

## Passo 3 — Gerar o APK (PWABuilder)
1. Acesse **pwabuilder.com** › cole `https://SEU-USUARIO.github.io` › **Start**.
2. **Package for stores › Android › Generate package** (pode manter as opções padrão) › baixe o .zip.
3. No app Arquivos, extraia esse zip. Dentro dele:
   - o arquivo **`.apk`** — é o que vocês vão instalar;
   - o arquivo **`assetlinks.json`** — faz o app abrir sem barra de endereço;
   - **`signing.keystore`** e **`signing-key-info.txt`** — **guarde bem** (ex.: no Google Drive). Sem eles não dá para gerar atualizações do mesmo app.
4. No GitHub: **Add file › Create new file** › no nome digite `.well-known/assetlinks.json` (a barra cria a pasta) › cole o conteúdo do `assetlinks.json` › Commit.

## Passo 4 — Instalar
1. Toque no `.apk` › o Android pede para **permitir instalar de fonte desconhecida** (para o app Arquivos/Chrome) › permitir › **Instalar**.
2. Mande o mesmo `.apk` para sua esposa (WhatsApp como documento, ou Google Drive) e ela instala igual.
3. **Você:** crie sua conta › **Criar finanças da casa** › ⚙️ › **Enviar código**.
4. **Ela:** cria a conta dela › cola o código em **Entrar com código**.

Pronto: o que um lança aparece na hora para o outro, e funciona sem internet.

## Dúvidas comuns

- **Aparece "Falta um passo":** o `firebase-config.js` ainda tem `COLE_AQUI`.
- **Erro ao entrar/criar conta:** confira o Passo 1.4 (E-mail/senha ativado) e o Passo 3 (domínio autorizado).
- **"Código inválido ou sem permissão":** confira se as regras do Passo 1.6 foram publicadas e se o código foi colado inteiro.
- **Atualizei os arquivos e o app não mudou:** feche e abra o app duas vezes (ele guarda uma cópia para funcionar offline). Mudanças nos arquivos do GitHub chegam sozinhas no app; não precisa gerar outro APK.
- **App abre com barra de endereço no topo:** o `assetlinks.json` do Passo 3.4 ainda não está no ar, ou o repositório não se chama `SEU-USUARIO.github.io`. Depois de corrigir, desinstale e instale o APK de novo.
- **"App bloqueado pelo Play Protect":** toque em *Mais detalhes › Instalar assim mesmo* (acontece com APKs fora da loja).
- **Segurança:** a `apiKey` do Firebase não é senha, pode ficar pública. Quem protege os dados são as regras: só quem está na casa lê e escreve.
- **Custo:** o plano gratuito do Firebase (Spark) sobra para uso de um casal.
- **Dados da versão anterior:** se usou a primeira versão, baixe o backup lá (Relatórios › Baixar backup completo) e aqui use ⚙️ › Restaurar backup.
