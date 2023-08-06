<h1 align="center">Google Sheets como base de dados com Node.js <br><i>(Google Sheets as a Database with Node.js) - public server</i></h1>
 <p align="center"><a href="https://databaseserver-production-3e5c.up.railway.app/"><i>Acessar projeto</i></a></p>
 
<p align="center">O projeto consiste em diminuir demandas de e-mails de fornecedores que buscam informações sobre status de empenhos (liquidação e pagamento). O objetivo é utilizar a programação para fornecer acesso à informações via um buscador. A solução encontrada foi utilizar a base de dados já em uso que é a Planilha Google Sheets do Drive. O acesso se deu, em fase inicial, via servidor local (<a href="https://github.com/RenataVerasVenturim/Google_Sheets_as_Database_local_server">veja o projeto aqui</a>) utilizando npm express do node.js e autenticação do Google Cloud. Outra npm utilizada foi a googleapis. Após os teste em servidor local, colocamos em produção no public server do Railway.</p>

<h2>Interface do usuário (HTML e CSS)</h2>
<p align="center"><img src="https://github.com/RenataVerasVenturim/Google_Sheets_as_Database/assets/129551549/bb5afb31-83ba-4f5f-ad16-e93f1196db17">
</p>

<h2>Pré-requisitos:</h2>
<ul>
<li>VS CODE
<li>Google Cloud
<li>Node.js
<li>Planilha sheets no Drive
<li>Github
<li>Railway
</ul>

<h2>Autenticações do Google Cloud</h2>
<p>
 O primeiro ponto é realizar a criação da conta de serviço e fornecer as autenticações e acessos à planilha sheets. O arquivo .json com chaves deverá ser guardado em segurança e os códigos serão utilizados na variável de ambiente do Railway quando realizar o deploy do projeto.
</p>


 <h2>Instalação - Terminal</h2>
<ul>
  <li>npm install</li>
  <li>npm init -y //criar package.json (se não baixou todo o projeto) </li> 
  <li> npm i express // instalar npm express para criar servidor</li>
  <li>npm i googleapis // instalar npm googleapis</li>
  <li> npm i fs //instalar npm fs para conversão da response json em html</li>
  <li>npm i nodemon //optativo. utilizei para agilizar o desenvolvimento</li>
  <li>npx nodemon index.js //o nodemon é para resetar o servidor local de forma contínua (agilizou o desenvolvimento do projeto).</li>
</ul>

<h2> Deploy no public server - Railway </h2>
<p>
 Não esqueça de incluir as chaves na variável de ambiente do Railway
</p>
<p>
 <img src= "https://github.com/RenataVerasVenturim/Data_base_server/assets/129551549/102b4899-6b44-4be8-a2a1-200dbceadd90" alt="variável de ambiente-railway">
(Variável de ambiente - Railway)
</p>

<ol>
<li>Acessar sua conta Railway</li>
<li>New Project</li>
<li>Deploy from github</li>
<li>Escolher repository criado no Github</li>
<li>Deploy now</li>
<li>Clicar no projeto criado no railway</li>
<li>Ver, em Deployments, o carregamento até finalizar.</li>
<li>Ir em Settings> clicar em "criar domain". </li>
<li>Pronto. Agora você tem o site de acesso ao projeto.</li>
 
</ol>

<h2>Funcionamento</h2>
<p align="center"><img src="https://github.com/RenataVerasVenturim/Data_base_server/assets/129551549/ec491d83-ab81-49d3-8009-2e1ab738f93c">
</p>
<p>Input do usuário via form do html recebido pelo servidor público (Railway), autenticação no Google Cloud e resposta json renderizada em um html com dados de toda a linha da planilha. Backend em Node.js e Frontend em html e css e javascripts</p>
<p><img src="https://media2.giphy.com/media/pyHhg54LZ0WC9JQLoo/giphy.gif" alt="Projeto da Renata"></p>

<h2>Resposta ao usuário - HTML</h2>
<img src="https://github.com/RenataVerasVenturim/Google_Sheets_as_Database/assets/129551549/75b8e02b-845f-4b85-9889-4e2f1b32dbee">


