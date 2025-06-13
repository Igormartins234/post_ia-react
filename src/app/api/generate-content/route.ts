import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {

    const { topic, audience, tone } = await request.json();

  
    if (!topic || !audience || !tone) {
      return new NextResponse(
        JSON.stringify({ error: 'Dados incompletos. Tópico, público e tom são obrigatórios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("A chave da API do Gemini não foi encontrada nas variáveis de ambiente.");
    }

    // Prompt
    const prompt = `
  **Persona:** Você é um estrategista de marketing digital sênior, especialista em copywriting e engajamento em múltiplas plataformas de redes sociais. Sua escrita é criativa, adaptável e focada em resultados.

  **Tarefa:** Crie um conjunto de posts para redes sociais com base nos seguintes parâmetros fornecidos.

  **Parâmetros de Entrada:**
  - **Tópico Central:** "${topic}"
  - **Público-Alvo:** "${audience}"
  - **Tom da Comunicação:** "${tone}"

  **Processo de Raciocínio (Siga estes passos):**

  1.  **Análise:** Primeiro, analise o tópico, público e tom. Pense em qual tipo de mensagem ressoaria melhor com o público-alvo, considerando o tom solicitado.
  2.  **Adaptação por Plataforma:** Para cada plataforma, adapte a mensagem central para se adequar às melhores práticas e ao estilo de comunicação daquela rede.
  3.  **Criação do Conteúdo:** Escreva o texto para cada post, seguindo rigorosamente as regras abaixo.

  **Regras Específicas por Plataforma:**
  - **X (Twitter):**
    - **Objetivo:** Gerar curiosidade e direcionar tráfego, propor um assunto a ser discutido.
    - **Formato:** Texto extremamente conciso. Deve incluir um "gancho" forte no início.
    - **Hashtags:** Incluir exatamente 2 ou 3 hashtags altamente relevantes e populares no final.
  - **Instagram:**
    - **Objetivo:** Criar conexão emocional e visual, incentivando salvamentos e comentários.
    - **Formato:** Legenda bem estruturada. A primeira linha deve ser um título chamativo. Use parágrafos curtos e emojis relevantes para quebrar o texto.
    - **Hashtags:** Incluir um bloco de 5 a 7 hashtags no final, misturando hashtags populares com outras de nicho.
  - **LinkedIn:**
    - **Objetivo:** Estabelecer autoridade, gerar discussão profissional e networking, mostre o valor do tópico com detalhes.
    - **Formato:** Texto profissional e bem articulado. Comece com uma estatística, uma pergunta provocativa ou uma declaração forte. Use bullet points (listas) para destacar benefícios ou pontos-chave. Evite emojis excessivos.
    - **Finalização:** Termine com uma pergunta aberta para estimular o debate na seção de comentários.

  **Formato da Saída (Regra mais importante):**
  - A resposta DEVE ser um objeto JSON puro (raw JSON).
  - NÃO inclua a string \`\`\`json no início ou \`\`\` no final.
  - O JSON deve ter exatamente a seguinte estrutura, com chaves e valores do tipo string:
    \`\`\`json
    {
      "twitter": "...",
      "instagram": "...",
      "linkedin": "..."
    }
    \`\`\`

  **Exemplo de Saída Esperada (para um tópico de "app de meditação"):**
    \`\`\`json
    {
      "twitter": "Sentindo a sobrecarga da semana? Respire fundo. Nosso novo app de meditação guiada está aqui para trazer 5 minutos de paz ao seu dia. Link na bio! #Mindfulness #Meditação",
      "instagram": "Sua pausa para a paz chegou. ✨\\n\\nNós sabemos que a vida é agitada. Por isso, criamos um santuário no seu bolso. Com sessões de 5, 10 ou 15 minutos, encontre seu centro onde quer que esteja.\\n\\nPronto para transformar seu dia?\\n\\n#MeditaçãoGuiada #SaudeMental #BemEstar #Ansiedade #PazInterior #Autocuidado #AppDeMeditacao",
      "linkedin": "A produtividade no ambiente de trabalho está diretamente ligada à clareza mental.\\n\\nUm estudo recente mostrou que micro-pausas para meditação podem aumentar o foco em até 15%.\\n\\nNosso novo aplicativo foi projetado para profissionais ocupados, oferecendo sessões de meditação que se encaixam perfeitamente entre reuniões.\\n\\nComo sua equipe prioriza a saúde mental para melhorar o desempenho? Vamos discutir nos comentários."
    }
    \`\`\`
  
  Agora, gere o conteúdo com base nos parâmetros de entrada fornecidos.
`;

    const modelName = 'gemini-2.0-flash';
    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erro da API do Gemini:", errorBody);
      throw new Error(`Erro na chamada da API do Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    
   
    const generatedText = data.candidates[0].content.parts[0].text;
    const parsedContent = JSON.parse(generatedText);

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error('Erro na API Route:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
    return new NextResponse(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

