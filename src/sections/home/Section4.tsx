import {Container} from "@/styles/layout"
import {styled} from "styled-components"

import AppExampleSvg from "@/assets/app-example.svg"

const Wrapper = styled.div`
  padding: 120px 0;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .appExample {
    max-height: 500px;
    margin-bottom: -50px;
  }

  h2 {
    color: var(--purple-dark-gray);
    margin-bottom: 60px;

    font-size: 55px;
    font-weight: 800;
    text-align: center;

    span {
      color: var(--purple-violet);
    }
  }

  @media (max-width: 1200px) {
    padding: 120px 0;
    
    h2 {
      font-size: 50px;
    }
  }

  @media (max-width: 991px) {
    padding: 80px 0;
    
    h2 {
      font-size: 45px;
      text-align: center;
    }
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 40px;
    }
  }

  @media (max-width: 576px) {
    h2 {
      font-size: 35px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 30px;
    }

    .appExample {
      margin-bottom: -20px;
    }
  }

  @media (max-width: 380px) {
    h2 {
      max-width: 300px;
      margin: 0 auto;
      margin-bottom: 30px;
      font-size: 28px;
    }
  }
`;

export default function Section4() {
    return <Wrapper>
        <Container>
            <div className="content">
                <h2>More speed, <span>Less work.</span></h2>
                <AppExampleSvg className="appExample"/>
            </div>
        </Container>
    </Wrapper>
};