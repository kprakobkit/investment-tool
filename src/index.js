import file from "./response";

const chart = document.getElementById("tester");

const terms = file.map(({ terms }) => terms);
const expectedSavings = file.map(({ expected_savings }) => expected_savings);
const totalInterest = file.map(({ total_interest }) => total_interest);
const totalInvested = file.map(({ total_invested }) => total_invested);
const totalReturn = file.map(({ total_return }) => total_return);

Plotly.plot(
  chart,
  [
    {
      x: terms,
      y: expectedSavings,
      name: "Expected Savings"
    },
    {
      x: terms,
      y: totalInterest,
      name: "Total Interest"
    },
    {
      x: terms,
      y: totalInvested,
      name: "Total Invested"
    },
    {
      x: terms,
      y: totalReturn,
      name: "Total Return"
    }
  ],
  {
    margin: { t: 0 }
  }
);
