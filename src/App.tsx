import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

const Title = styled.div`
  font-size: 80px;
  color: ${props => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.bgColor};
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 16px;
`;
const Input = styled.button.attrs({ required: true })`
  background-color: tomato;
`;
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.span`
  color: white;
`;

const AnimationBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 5s linear infinite;
  ${Emoji} {
    font-size: 36px;
    &:hover {
      font-size: 50px;
      color: blue;
      cursor: pointer;
    }
    &:active {
      display: none;
    }
  }
`;

const App = () => {
  const [name, setName] = useState("");
  
  const onChnage = (event: React.FormEvent<HTMLInputElement>) => {
    const {
       currentTarget: { value }
    } = event;
    setName(value);
  }
  
  const onSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`Hello ${name}!`)
  }

  return (
    <Wrapper>
      <Title>Hello</Title>
      <Btn>Login</Btn>
      <Btn as="a" href="https://www.naver.com" target="blank">
        regist
      </Btn>
      <Input />
      <Input />
      <AnimationBox>
        <Emoji>^O^</Emoji>
      </AnimationBox>
      <Circle bgColor="teal" borderColor="#FFF" />
      <Circle bgColor="green" text="send some text" />
      <form onSubmit={onSubmit}>
        <input
          value={name}
          onChange={onChnage}
          type="text"
          placeholder="write your name"
        />
        <button>Log in</button>
      </form>
    </Wrapper>
  );
}

export default App;
