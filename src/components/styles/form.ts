import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--white);
  padding: 120px 0;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      max-width: 350px;
      font-size: 24px;
      color: var(--purple-dark-gray);
    }
    
    p {
      color: var(--purple-dark-gray);
    }
  }

  .form {
    max-width: 460px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    input {
      background-color: var(--medium-gray);
      padding: 20px 30px;
      font-size: 18px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
  
    input:focus {
      outline: solid;
      outline-width: 2px;
      outline-color: var(--purple-simple);
    }

    .message {
      padding-bottom: 120px;
    }

    /*.cta {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
    }*/
  }

  @media (max-width: 1200px) {
    padding: 80px 0;

    .title {
      h2 {
        padding: 20px 0;
      }

      p {
        padding-bottom: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    h2 {
      padding-top: 0;
      max-width: 400px;
    }
  }

  @media (max-width: 576px) {
    h2 {
      padding-top: 0;
      max-width: 400px;
      font-size: 22px;
    }
  }
`;