import { AlertCircle } from "lucide-react";

export const ShowError = ({ error }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-red-900">Error</h3>
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );
};
