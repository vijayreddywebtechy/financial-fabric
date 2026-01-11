import { useState } from 'react';

interface Selections {
  timeHorizon: number | null;
  lossFeeling: number | null;
  marketReaction: number | null;
  experience: number | null;
}

interface Option {
  label: string;
  value: number;
}

interface Question {
  id: keyof Selections;
  text: string;
  options: Option[];
}

export default function AssessmentBlock() {
  const [selections, setSelections] = useState<Selections>({
    timeHorizon: null,
    lossFeeling: null,
    marketReaction: null,
    experience: null
  });

  const questions: Question[] = [
    {
      id: 'timeHorizon',
      text: '1. When will you likely need to start using this money?',
      options: [
        { label: '0-3 Years', value: 0 },
        { label: '3-7 Years', value: 12 },
        { label: '10+ Years', value: 25 }
      ]
    },
    {
      id: 'lossFeeling',
      text: '2. How do you feel about the possibility of losing money?',
      options: [
        { label: 'Anxious', value: 0 },
        { label: 'Cautious', value: 12 },
        { label: 'Optimistic', value: 25 }
      ]
    },
    {
      id: 'marketReaction',
      text: '3. If your investment dropped 10% yesterday, what is your gut reaction?',
      options: [
        { label: 'Sell Everything', value: 0 },
        { label: 'Do Nothing', value: 12 },
        { label: 'Buy More', value: 25 }
      ]
    },
    {
      id: 'experience',
      text: '4. How would you describe your experience with investing?',
      options: [
        { label: 'Beginner', value: 0 },
        { label: 'Intermediate', value: 12 },
        { label: 'Expert', value: 25 }
      ]
    }
  ];

  const handleSelection = (questionId: keyof Selections, value: number): void => {
    setSelections(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = (): number => {
    return Object.values(selections).reduce((sum, val) => sum + (val || 0), 0);
  };

  const getRiskProfile = (score: number): string => {
    if (score <= 25) return 'Conservative';
    if (score <= 50) return 'Moderate';
    if (score <= 75) return 'Balanced';
    return 'Aggressive';
  };

  const score: number = calculateScore();
  const riskProfile: string = getRiskProfile(score);

  return (
    <>
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-800">Risk Profile Assessment</h2>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question) => (
            <div key={question.id}>
              <p className="text-sm text-gray-600 mb-2">{question.text}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelection(question.id, option.value)}
                    className={`p-3.5 rounded-lg border transition-all text-sm font-medium ${
                      selections[question.id] === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t-2 border-dashed border-gray-300"></div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Calculated Risk Profile</span>
            <div className="text-right">
              <span className="text-green-600 text-lg font-medium">{riskProfile}</span>
              <span className="text-gray-500 ml-2">({score}/100)</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          {/* Score Labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Conservative</span>
            <span>Moderate</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
      </div>
    </>
  );
}