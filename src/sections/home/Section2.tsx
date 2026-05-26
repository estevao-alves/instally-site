import ActionButton from "@/components/ActionButton"
import {Container} from "@/styles/layout"
import {styled} from "styled-components"

import CollectionsSvg from "@/assets/collections.svg"

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 120px 0;
  
  .content {
    display: flex;
    align-items: center;
    
    .text {
      max-width: 550px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: baseline;
    }

    h2 {
      color: var(--purple-violet);
      font-size: 62px;
      font-weight: 800;
      
      span {
        color: var(--purple-dark-gray);
      }
    }
  
    p {
      margin: 30px 0;
      color: var(--purple-dark-gray);
      font-size: 20px;
    }
  }

  svg.collection {
    margin-right: -190px;
  }
  
  @media (max-width: 1600px) {
    svg.collection {
      margin-right: -100px;
    }
  }

  @media (max-width: 1400px) {
    .leftContent {
      width: 680px;
    }

    svg.collection {
      margin-right: -50px;
    }
  }
  
  @media (max-width: 991px) {
    padding-bottom: 0;
    overflow: hidden;

    .leftContent {
      width: auto;
    }

    .content {
      margin: 0 auto;
      gap: 40px;

      justify-content: center;
      flex-direction: column;

      .text {
        align-items: center;
      }
      
      h2 {
        font-size: 55px;
        text-align: center;
      }
      
      p {
        text-align: center;
      }
    }

    svg.collection {
      width: 100%;
      margin: 0 0 -100px 20px;
    }
  }
  
  @media (max-width: 768px) {
    padding-top: 80px;

    .content {
      p {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 640px) {
    padding-bottom: 30px;

    .content {
      h2 {
        font-size: 45px;
      }
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 40px;

    .content {
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
                        <h2>Create your <span>collections.</span></h2>
                        <p>Organize your apps into collections. Keep your apps organized, updated and always at hand</p>
                    </div>
                </div>
                <CollectionsSvg className="collection"/>
            </div>
        </Container>
    </Wrapper>
};