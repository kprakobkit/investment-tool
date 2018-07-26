const $chart = document.getElementById("tester");
const $submit = document.getElementById("submit");
const $principal = document.getElementById("principal");

const getCharts = async (principal, risk) => {
  const response = await fetch(`/returns?principal=${principal}&risk=${risk}`);

  return JSON.parse(await response.json());
};

const plotChart = data => {
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

const format = data => {
  const labelsAndKeys = {
    expected_savings: "Expected Savings",
    total_interest: "Total Interest",
    total_return: "Total Return",
    total_invested: "Total Invested"
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
    const data = await getCharts($principal.value);

    plotChart(format(data));
  };

  $submit.addEventListener("click", handleSubmit);
};

main();
