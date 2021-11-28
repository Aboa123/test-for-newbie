import { useParams } from "react-router";

interface Params {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<Params>();

  return (
    <div>Coin: {coinId}</div>
  )
}

export default Coin;