/*Inserir no terminal npx nodemon index.js */
/*Objetivo: Criar um servidor local para teste */
/*Declaração das variáveis */
/*Entrada de dados */

const { google } = require('googleapis');
const fs = require('fs');
const express = require('express');
const server = express();
const port = 5500;

// Configurar a pasta "public" para servir arquivos estáticos
server.use(express.static('public'));

/*Saída de dados*/

// Ouvir conexões da porta especificada
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

/*Objetivo: autenticação no Google Cloud */
/*Entrada de dados */

// Configuração do ID da planilha
const SPREADSHEET_ID = 'SPREADSHEET_ID_VARIABLE';
// Credenciais do Google Sheets
const credentials = {
  client_email: 'client_email_variable',
  private_key: 'private_key_variable',
};

// Autenticação usando OAuth 2.0
async function authenticateGoogleSheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Planilha de Controle', // nome da aba da planilha
    });

    console.log('Autenticação com o Google Sheets bem-sucedida.');
    return response.data;
  } catch (error) {
    console.error('Erro na autenticação com o Google Sheets:', error);
    throw error;
  }
}


// Rota para buscar informações do empenho

server.get('/empenhos', async (req, res) => {
  try {
    const numeroEmpenho = req.query.numeroEmpenho;
    const numeroEmpenhoCleaned = numeroEmpenho.trim().toUpperCase(); // Remover espaços e transformar em maiúsculas
    console.log('Número do empenho recebido:', numeroEmpenhoCleaned);

    const sheetData = await authenticateGoogleSheets();
    console.log('Dados da planilha carregados.');

    const rows = sheetData.values;

    // Filtrar as informações para encontrar o empenho correspondente
    const empenhoEncontrado = rows.find((row) => {
      const valorDaPlanilha = row[1].trim().toUpperCase(); // Remover espaços e transformar em maiúsculas
      console.log('Valor da planilha:', valorDaPlanilha);
      console.log('Valor a ser comparado:', numeroEmpenhoCleaned);

      return valorDaPlanilha === numeroEmpenhoCleaned;
    });


    if (empenhoEncontrado) {
      const explanations = ["Número do processo", "Número do empenho","Ano do empenho","Nº Nota fiscal","Responsável pela liquidação","Comprovante de liquidação realizada","Status do empenho","Bloco de assinatura","Solicitação de recurso (para casos de arrecadação própria)","Comprovante de pagamento (ordem bancária)","Data de pagamento realizado","Observações"];
      const empenhoResponse = explanations.map((explanation, index) => {
        return explanation + ": " + empenhoEncontrado[index];
      });

      const formattedResponse = empenhoResponse.join("<br>");

      // Lê o conteúdo do arquivo 'template.html'
      const templateContent = fs.readFileSync('public/template.html', 'utf8');

      // Substitui o marcador '{{empenhoData}}' pelo conteúdo formatado
      const finalHTML = templateContent.replace('{{empenhoData}}', formattedResponse);

      // Envia o HTML renderizado para o cliente
      res.send(finalHTML);
    } else {
      console.log('Empenho não encontrado:', numeroEmpenho);
      res.status(404).send(`Empenho ${numeroEmpenho} não encontrado. Isto ocorre quando o empenho não existe , ou o aviso de recebimento do material ou prestação de serviço não foi realizado ainda. Caso a entrega do material/ da prestação de serviço tenha sido efetivado, solicitamos que nos envie a nota fiscal e o comprovante de entrega/execução para o e mail: compras.proppi@id.uff.br`);
    }
  } catch (error) {
    console.error('Erro ao buscar informações do empenho:', error);
    res.status(500).send('Erro ao buscar informações do empenho. Por favor, tente novamente mais tarde.');
  }
});