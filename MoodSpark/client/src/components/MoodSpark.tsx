import { Mood } from "../lib/moods";
import { Button } from "./ui/button";

interface MoodSparkProps {
  mood: Mood;
  onClose: () => void;
}

export function MoodSpark({ mood, onClose }: MoodSparkProps) {
  const phrase = mood.motivationalPhrases[Math.floor(Math.random() * mood.motivationalPhrases.length)];
  const idea = mood.miniIdeas[Math.floor(Math.random() * mood.miniIdeas.length)];

  return (
    <div className={`bg-gradient-to-br ${mood.gradient} rounded-lg p-8 text-center space-y-6 animate-in fade-in`}>
      <div className="text-6xl">{mood.icon}</div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{mood.name}</h2>
        <p className="text-lg text-gray-700 italic">"{phrase}"</p>
      </div>

      <div className="bg-white bg-opacity-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Your spark of support</p>
        <p className="text-base font-semibold text-gray-800">{idea}</p>
      </div>

      <Button onClick={onClose} className="w-full">
        Done
      </Button>
    </div>
  );
}
