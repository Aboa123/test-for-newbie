import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
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

const Chart = ({coinId}: IChartProps) => {
  const {
    isLoading,
    data
  } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {
        isLoading ?
        "Loading chart..."
        :
        <ApexChart
          type={"candlestick"}
          series={[
            {
              data: data?.map(price => ({
                x: price.time_close,
                y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]
              }))
            }
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
            yaxis: {
              labels: {
                formatter: (value) => value.toFixed(0)
              }
            },
            xaxis: {
              type: "datetime",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
          }}
        />
      }
    </div>
  );
}

export default Chart;