import styled from "styled-components";

import { Container } from "@/styles/layout"

import BoxesSvg from "@/assets/boxes.svg"
import LogoSoloSvg from "@/assets/logo-solo.svg"

const Wrapper = styled.div`
  background-color: var(--purple-violet);
  padding: 180px 0;
  
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .leftContent {
      max-width: 420px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }

    .logoSolo {
      width: 350px;
      max-width: 350px;
      height: 564px;
    }

    h2 {
      color: var(--purple-dark-gray);
      font-size: 65px;
      font-weight: 800;
    }

    p {
      margin: 80px 0;
      max-width: 450px;
      font-size: 24px;
    }
  }

  .boxes {
    max-width: 350px;
    max-height: 560px;
  }

  @media (max-width: 1200px) {
    padding: 120px 0;

    .content {
      .leftContent {
      max-width: 400px;
    }

      h2 {
        font-size: 60px;
      }

      p {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 991px) {
    padding: 80px 0;
    overflow: hidden;

    .content {
      margin: 0 auto;

      justify-content: center;
      flex-direction: column-reverse;

      .leftContent {
        max-width: initial;
        align-items: center;
      }
      
      .text {
        max-width: initial;

        display: flex;
        flex-direction: column;
        align-items: center;
      }

      h2 {
        font-size: 45px;
        text-align: center;
      }
      
      p {
        max-width: 600px;

        margin: 25px;
        text-align: center;
      }
    }

    .boxes {
      width: 100%;
      margin-left: 40px;
      margin-bottom: -20px;
    }
  }
  
  @media (max-width: 768px) {
    .content {
      p {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 640px) {
    .content {
      h2 {
        font-size: 40px;
      }
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 40px;

    .content {

      h2 {
        max-width: 260px;
      }
      p {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    padding-bottom: 50px;
  }
`;

export default function Section2() {
  return <Wrapper>
    <Container>
        <div className="content">
          <div className="leftContent">
            <div className="text">
              <LogoSoloSvg className="logoSolo" />
              <p>Instally representa nossa missão pela simplificação da vida digital. Criamos esta plataforma com um objetivo claro: proporcionar uma experiência de instalação de aplicativos mais inteligente e eficaz.</p>
              <p>Acreditamos que a instalação manual de aplicativos é uma tarefa que consome tempo e energia desnecessários, a Instally nasceu do propósito de que a tecnologia deve ser uma aliada, não uma barreira.</p>
            </div>
          </div>
          <BoxesSvg className="boxes" />
        </div>
    </Container>
  </Wrapper>
};