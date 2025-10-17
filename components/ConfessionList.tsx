import React from 'react';
import type { Confession, ReactionType } from '../types';
import ConfessionCard from './ConfessionCard';

interface ConfessionListProps {
  confessions: Confession[];
  onReact: (confessionId: number, reaction: ReactionType) => void;
}

const ConfessionList: React.FC<ConfessionListProps> = ({ confessions, onReact }) => {
  if (confessions.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">The canvas is blank!</h2>
        <p className="text-gray-500 mt-2">Share a thought and let Soshage help you explore it. Your ideas are safe here. ✨</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {confessions.map((confession) => (
        <ConfessionCard key={confession.id} confession={confession} onReact={onReact} />
      ))}
    </div>
  );
};

export default ConfessionList;