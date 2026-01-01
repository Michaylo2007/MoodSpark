import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { MoodRecord } from "../hooks/useMoods";
import { MOODS } from "../lib/moods";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MoodCalendarProps {
  moods: MoodRecord[];
}

export function MoodCalendar({ moods }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const moodMap = new Map(MOODS.map(m => [m.id, m]));
  const moodsByDay = new Map<string, MoodRecord[]>();
  
  moods.forEach(mood => {
    const dayKey = format(new Date(mood.timestamp), 'yyyy-MM-dd');
    if (!moodsByDay.has(dayKey)) {
      moodsByDay.set(dayKey, []);
    }
    moodsByDay.get(dayKey)!.push(mood);
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfWeek = monthStart.getDay();
  const startPadding = Array(firstDayOfWeek).fill(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={goToPreviousMonth} variant="outline" size="sm">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-semibold text-lg">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <Button onClick={goToNextMonth} variant="outline" size="sm">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        {startPadding.map((_, i) => (
          <div key={`padding-${i}`} className="aspect-square" />
        ))}
        {days.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayMoods = moodsByDay.get(dayKey) || [];
          const firstMood = dayMoods[0];
          const moodData = firstMood ? moodMap.get(firstMood.mood) : null;

          return (
            <div
              key={dayKey}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium cursor-default transition-colors ${
                dayMoods.length > 0
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-300'
              }`}
              title={dayMoods.length > 0 ? `${dayMoods.length} mood(s)` : 'No moods'}
            >
              {moodData && dayMoods.length > 0 ? (
                <div className="text-center">
                  <div className="text-lg">{moodData.icon}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{format(day, 'd')}</div>
                </div>
              ) : (
                format(day, 'd')
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
