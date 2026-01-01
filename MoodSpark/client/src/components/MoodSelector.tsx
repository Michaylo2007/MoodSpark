import { MOODS } from "../lib/moods";
import { Button } from "./ui/button";

interface MoodSelectorProps {
  onSelectMood: (moodId: string) => void;
  isLoading?: boolean;
}

export function MoodSelector({ onSelectMood, isLoading = false }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {MOODS.map((mood) => (
        <Button
          key={mood.id}
          onClick={() => onSelectMood(mood.id)}
          disabled={isLoading}
          className="h-auto flex-col gap-2 py-4"
          variant="outline"
        >
          <span className="text-3xl">{mood.icon}</span>
          <span className="text-xs">{mood.name}</span>
        </Button>
      ))}
    </div>
  );
}
