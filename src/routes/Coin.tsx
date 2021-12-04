import {
  useState,
  useEffect
} from 'react';
import { useLocation, useParams, Switch, Route, useRouteMatch } from "react-router";
import styled from "styled-components";
import Price from './Price';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import {
  Helmet
} from 'react-helmet';
import {
  useQuery
} from 'react-query';
import {
  fetchCoinInfo,
  fetchCoinTicker
} from '../api';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 680px;
  margin: 0 auto;
`;
const Haeder = styled.header`
  position: relative;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  align-items: center;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  span:first-child {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-decoration: uppercase;
  font-size: 22px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme?.accentColor : props.theme?.textColor};
  a {
    display: block;
  }
`;

const BackButton = styled.div`
  display: inline-block;
  position: absolute;
  left: 0px;
  font-size: 50px;
`;

interface Params {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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

const Coin = () => {
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();
  const priceMath = useRouteMatch("/:coinId/price");
  const chartMath = useRouteMatch("/:coinId/chart");

  const {
    isLoading: infoLoading,
    data: infoData,
  } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const {
    isLoading: tickersLoading,
    data: tickersData
  } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTicker(coinId),
    {
      refetchInterval: 2000
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Haeder>
        <BackButton>
          <Link to={"/"}>
            {"<"}
          </Link>
        </BackButton>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Haeder>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMath !== null}>
              <Link to={`/${coinId}/chart`}>
                chart
              </Link>
            </Tab>
            <Tab isActive={priceMath !== null}>
              <Link to={`/${coinId}/price`}>
                price
              </Link>
            </Tab>
          </Tabs>
          
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price tickersData={tickersData} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default Coin;