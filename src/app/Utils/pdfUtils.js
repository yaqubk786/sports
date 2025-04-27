import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; 

export const handleExportPDF = (authorStats, payoutRate, editablePayouts) => {
  const doc = new jsPDF();

  doc.text("Author Stats", 20, 20);

  const rows = Object.entries(authorStats).map(([author, count]) => {
    const rate = editablePayouts[author] ?? payoutRate;
    return [author, count, `$${rate}`, `$${(count * rate).toFixed(2)}`];
  });

  autoTable(doc, {
    startY: 30,
    head: [["Author", "Articles", "Payout Rate ($)", "Total Payout ($)"]],
    body: rows,
  });

  doc.save("author_stats.pdf");
};
