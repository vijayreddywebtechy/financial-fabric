
type Props = {};

const ContextSummaryBar = (props: Props) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-wrap gap-6">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" />
        </svg>
        <span className="text-blue-900 text-sm">
          Goal: <span className="text-blue-800 font-medium">Retirement</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-blue-900 text-sm">
          Risk: <span className="text-blue-800 font-medium">Conservative</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-blue-900 text-sm">
          Horizon: <span className="text-blue-800 font-medium">0-3 Years</span>
        </span>
      </div>
    </div>
  );
};

export default ContextSummaryBar;
