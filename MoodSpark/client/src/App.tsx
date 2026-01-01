import { useState } from "react";
import { MOODS } from "./lib/moods";
import { useMoods } from "./hooks/useMoods";
import { MoodSelector } from "./components/MoodSelector";
import { MoodSpark } from "./components/MoodSpark";
import { MoodHistory } from "./components/MoodHistory";
import { MoodCalendar } from "./components/MoodCalendar";
import { Card } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Sparkles, Calendar, Clock } from "lucide-react";

function App() {
  const { moods, isLoading, recordMood } = useMoods();
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [showSpark, setShowSpark] = useState(false);

  const selectedMood = selectedMoodId ? MOODS.find(m => m.id === selectedMoodId) : null;

  const handleSelectMood = async (moodId: string) => {
    setSelectedMoodId(moodId);
    setShowSpark(true);
    try {
      await recordMood(moodId);
    } catch (error) {
      console.error('Failed to record mood:', error);
    }
  };

  const handleCloseSpark = () => {
    setShowSpark(false);
    setSelectedMoodId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">MoodSpark</h1>
          </div>
          <p className="text-gray-600">Quick mood tracking with a spark of support</p>
        </div>

        {/* Main Spark View */}
        {showSpark && selectedMood ? (
          <div className="mb-8">
            <MoodSpark mood={selectedMood} onClose={handleCloseSpark} />
          </div>
        ) : (
          <Card className="p-6 sm:p-8 mb-8 bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">How are you feeling?</h2>
            <MoodSelector onSelectMood={handleSelectMood} isLoading={isLoading} />
          </Card>
        )}

        {/* History and Calendar Tabs */}
        <Tabs defaultValue="history" className="bg-white rounded-lg">
          <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none">
            <TabsTrigger value="history" className="flex gap-2 items-center">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex gap-2 items-center">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="p-6 sm:p-8">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              <MoodHistory moods={moods} />
            )}
          </TabsContent>

          <TabsContent value="calendar" className="p-6 sm:p-8">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              <MoodCalendar moods={moods} />
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Total moods tracked: <span className="font-semibold text-gray-700">{moods.length}</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
