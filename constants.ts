
import { World } from './types';

export const INITIAL_USER_STATE = {
  name: 'Aprendiz',
  xp: 0,
  level: 1,
  unlockedWorldId: 'world-1',
  completedPhaseIds: []
};

export const GAME_WORLDS: World[] = [
  {
    id: 'world-1',
    title: 'Mundo 1: Fundamentos',
    description: 'A base de tudo. Entenda o que são algoritmos e como interagir com o computador.',
    unlocked: true,
    phases: [
      {
        id: 'p1-1',
        title: 'O que é Algoritmo?',
        concept: 'Um algoritmo é uma sequência lógica de passos para resolver um problema.',
        unlocked: true,
        completed: false,
        missions: [
          {
            id: 'm1-1-1',
            title: 'Boas-vindas Digital',
            description: 'Você precisa saudar o sistema para que ele reconheça sua presença.',
            objective: 'Crie um algoritmo que use o comando escreva para dizer "Olá, Algoritmolândia!"',
            baseCode: 'Algoritmo "saudacao"\nvar\n\ninicio\n  // Digite seu código aqui\n\nfimalgoritmo',
            xpReward: 50
          }
        ]
      },
      {
        id: 'p1-2',
        title: 'Entrada e Saída',
        concept: 'Usamos LEIA para receber dados do usuário e ESCREVA para mostrar resultados.',
        unlocked: false,
        completed: false,
        missions: [
          {
            id: 'm1-2-1',
            title: 'Identificação',
            description: 'O sistema precisa saber seu nome para registrar sua entrada.',
            objective: 'Crie um algoritmo que leia o seu nome em uma variável do tipo caractere e depois escreva "Bem-vindo, " seguido do nome lido.',
            baseCode: 'Algoritmo "identificacao"\nvar\n  nome: caractere\ninicio\n  escreva("Qual o seu nome? ")\n  // Leia o nome e mostre a mensagem de boas-vindas\n\nfimalgoritmo',
            xpReward: 75
          }
        ]
      }
    ]
  },
  {
    id: 'world-2',
    title: 'Mundo 2: Variáveis e Tipos',
    description: 'Aprenda a guardar informações em gavetas digitais.',
    unlocked: false,
    phases: [
      {
        id: 'p2-1',
        title: 'Inteiros e Reais',
        concept: 'Números podem ser inteiros (sem vírgula) ou reais (com vírgula).',
        unlocked: false,
        completed: false,
        missions: [
          {
            id: 'm2-1-1',
            title: 'Calculadora de Idade',
            description: 'O guardião do portal quer saber quantos anos você terá no próximo século.',
            objective: 'Leia sua idade atual (inteiro) e escreva quanto será idade + 100.',
            baseCode: 'Algoritmo "futuro"\nvar\n  idade: inteiro\ninicio\n  \nfimalgoritmo',
            xpReward: 100
          }
        ]
      }
    ]
  }
];
