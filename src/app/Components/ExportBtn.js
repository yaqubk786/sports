import React from "react";
import { handleExportCSV } from "../Utils/csvUtils";
import { handleExportPDF } from "../Utils/pdfUtils";

export default function ExportBtn({ authorStats, payoutRate, editablePayouts }) {
  return (
    <div className="mb-8">
      <button
        onClick={() => handleExportCSV(authorStats, payoutRate, editablePayouts)}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-4 cursor-pointer"
      >
        Export to CSV
      </button>
      <button
        onClick={() => handleExportPDF(authorStats, payoutRate, editablePayouts)}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Export to PDF
      </button>
    </div>
  );
}
