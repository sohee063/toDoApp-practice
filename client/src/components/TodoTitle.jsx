import React from "react";
import styled from "styled-components";

const TodoTitle = () => {
  return <MainTitle>Today I'll do.</MainTitle>;
};

const MainTitle = styled.div`
  font-size: 6rem;
  color: #fcf8e8;
  text-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
  text-align: center;
  margin-bottom: 4rem;
`;

export default TodoTitle;
