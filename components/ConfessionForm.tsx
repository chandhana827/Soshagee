import React, { useState } from 'react';

interface ConfessionFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) {
      setError('Your thought is a bit short! Give Soshage a little more to work with. 😊');
      return;
    }
    onSubmit(text);
    setText('');
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a thought, a problem, or an idea... Soshage is here to help. 🤔"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow resize-none"
          rows={4}
          disabled={isLoading}
          aria-label="Soshage input"
        />
        <div className="flex justify-end items-center mt-3">
          <button
            type="submit"
            disabled={isLoading || text.trim().length === 0}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Thinking...
              </div>
            ) : (
              'Get Suggestions'
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ConfessionForm;