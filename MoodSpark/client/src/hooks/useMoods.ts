import { useState, useEffect } from 'react';

export interface MoodRecord {
  id: string;
  mood: string;
  timestamp: number;
}

export function useMoods() {
  const [moods, setMoods] = useState<MoodRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoods = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/moods');
      if (!response.ok) throw new Error('Failed to fetch moods');
      const data = await response.json();
      setMoods(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const recordMood = async (mood: string) => {
    try {
      const response = await fetch('/api/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      });
      if (!response.ok) throw new Error('Failed to record mood');
      const newMood = await response.json();
      setMoods([newMood, ...moods]);
      return newMood;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return { moods, isLoading, error, recordMood, refetch: fetchMoods };
}
