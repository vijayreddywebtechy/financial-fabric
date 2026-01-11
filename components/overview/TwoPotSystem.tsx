import React from 'react';

interface PotData {
  title: string;
  description: string;
  amount: number;
  colorClass: string;
}

const TwoPotSystem: React.FC = () => {
  const pots: PotData[] = [
    {
      title: 'Savings Pot',
      description: 'Accessible',
      amount: 42000,
      colorClass: 'border-green-300 bg-green-50',
    },
    {
      title: 'Vested Pot',
      description: 'Protected',
      amount: 2930000,
      colorClass: 'border-blue-300 bg-blue-50',
    },
    {
      title: 'Retirement Pot',
      description: 'Locked',
      amount: 28000,
      colorClass: 'border-red-300 bg-red-50',
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        "Two-Pot" System Status (Sept 2024)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pots.map((pot, index) => (
          <div
            key={index}
            className={`border-2 ${pot.colorClass} rounded-lg p-6 text-center`}
          >
            <p className="text-sm text-gray-700 mb-2">
              {pot.title} ({pot.description})
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              R {pot.amount.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoPotSystem;
