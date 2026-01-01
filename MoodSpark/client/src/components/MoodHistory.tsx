import { format, formatDistanceToNow } from "date-fns";
import { MoodRecord } from "../hooks/useMoods";
import { MOODS } from "../lib/moods";
import { Card } from "./ui/card";

interface MoodHistoryProps {
  moods: MoodRecord[];
}

export function MoodHistory({ moods }: MoodHistoryProps) {
  // Group moods by day
  const groupedByDay = moods.reduce((acc, mood) => {
    const date = format(new Date(mood.timestamp), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(mood);
    return acc;
  }, {} as Record<string, MoodRecord[]>);

  const moodMap = new Map(MOODS.map(m => [m.id, m]));

  if (moods.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No moods recorded yet. Start tracking to see your history!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDay).map(([date, dayMoods]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            {format(new Date(date), 'EEEE, MMMM d')}
          </h3>
          <div className="space-y-2">
            {dayMoods.map((mood) => {
              const moodData = moodMap.get(mood.mood);
              return (
                <Card key={mood.id} className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <span className="text-2xl">{moodData?.icon || '🎭'}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{moodData?.name || mood.mood}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(mood.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {format(new Date(mood.timestamp), 'HH:mm')}
                  </span>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
