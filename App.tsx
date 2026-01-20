
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WorldMap from './components/WorldMap';
import MissionView from './components/MissionView';
import { UserState, World, Phase, Mission } from './types';
import { INITIAL_USER_STATE, GAME_WORLDS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('algoritmolandia_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  const [worlds, setWorlds] = useState<World[]>(GAME_WORLDS);
  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);
  const [view, setView] = useState<'home' | 'map' | 'mission'>('home');

  useEffect(() => {
    localStorage.setItem('algoritmolandia_user', JSON.stringify(user));
  }, [user]);

  const handleStartGame = () => {
    setView('map');
  };

  const handleSelectPhase = (phase: Phase) => {
    setCurrentPhase(phase);
    setView('mission');
  };

  const handleMissionSuccess = (xpReward: number) => {
    if (!currentPhase) return;

    setUser(prev => {
      const newXp = prev.xp + xpReward;
      const xpForNextLevel = prev.level * 200;
      const newLevel = newXp >= xpForNextLevel ? prev.level + 1 : prev.level;
      
      const isAlreadyCompleted = prev.completedPhaseIds.includes(currentPhase.id);
      const newCompletedPhases = isAlreadyCompleted 
        ? prev.completedPhaseIds 
        : [...prev.completedPhaseIds, currentPhase.id];

      // Unlock logic for worlds
      let newUnlockedWorldId = prev.unlockedWorldId;
      if (currentPhase.id === 'p1-2' && !isAlreadyCompleted) {
        newUnlockedWorldId = 'world-2';
      }

      return {
        ...prev,
        xp: newXp >= xpForNextLevel ? newXp - xpForNextLevel : newXp,
        level: newLevel,
        completedPhaseIds: newCompletedPhases,
        unlockedWorldId: newUnlockedWorldId
      };
    });

    setView('map');
    setCurrentPhase(null);
  };

  const resetGame = () => {
    if(confirm("Deseja resetar seu progresso? Isso apagará todo o XP e conquistas.")) {
      setUser(INITIAL_USER_STATE);
      setView('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {view !== 'home' && <Header user={user} onReset={resetGame} />}

      <main className="flex-1 overflow-auto">
        {view === 'home' && (
          <div className="h-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
            <div className="max-w-2xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/40 rotate-12">
                <i className="fas fa-code text-white text-5xl"></i>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                  ALGORITMO<span className="text-indigo-500">LÂNDIA</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
                  A restauração do mundo digital começou. Aprenda a programar resolvendo desafios reais com ajuda da inteligência artificial.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={handleStartGame}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-900/40 transition-all transform hover:scale-105 active:scale-95"
                >
                  {user.completedPhaseIds.length > 0 ? 'Continuar Aventura' : 'Começar Agora'}
                </button>
                <button 
                  className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
                  onClick={() => alert("Algoritmolândia v1.0 MVP\nCriado para ensinar VisualG com IA.")}
                >
                  Ver Guia
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'map' && (
          <WorldMap 
            worlds={worlds} 
            user={user} 
            onSelectPhase={handleSelectPhase} 
          />
        )}

        {view === 'mission' && currentPhase && (
          <MissionView 
            phase={currentPhase} 
            mission={currentPhase.missions[0]} 
            onSuccess={handleMissionSuccess}
            onBack={() => setView('map')}
          />
        )}
      </main>

      {view === 'map' && (
        <footer className="p-4 text-center text-slate-600 text-xs border-t border-slate-900">
          Algoritmolândia © 2024 • Tutor Inteligente Gemini Pro 3.0
        </footer>
      )}
    </div>
  );
};

export default App;
