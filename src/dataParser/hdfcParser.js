function createRow(row, amount, isCredit) {
  if (row.date && row.transaction_description && row.amount__in_rs__) {
    isCredit ? (totalCredit += amount) : (totalDebt += amount);
    return {
      id: isCredit ? creditCount++ : debitCount++,
      date: row.date,
      particular: row.transaction_description,
      amount
    };
  }
}

function createSummary(isCredit) {
  return {
    id: isCredit ? creditCount++ : debitCount++,
    date: null,
    particular: "summary",
    amount: isCredit ? totalCredit : totalDebt
  };
}

let count = 1;
let debitCount = 1;
let creditCount = 1;
let totalDebt = 0;
let totalCredit = 0;

export default function hdfcParser(count) {
  const initalData = JSON.parse(localStorage.getItem("excelDAta"));
  if (!initalData) {
    return;
  }
  const debtTransctions = [];
  const creditTransactions = [];

  initalData.forEach(row => {
    if (row.date && row.transaction_description && row.amount__in_rs__) {
      let amount = row.amount__in_rs__;
      let parsedAmount = amount;
      let isCredit = false;
      //parse for amount
      if (
        amount &&
        amount !== null &&
        typeof amount !== "number" &&
        typeof amount === "string"
      ) {
        if (amount.includes("Cr")) {
          amount = amount.slice(0, -2);
          isCredit = true;
        }
        //replace comma
        amount = amount.replace(/[^\d\.\-]/g, "");
        //finally parse it
        parsedAmount = parseFloat(amount);
      }
      if (!isNaN(parsedAmount)) {
        isCredit
          ? creditTransactions.push(createRow(row, parsedAmount, isCredit))
          : debtTransctions.push(createRow(row, parsedAmount, isCredit));
      }
    }
  });
  debtTransctions.push(createSummary(false));
  creditTransactions.push(createSummary(true));
  return [debtTransctions, creditTransactions];
}
