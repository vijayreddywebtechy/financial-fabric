import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  statusIcon: 'arrow' | 'dot' | 'check';
  statusText: string;
  statusColor: 'green' | 'blue' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  statusIcon,
  statusText,
  statusColor,
}) => {
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{value}</h2>
      <div className={`flex items-center gap-1 ${colorClasses[statusColor]} text-sm`}>
        {statusIcon === 'arrow' && <span>▲</span>}
        {statusIcon === 'dot' && (
          <span className={`w-2 h-2 bg-${statusColor}-600 rounded-full`}></span>
        )}
        {statusIcon === 'check' && <span>✓</span>}
        <span>{statusText}</span>
      </div>
    </div>
  );
};

export default MetricCard;
