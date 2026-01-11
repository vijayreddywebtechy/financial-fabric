import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PlanningNeeds {
  retirementPlanning: string;
  investmentPlanning: string;
  riskPlanning: string;
  estatePlanning: string;
  businessPlanning: string;
  education: string;
}

export default function PriorityRating() {
  const [needs, setNeeds] = useState<PlanningNeeds>({
    retirementPlanning: 'high',
    investmentPlanning: 'med',
    riskPlanning: 'low',
    estatePlanning: 'na',
    businessPlanning: 'na',
    education: 'na'
  });

  const planningAreas = [
    { id: 'retirementPlanning', label: 'Retirement Planning' },
    { id: 'investmentPlanning', label: 'Investment Planning' },
    { id: 'riskPlanning', label: 'Risk Planning' },
    { id: 'estatePlanning', label: 'Estate Planning' },
    { id: 'businessPlanning', label: 'Business Planning' },
    { id: 'education', label: 'Education' }
  ];

  const priorities = [
    { value: 'high', label: 'High' },
    { value: 'med', label: 'Med' },
    { value: 'low', label: 'Low' },
    { value: 'na', label: 'N/A' }
  ];

  const handleChange = (area: keyof PlanningNeeds, value: string) => {
    setNeeds(prev => ({
      ...prev,
      [area]: value
    }));
  };

  const generateNotes = (): string => {
    const age = 32;
    const highPriorities = Object.entries(needs)
      .filter(([_, value]) => value === 'high')
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());
    
    const primaryGoal = highPriorities.length > 0 
      ? highPriorities[0].charAt(0).toUpperCase() + highPriorities[0].slice(1)
      : 'Estate';

    let riskCapacity = 'High';
    if (needs.riskPlanning === 'high') riskCapacity = 'Low';
    else if (needs.riskPlanning === 'med') riskCapacity = 'Medium';

    let timeHorizon = 'Short-term horizon (<3 years)';
    if (needs.retirementPlanning === 'high') timeHorizon = 'Long-term horizon (>10 years)';
    else if (needs.retirementPlanning === 'med') timeHorizon = 'Medium-term horizon (3-10 years)';

    return `Client is ${age} years old. ${riskCapacity} capacity for risk. ${timeHorizon}. Primary goal is ${primaryGoal} and needs legacy planning.`;
  };

  return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Need Priority Rating</h3>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-sm text-gray-700">
                <th className="font-medium text-left py-4 px-4">Need Area</th>
                <th className="font-medium text-center py-4 px-4 w-24">High</th>
                <th className="font-medium text-center py-4 px-4 w-24">Med</th>
                <th className="font-medium text-center py-4 px-4 w-24">Low</th>
                <th className="font-medium w-24">N/A</th>
              </tr>
            </thead>
            <tbody>
              {planningAreas.map((area, index) => (
                <tr 
                  key={area.id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-4 text-sm text-gray-800">{area.label}</td>
                  {priorities.map((priority) => (
                    <td key={priority.value} className="text-center py-4 px-4">
                      <RadioGroup
                        value={needs[area.id as keyof PlanningNeeds]}
                        onValueChange={(value) => handleChange(area.id as keyof PlanningNeeds, value)}
                      >
                        <div className="flex items-center justify-center">
                          <RadioGroupItem 
                            value={priority.value} 
                            id={`${area.id}-${priority.value}`}
                            className="h-5 w-5"
                          />
                        </div>
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Auto-Generated Planning Notes */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            Auto-Generated Planning Notes
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed text-sm">
              {generateNotes()}
            </p>
          </div>
        </div>
      </div>
  );
}