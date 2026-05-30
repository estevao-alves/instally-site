import ActionButton from "@/components/ActionButton"
import {Container} from "@/styles/layout"
import {styled} from "styled-components"

const Wrapper = styled.div`
  padding: 120px 0;

  background-image: url("/appsDropping.png");
  background-color: var(--purple-dark-gray);
  background-repeat: no-repeat;
  background-origin: border-box;
  background-position: 50% 50%;

  h2 {
    color: var(--white);
    margin: 0 auto 60px auto;

    font-size: 55px;
    font-weight: 800;
    text-align: center;

    span {
      color: var(--pink);
    }
  }

  @media (max-width: 1200px) {
    padding: 120px 0;
    
    h2 {
      font-size: 50px;
    }
  }

  @media (max-width: 991px) {
    padding: 80px 0 40px 0;

    background-image: url("/appsDroppingMobile.png");
    background-size: 105%;
    background-size: contain;
    
    h2 {
      font-size: 45px;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    background-position: 50% -50%;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 40px;
    }
  }

  @media (max-width: 576px) {
    background-size: 120%;
    background-position: 50% 20%;

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
      max-width: 280px;
      margin: 0 auto;
      margin-bottom: 30px;
      font-size: 25px;
    }
  }
`;


export default function Section5() {
    return <Wrapper>
        <Container>
            <div className="content">
                <h2>Make it simple, <span>Instally</span> and Enjoy!</h2>
                <ActionButton hasDropdown={true} />
            </div>
        </Container>
    </Wrapper>
};