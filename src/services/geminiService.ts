import { InsultType } from '../types';

// Função mock para simular a API Gemini (funciona sem internet)
export const generateInsult = async (
  type: InsultType, 
  nickname: string, 
  timeElapsed: string, 
  paragraphCount: number
): Promise<string> => {
  
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const insults = {
    [InsultType.Daily]: [
      `Hoje é ${timeElapsed}, ${nickname}. Nem seu reflexo no espelho te aguenta mais, saco de lixo ambulante!`,
      `${timeElapsed} chegou e você continua sendo a mesma ameba preguiçosa de sempre, ${nickname}. Patético!`,
      `Que ${timeElapsed} horrível para ter olhos! Te ver é pior que catar lixo, ${nickname}.`
    ],
    [InsultType.Weekly]: [
      `${timeElapsed} semanas e você ainda é um zero à esquerda, ${nickname}. Até planta cresce mais rápido que seu desespero!`,
      `Relatório Semanal da Bosta: ${timeElapsed} semanas de puro fracasso, ${nickname}. Seu maior exercício foi abrir a geladeira!`,
      `Semana ${timeElapsed} do seu circo de horrores, ${nickname}. Você é a atração principal do parque de aberrações!`
    ],
    [InsultType.Monthly]: [
      `${timeElapsed} meses de pura vergonha alheia, ${nickname}. Sua barriga já tem mais andares que um shopping!`,
      `Fracasso Mensal nº ${timeElapsed}: ${nickname}, você é a prova viva que a evolução tem seus erros!`,
      `Mês ${timeElapsed} do seu apocalipse particular, ${nickname}. Até fungo tem mais vida social que você!`
    ],
    [InsultType.Annual]: [
      `${timeElapsed} ano(s) se arrastando como uma lesma bêbada, ${nickname}. Sua família esconde suas fotos de vergonha!`,
      `Diagnóstico Anual: ${timeElapsed} ano(s) de pura incompetência, ${nickname}. Você faz bagunça parecer produtiva!`,
      `${timeElapsed} ano(s) sendo o lixo humano mais consistente do planeta, ${nickname}. Parabéns pela mediocridade!`
    ]
  };

  const typeInsults = insults[type];
  const randomInsult = typeInsults[Math.floor(Math.random() * typeInsults.length)];
  
  return randomInsult;
};