import React from 'react';
import type { Confession, ReactionType } from '../types';
import { ReactionType as ReactionEnum } from '../types';
import HeartIcon from './icons/HeartIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import SadIcon from './icons/SadIcon';

interface ConfessionCardProps {
  confession: Confession;
  onReact: (confessionId: number, reaction: ReactionType) => void;
}

const reactionComponents = {
  [ReactionEnum.HEART]: { icon: HeartIcon, color: 'hover:bg-red-100 text-red-500' },
  [ReactionEnum.LIGHTBULB]: { icon: LightbulbIcon, color: 'hover:bg-yellow-100 text-yellow-500' },
  [ReactionEnum.SAD]: { icon: SadIcon, color: 'hover:bg-blue-100 text-blue-500' },
};

const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession, onReact }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
      <p className="text-gray-800 text-lg whitespace-pre-wrap">"{confession.text}"</p>
      
      <div className="mt-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
        <h3 className="font-semibold text-purple-800 flex items-center gap-2">
          <span className="text-xl">💡</span> Soshage Suggests
        </h3>
        <p className="text-purple-700 mt-1">{confession.aiThoughts}</p>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <span className="text-sm font-semibold text-gray-600">React:</span>
        <div className="flex items-center space-x-2">
          {Object.values(ReactionEnum).map((reaction) => {
            const Reaction = reactionComponents[reaction];
            return (
              <button
                key={reaction}
                onClick={() => onReact(confession.id, reaction)}
                className={`flex items-center space-x-1 p-2 rounded-full transition-colors duration-200 ${Reaction.color}`}
                aria-label={`React with ${reaction.toLowerCase()}`}
              >
                <Reaction.icon className="h-5 w-5" />
                <span className="text-sm font-medium text-gray-700">
                  {confession.reactions[reaction]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConfessionCard;