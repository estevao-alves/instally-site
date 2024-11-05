import styled from "styled-components"

import { Container } from "@/styles/layout"

import InstallyGrayLogoSvg from "/public/installyGrayLogo.svg"
import BrasilIconSvg from "/public/brazilFlag.svg"

const Wrapper = styled.div`
  padding: 60px 0;
  background: var(--purple-dark-gray);
  position: relative;

  .businessAndLinks {
    gap: 18px;

    display: flex;
    flex-direction: column;

    .installyGrayLogo {
      width: 260px;
      height: 100px; 
    }

    h3 {
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 10px;
    }

    .number {
      display: flex;
      gap: 6px;
      
      .brasilIcon {
        margin-top: 1px;
        height: 20px;
        width: 20px;
      }
    }
  }

  span {
    font-weight: 300;
  }
  
  .author {
    display: flex;
    
    padding: 50px 0 0 0;
    justify-content: space-between;

    span {
      margin-right: 10px;
    }
  }

  @media (max-width: 991px) {
    .author {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 18px !important;
    }

    span {
      font-size: 14px;
    }
  }
`;

export default function Footer() {
  return <Wrapper>
    <Container>
      <div className="content">
          <div className="businessAndLinks">
            <div className="installyGrayLogo"><InstallyGrayLogoSvg /></div>
            {/*<h3>Follow me</h3>*/}
            <span>estevaoalvescg@gmail.com</span>
            <div className="number">
              <div className="brasilIcon"><BrasilIconSvg /></div>
              <span>+55 (35) 99808-4139</span>
            </div>
          </div>
      </div>

      <div className="author">
        <span>Made with 💜 by <strong>Estevão Alves</strong></span>
      </div>
    </Container>
  </Wrapper>
};