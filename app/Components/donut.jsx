import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Donut({ budgetData }) {
  const { totalBudget, totalSpent, budgets } = budgetData;
  const chartRef = useRef(null);

  useEffect(() => {
    const centerText = {
      id: "centerText",
      beforeDraw(chart) {
        const { width, height, ctx } = chart;

        ctx.save();

        const line1 = `$${totalSpent}`;
        ctx.font = `bold 2rem sans-serif`;
        ctx.fillStyle = "#201f24";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(line1, width / 2, height / 2 - 10);

        const line2 = `of $${totalBudget} limit`;
        ctx.font = `normal 0.875rem sans-serif`;
        ctx.fillText(line2, width / 2, height / 2 + 15);

        ctx.restore();
      },
    };
    
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: budgets.map((budget) => budget.category),
        datasets: [
          {
            data: budgets.map((budget) => budget.maximum),
            backgroundColor: budgets.map((budget) => budget.theme),
            borderWidth: 0,
            weight: 1,
          },
          {
            data: budgets.map((budget) => budget.maximum),
            backgroundColor: budgets.map((budget) => `${budget.theme}80`),
            borderWidth: 0,
            weight: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "65%",
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [centerText],
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-60 h-60 " >
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
