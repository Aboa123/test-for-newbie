import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTicker } from "../api";
import ApexChart from 'react-apexcharts';

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IChartProps {
  coinId: string;
}

const Chart = ( {coinId} :IChartProps ) => {
  const {
    isLoading,
    data
  } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  return (
    <div>
      {
        isLoading ?
        "Loading chart..."
        :
        <ApexChart
          type={"line"}
          series={[
            {
              name: "sales",
              data: data?.map(price => price.close),

            },
          ]}
          options={{
            theme: {
              mode: "dark"
            },
            chart: {
              height: 500,
              width: "100%",
              toolbar: {
                show: false,
              },
              background: "tranparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map(price => price.time_close)
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#b74aff"], stops: [0, 100] }
            },
            colors: ["#37f8a8"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`
              },
              x: {

              }
            }
          }}
        />
      }
    </div>
  );
}

export default Chart;