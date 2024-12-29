import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 60px;

  @media (max-width: 768px)
  {
    padding: 0 45px;
  }
  
  @media (max-width: 576px)
  {
    padding: 0 30px;
  }
`;