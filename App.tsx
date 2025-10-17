import React, { useState } from 'react';
import Header from './components/Header';
import ConfessionForm from './components/ConfessionForm';
import ConfessionList from './components/ConfessionList';
import type { Confession, ReactionType } from './types';
import { ReactionType as ReactionEnum } from './types';
import { moderateConfession, getAIThoughts } from './services/geminiService';

const EmojiBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
    <span className="absolute top-[10%] left-[5%] text-5xl opacity-10 transform rotate-12">🤔</span>
    <span className="absolute top-[20%] right-[10%] text-6xl opacity-10 transform -rotate-12">💬</span>
    <span className="absolute bottom-[15%] left-[15%] text-4xl opacity-10 transform rotate-6">🚀</span>
    <span className="absolute bottom-[25%] right-[20%] text-5xl opacity-10 transform rotate-12">💡</span>
    <span className="absolute top-[50%] left-[40%] text-7xl opacity-5 transform -rotate-6">✨</span>
    <span className="absolute top-[70%] left-[5%] text-4xl opacity-10 transform rotate-12">🤯</span>
    <span className="absolute top-[80%] right-[10%] text-6xl opacity-10 transform -rotate-12">🎨</span>
  </div>
);

const App: React.FC = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddConfession = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Moderate the content to ensure it's appropriate
      const isSafe = await moderateConfession(text);

      if (!isSafe) {
        setError("This thought seems to contain inappropriate content. Let's keep things positive and supportive! ✨");
        setIsLoading(false);
        return;
      }

      // Step 2: Get relevant, AI-powered suggestions
      const aiThoughts = await getAIThoughts(text);

      const newConfession: Confession = {
        id: Date.now(),
        text,
        aiThoughts,
        reactions: {
          [ReactionEnum.HEART]: 0,
          [ReactionEnum.LIGHTBULB]: 0,
          [ReactionEnum.SAD]: 0,
        },
      };

      setConfessions(prevConfessions => [newConfession, ...prevConfessions]);
    } catch (err) {
      console.error(err);
      setError('Soshage is a bit busy right now. Please try sharing your thought again in a moment. 🧠');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReact = (confessionId: number, reaction: ReactionType) => {
    setConfessions(prevConfessions =>
      prevConfessions.map(c =>
        c.id === confessionId
          ? { ...c, reactions: { ...c.reactions, [reaction]: c.reactions[reaction] + 1 } }
          : c
      )
    );
  };

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800 relative overflow-hidden">
      <EmojiBackground />
      <Header />
      <main className="container mx-auto max-w-2xl p-4 relative z-10">
        <ConfessionForm onSubmit={handleAddConfession} isLoading={isLoading} />
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md shadow-sm" role="alert">
            <p className="font-bold">Oh no!</p>
            <p>{error}</p>
          </div>
        )}
        <ConfessionList confessions={confessions} onReact={handleReact} />
      </main>
    </div>
  );
};

export default App;