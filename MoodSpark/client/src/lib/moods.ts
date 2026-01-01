export interface Mood {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  motivationalPhrases: string[];
  miniIdeas: string[];
}

export const MOODS: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    icon: '😊',
    gradient: 'from-yellow-300 to-orange-300',
    motivationalPhrases: [
      'Your joy is contagious!',
      'Keep riding this wave of happiness.',
      'Spread that smile around!'
    ],
    miniIdeas: [
      'Share your happiness with someone',
      'Celebrate something small',
      'Take a happy selfie'
    ]
  },
  {
    id: 'tired',
    name: 'Tired',
    icon: '😴',
    gradient: 'from-indigo-300 to-purple-300',
    motivationalPhrases: [
      'Rest is productive too.',
      'You deserve a break.',
      'Sleep is your superpower.'
    ],
    miniIdeas: [
      'Take a 10-minute nap',
      'Drink some water',
      'Step outside for fresh air'
    ]
  },
  {
    id: 'anxious',
    name: 'Anxious',
    icon: '😰',
    gradient: 'from-blue-300 to-cyan-300',
    motivationalPhrases: [
      'This feeling will pass.',
      'You are stronger than your worry.',
      'Take it one breath at a time.'
    ],
    miniIdeas: [
      'Practice deep breathing',
      'Go for a walk',
      'Write down your thoughts'
    ]
  },
  {
    id: 'inspired',
    name: 'Inspired',
    icon: '✨',
    gradient: 'from-pink-300 to-rose-300',
    motivationalPhrases: [
      'Channel that inspiration!',
      'Now is the perfect time to create.',
      'Your ideas matter.'
    ],
    miniIdeas: [
      'Write down your idea',
      'Start a small project',
      'Share your vision'
    ]
  },
  {
    id: 'calm',
    name: 'Calm',
    icon: '🧘',
    gradient: 'from-green-300 to-emerald-300',
    motivationalPhrases: [
      'Hold onto this peace.',
      'You are exactly where you need to be.',
      'This tranquility is yours to keep.'
    ],
    miniIdeas: [
      'Meditate for 5 minutes',
      'Journal your thoughts',
      'Listen to calming music'
    ]
  },
  {
    id: 'sad',
    name: 'Sad',
    icon: '😔',
    gradient: 'from-slate-400 to-gray-400',
    motivationalPhrases: [
      'Your feelings are valid.',
      'This is temporary.',
      'Be gentle with yourself.'
    ],
    miniIdeas: [
      'Talk to someone you trust',
      'Watch something comforting',
      'Do something kind for yourself'
    ]
  },
  {
    id: 'focused',
    name: 'Focused',
    icon: '🎯',
    gradient: 'from-amber-300 to-yellow-300',
    motivationalPhrases: [
      'You are in the zone!',
      'Keep that momentum going.',
      'Great work is ahead.'
    ],
    miniIdeas: [
      'Tackle that one task',
      'Eliminate distractions',
      'Take a focused break'
    ]
  },
  {
    id: 'grateful',
    name: 'Grateful',
    icon: '🙏',
    gradient: 'from-violet-300 to-purple-300',
    motivationalPhrases: [
      'Gratitude is your superpower.',
      'You have so much to appreciate.',
      'This mindset will change everything.'
    ],
    miniIdeas: [
      'List three blessings',
      'Thank someone today',
      'Appreciate one small thing'
    ]
  }
];
