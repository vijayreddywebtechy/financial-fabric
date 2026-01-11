'use client';

import React, { useState } from 'react';
import CustomSelect, { SelectOption } from '@/components/dynamic/CustomSelect';

interface RiskProfile {
  score: number;
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
  targetReturn: string;
  fundFilter: string;
  riskStdDev: string;
  equityExposure: string;
  upsideDownside: string;
  benchmark: string;
  categoryRange: string;
}

const RiskAppetite: React.FC = () => {
  const [investmentTerm, setInvestmentTerm] = useState<SelectOption | null>(null);
  const [requiredRisk, setRequiredRisk] = useState<SelectOption | null>(null);
  const [riskTolerance, setRiskTolerance] = useState<SelectOption | null>(null);
  const [riskCapacity, setRiskCapacity] = useState<SelectOption | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const investmentTermOptions: SelectOption[] = [
    { value: 'less-than-4', label: 'Less than 4 years' },
    { value: '4-7', label: '4 - 7 years' },
    { value: '7-10', label: '7 - 10 years' },
    { value: 'more-than-10', label: 'More than 10 years' }
  ];

  const requiredRiskOptions: SelectOption[] = [
    { value: 'keep-safe', label: 'To keep my money safe, even if my returns are less than inflation' },
    { value: 'beat-inflation', label: 'To beat inflation and grow my wealth moderately' },
    { value: 'maximize-returns', label: 'To maximize returns, accepting higher volatility' }
  ];

  const riskToleranceOptions: SelectOption[] = [
    { value: 'cash-in', label: 'I would cash in my investment' },
    { value: 'switch-conservative', label: 'I would switch to a more conservative investment' },
    { value: 'do-nothing', label: 'I would do nothing and wait for recovery' },
    { value: 'invest-more', label: 'I would invest more to take advantage of lower prices' }
  ];

  const riskCapacityOptions: SelectOption[] = [
    { value: 'major-impact', label: 'It would have a major impact - I would struggle financially' },
    { value: 'depend-on-it', label: 'It would have an impact as I depend on this investment' },
    { value: 'minor-impact', label: 'It would have a minor impact on my lifestyle' },
    { value: 'no-impact', label: 'It would have no impact on my standard of living' }
  ];

  const calculateRisk = () => {
    let score = 0;

    // Investment Term scoring
    if (investmentTerm?.value === 'less-than-4') score += 5;
    else if (investmentTerm?.value === '4-7') score += 15;
    else if (investmentTerm?.value === '7-10') score += 25;
    else if (investmentTerm?.value === 'more-than-10') score += 35;

    // Required Risk scoring
    if (requiredRisk?.value === 'keep-safe') score += 5;
    else if (requiredRisk?.value === 'beat-inflation') score += 20;
    else if (requiredRisk?.value === 'maximize-returns') score += 35;

    // Risk Tolerance scoring
    if (riskTolerance?.value === 'cash-in') score += 5;
    else if (riskTolerance?.value === 'switch-conservative') score += 15;
    else if (riskTolerance?.value === 'do-nothing') score += 25;
    else if (riskTolerance?.value === 'invest-more') score += 35;

    // Risk Capacity scoring
    if (riskCapacity?.value === 'major-impact') score += 5;
    else if (riskCapacity?.value === 'depend-on-it') score += 15;
    else if (riskCapacity?.value === 'minor-impact') score += 25;
    else if (riskCapacity?.value === 'no-impact') score += 35;

    // Determine category and details
    let profile: RiskProfile;
    if (score <= 40) {
      profile = {
        score,
        category: 'Conservative',
        description: 'You want stability and are more concerned with protecting current investments than increasing real value.',
        targetReturn: 'CPI + 1%',
        fundFilter: 'Income',
        riskStdDev: '3.2%',
        equityExposure: '0 - 10%',
        upsideDownside: '-1.0% / +7.4%',
        benchmark: 'ASISA MA Income Average',
        categoryRange: '1 - 30'
      };
      setProgressPercent(16.67);
    } else if (score <= 80) {
      profile = {
        score,
        category: 'Moderate',
        description: 'You seek a balance between growth and stability, accepting moderate volatility for better returns.',
        targetReturn: 'CPI + 4%',
        fundFilter: 'Balanced',
        riskStdDev: '7.5%',
        equityExposure: '40 - 60%',
        upsideDownside: '-5.0% / +15.0%',
        benchmark: 'ASISA MA Multi Asset Medium Equity',
        categoryRange: '31 - 80'
      };
      setProgressPercent(50);
    } else {
      profile = {
        score,
        category: 'Aggressive',
        description: 'You prioritize maximum growth and are comfortable with significant volatility to achieve higher returns.',
        targetReturn: 'CPI + 7%',
        fundFilter: 'Growth',
        riskStdDev: '12.8%',
        equityExposure: '70 - 100%',
        upsideDownside: '-15.0% / +25.0%',
        benchmark: 'ASISA MA Multi Asset High Equity',
        categoryRange: '81 - 140'
      };
      setProgressPercent(83.33);
    }

    setRiskProfile(profile);
  };

  const saveProfile = () => {
    alert('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-700 text-white px-6 py-8 rounded-t-lg">
          <h1 className="text-3xl font-bold">Risk Appetite</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-b-lg shadow-lg">
          {/* Left Column - Questions */}
          <div className="space-y-6">
            {/* Investment Term */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Investment Term
              </label>
              <p className="text-sm text-gray-600 mb-3">Your investment term is</p>
              <CustomSelect
                options={investmentTermOptions}
                value={investmentTerm}
                onChange={(newValue) => setInvestmentTerm(newValue)}
                placeholder="Select Option"
              />
            </div>

            {/* Required Risk */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Required Risk
              </label>
              <p className="text-sm text-gray-600 mb-3">
                In view of the goal you want to achieve, which statement best describes your objectives for this investment?
              </p>
              <CustomSelect
                options={requiredRiskOptions}
                value={requiredRisk}
                onChange={(newValue) => setRequiredRisk(newValue)}
                placeholder="Select Option"
              />
            </div>

            {/* Risk Tolerance */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Risk Tolerance
              </label>
              <p className="text-sm text-gray-600 mb-3">
                What would you do if you started to lose the money you invested?
              </p>
              <CustomSelect
                options={riskToleranceOptions}
                value={riskTolerance}
                onChange={(newValue) => setRiskTolerance(newValue)}
                placeholder="Select Option"
              />
            </div>

            {/* Risk Capacity */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Risk Capacity
              </label>
              <p className="text-sm text-gray-600 mb-3">
                What impact would it have on your standard of living if you were to lose the money you have invested?
              </p>
              <CustomSelect
                options={riskCapacityOptions}
                value={riskCapacity}
                onChange={(newValue) => setRiskCapacity(newValue)}
                placeholder="Select Option"
              />
            </div>

            <button
              onClick={calculateRisk}
              className="w-full bg-blue-700 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-800 transition-colors"
            >
              CALCULATE RISK
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {!riskProfile ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center px-6">
                  <div className="mb-4">
                    <svg className="w-20 h-20 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Let's determine your risk profile
                  </h3>
                  <p className="text-gray-600">
                    Complete the form on the left to see your personalized assessment
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="inline-block bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    SCORE: {riskProfile.score}
                  </div>
                  <h2 className={`text-4xl font-bold mb-6 ${
                    riskProfile.category === 'Conservative' ? 'text-green-600' :
                    riskProfile.category === 'Moderate' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {riskProfile.category}
                  </h2>

                  {/* Visual Scale */}
                  <div className="relative mb-4">
                    <div className="flex h-8 rounded-full overflow-hidden">
                      <div className="w-1/3 bg-green-500"></div>
                      <div className="w-1/3 bg-yellow-400"></div>
                      <div className="w-1/3 bg-red-500"></div>
                    </div>
                    <div 
                      className="absolute top-0 w-1 h-8 bg-gray-800 transition-all duration-500"
                      style={{ left: `${progressPercent}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-800 text-2xl">
                        ▼
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-6">
                    {riskProfile.description}
                  </p>
                </div>

                {/* Risk Profile Details */}
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Target Return
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.targetReturn}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Fund Filter
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.fundFilter}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Risk (Std Dev)
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.riskStdDev}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Equity Exposure
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.equityExposure}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Upside / Downside
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.upsideDownside}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                        Benchmark
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {riskProfile.benchmark}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                      Category Range
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {riskProfile.categoryRange}
                    </p>
                  </div>
                </div>

                <button
                  onClick={saveProfile}
                  className="w-full bg-white border-2 border-blue-700 text-blue-700 py-3 px-6 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  SAVE PROFILE
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAppetite;