import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTicker } from "../api";
import ApexChart from 'react-apexcharts';
import styled from "styled-components";

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

interface IPriceProps {
  tickersData?: IPriceData
}

const InfoBox = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 20px 10px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.textColor};
  margin: 20px 0px;
  span {
    width: 200px;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;


const Price = ({tickersData}: IPriceProps) => {
  return(
    <div>
      <InfoBox>
        <span>
          코인이름
        </span>
        {`${tickersData?.name} (${tickersData?.symbol})`}
        <Img
          src={`https://cryptoicon-api.vercel.app/api/icon/${tickersData?.symbol.toLocaleLowerCase()}`}
        />
      </InfoBox>
      <InfoBox>
        <span>
          현재 가격
        </span>
        {tickersData?.quotes.USD.price}
      </InfoBox>
      <InfoBox>
        <span>
          발급날짜
        </span>
        {tickersData?.first_data_at.substr(0, 10)}
      </InfoBox>
      <InfoBox>
        <span>
          마지막 업데이트
        </span>
        {tickersData?.last_updated}
      </InfoBox>
    </div>
  )
}

export default Price;