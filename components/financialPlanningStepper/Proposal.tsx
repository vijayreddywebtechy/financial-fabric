import ContextSummaryBar from "./blocks/ContextSummaryBar";
import { Button } from "@/components/ui/button";

type Props = {};

const Proposal = (props: Props) => {
  return (
    <>
      <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded shadow">
        <ContextSummaryBar />

        {/* Success Icon */}
        <div className="flex justify-center mt-12 mb-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
            Proposal Ready
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            FAIS Record of Advice generated.
          </p>
        </div>

        {/* Summary Card */}
        <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Goal</span>
              <span className="text-sm font-semibold text-gray-900">
                Retirement
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Risk</span>
              <span className="text-sm font-semibold text-gray-900">
                High (Aggressive)
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Contribution</span>
              <span className="text-sm font-semibold text-gray-900">
                R 7 500 pm
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Total EAC</span>
              <span className="text-sm font-semibold text-gray-900">1.88%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button variant="outline" className="w-full sm:w-auto px-6 py-3">
            Edit Strategy
          </Button>
          <Button className="w-full sm:w-auto px-6 py-3">Download PDF</Button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        Advice rendered under FSP License #12345. Client data processed in
        accordance with POPIA.
      </div>
    </>
  );
};

export default Proposal;
