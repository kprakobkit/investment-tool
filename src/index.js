const $chart = document.getElementById("tester");
const $submit = document.getElementById("submit");
const $principal = document.getElementById("principal");

const getCharts = async (principal, risk) => {
  const response = await fetch(`/results?amount=${principal}&risk=${risk}`);

  return await response.json();
};

const initializeChart = data => {
  Plotly.plot($chart, data, {
    margin: { t: 0 },
    xaxis: {
      title: "Term"
    },
    yaxis: {
      title: "Dollars ($)"
    }
  });
};

const updateChart = data => {
  Plotly.update($chart, data);
};

const format = data => {
  const labelsAndKeys = {
    expected_savings: "Expected Savings",
    total_interest: "Total Interest",
    total_return: "Expected Return"
  };
  const terms = data.map(({ terms }) => terms);

  return Object.keys(labelsAndKeys).reduce(
    (memo, key) =>
      memo.concat({
        x: terms,
        y: data.map(entry => entry[key]),
        name: labelsAndKeys[key]
      }),
    []
  );
};

const main = async () => {
  const handleSubmit = async () => {
    const risk = document.querySelector('input[name="risk"]:checked').value;
    const data = await getCharts($principal.value, risk);

    updateChart(format(data));
  };

  const data = await getCharts(100000, "medium_risk");

  initializeChart(format(data));

  $submit.addEventListener("click", handleSubmit);
};

main();
