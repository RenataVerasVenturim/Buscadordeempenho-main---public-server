const{google:e}=require("googleapis"),fs=require("fs"),express=require("express"),server=express(),port=process.env.PORT||3e3;async function authenticateGoogleSheets(){try{let o;return(await e.sheets({version:"v4",auth:new e.auth.GoogleAuth({credentials:{client_email:process.env.CLIENT_EMAIL,private_key:process.env.PRIVATE_KEY.replace(/\\n/g,"\n")},scopes:["https://www.googleapis.com/auth/spreadsheets"]})}).spreadsheets.values.get({spreadsheetId:process.env.SPREADSHEET_ID,range:"Planilha de Controle"})).data}catch(a){throw console.error("Erro na autentica\xe7\xe3o com o Google Sheets:",a),a}}server.use(express.static("public",{maxAge:36e5})),server.get("/empenhos",async(o,a)=>{try{let r=o.query.numeroEmpenho,t=r.trim().toUpperCase(),s=(await authenticateGoogleSheets()).values;console.log("Dados da planilha carregados."),statement;let n=s.find(o=>o[1].trim().toUpperCase()===t);if(n){let i=["N\xfamero do processo","N\xfamero do empenho","Ano do empenho","N\xba Nota fiscal","Respons\xe1vel pela liquida\xe7\xe3o","Comprovante de liquida\xe7\xe3o realizada","Status do empenho","Bloco de assinatura","Solicita\xe7\xe3o de recurso (para casos de arrecada\xe7\xe3o pr\xf3pria)","Comprovante de pagamento (ordem banc\xe1ria)","Data de pagamento realizado","Observa\xe7\xf5es"].map((o,a)=>o+": "+n[a]).join("<br>"),p=fs.readFileSync("public/template.html","utf8").replace("{{empenhoData}}",i);a.send(p)}else a.status(404).send(`Empenho ${r} n\xe3o encontrado. Isto ocorre quando o empenho n\xe3o existe , ou o aviso de recebimento do material ou presta\xe7\xe3o de servi\xe7o n\xe3o foi realizado ainda. Caso a entrega do material/da presta\xe7\xe3o de servi\xe7o tenha sido efetivado, solicitamos que nos envie a nota fiscal e o comprovante de entrega/execu\xe7\xe3o para o e-mail: compras.proppi@id.uff.br`)}catch(d){console.error("Erro ao buscar informa\xe7\xf5es do empenho:",d),a.status(500).send("Erro ao buscar informa\xe7\xf5es do empenho. Por favor, tente novamente mais tarde.")}}),server.listen(port,()=>{console.log(`Servidor rodando na porta ${port}`)});
