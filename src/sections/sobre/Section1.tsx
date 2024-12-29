import ActionButton from "@/components/ActionButton";
import { Container } from "@/styles/layout";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--purple-dark-gray);
  padding-top: 100px;
  padding-bottom: 180px;
  min-height: calc(90vh - 100px);
  
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  .content {
    margin: 0 auto;
    max-width: 700px;
    gap: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 60px;
      font-weight: 800;

      text-align: center;

      span {
        color: var(--purple-simple);
        }
      }

    p {
      text-align: center;
    }
  }

  @media (max-width: 1400px) {
    min-height: 50vw;
  }

  @media (max-width: 1200px) {
    min-height: 750px;
    padding-top: 100px;
    align-items: baseline;
  
    .content {
      max-width: 600px;
      h2 {
        font-size: 55px;
      }
    }
  }

  @media (max-width: 991px) {
    min-height: 900px;
  }
  
  @media (max-width: 768px) {
    min-height: 850px;
    padding-top: 60px;

    .content {
      max-width: 500px;

      h2 {
        font-size: 50px;
      }
      p {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 576px) {
    .content {
      max-width: 420px;
      h2 {
        font-size: 45px;
      }
      p {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    padding-top: 50px;
    min-height: 750px;

    .content {
      max-width: 380px;
      h2 {
        font-size: 36px;
      }

      p {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 380px) {
    min-height: 720px;

    .content {
      max-width: 380px;
      h2 {
        font-size: 30px;
      }
    }
  }
`;

export default function Section1() {
  return <Wrapper>
    <Container>
      <div className="content">
        <h2>Nossa <span>Missão.</span></h2>
        <p>A missão no Instally é transformar a forma como as pessoas instalam, organizam e gerenciam seus aplicativos, tornando o processo mais eficiente, intuitivo e prático.</p>
        <ActionButton />
      </div>
    </Container>
  </Wrapper>
}