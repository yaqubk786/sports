import Papa from "papaparse";

export const handleExportCSV = (authorStats, payoutRate, editablePayouts) => {
  const rows = Object.entries(authorStats).map(([author, count]) => {
    const rate = editablePayouts[author] ?? payoutRate;
    return {
      Author: author,
      Articles: count,
      "Payout Rate ($)": rate,
      "Total Payout ($)": (count * rate).toFixed(2),
    };
  });

  const csv = Papa.unparse(rows);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "author_stats.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
