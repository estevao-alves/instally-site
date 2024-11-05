import styled from "styled-components";

import ActionButton from "@/components/ActionButton";
import { Container } from "@/styles/layout";

const Wrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 180px;
  min-height: calc(90vh - 100px);
  
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  background-image: url("/shine-stars.png");
  background-color: var(--white);
  background-repeat: no-repeat;
  background-origin: border-box;
  background-position: 50% 20%;

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

      color: var(--purple-dark-gray);

      span {
        color: var(--purple-simple);
        }
      }

    p {
      text-align: center;

      color: var(--purple-dark-gray);
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
    padding: 80px 0 40px 0;
    min-height: 900px;

    background-image: url("/shine-stars.png");
    background-size: 105%;
    background-size: contain;
    
  }
  
  @media (max-width: 768px) {
    min-height: 850px;
    padding-top: 60px;
    
    background-position: 50% -50%;

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
    background-size: 120%;
    background-position: 50% 20%;

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

export default function Section3() {
  return <Wrapper>
    <Container>
      <div className="content">
        <h2>Faça parte da nossa <span>família Instally.</span></h2>
        <p>Queremos que você faça parte da nossa jornada de inovação. Explore a Instally, compartilhe suas ideias e sugestões, e faça parte da nossa comunidade que busca simplificar a tecnologia.</p>
        <ActionButton text={"Baixar Agora"} icon={false} style={{backgroundColor: "#1a1a1a", padding: "20px 100px"}} />
      </div>
    </Container>
  </Wrapper>
}