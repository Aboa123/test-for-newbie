import {
  useState,
  useEffect
} from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  fetchCoins
} from '../api';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 680px;
  margin: 0 auto;
`;
const Haeder = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul`
`;
const Coin = styled.li`
  background-color: #FFF;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Coins = () => {
  const {
    isLoading,
    data,
  } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Haeder>
        <Title>코인</Title>
      </Haeder>
      {
        isLoading ? (
          <Loader>
            Loading...
          </Loader>
        )
        :
        <CoinsList>
        {
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {
                  name: coin.name
                }
              }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  style={{}}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        }
        </CoinsList>
      }
    </Container>
  )
}

export default Coins;