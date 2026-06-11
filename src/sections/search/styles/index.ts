import styled from "styled-components";

export const Wrapper = styled.div<{ isInfoSidebarVisible: boolean }>`
  background-color: var(--purple-dark-gray);
  padding: 80px 0;
  min-height: 100vh;
  
  .appList {
    margin: 0 ${({isInfoSidebarVisible}) => isInfoSidebarVisible ? "0" : "-100px"};
    display: grid;
    grid-template-columns: 1fr auto;
  }

  h2, h3 {
    text-align: center;
  }
  
  h2 {
    font-size: 30px;
  }

  h3 {
    font-weight: 400;
  }

  .searchOptions {
    display: flex;
    margin: 50px 0;
    gap: 30px;
    height: 50px;

    label {
      position: absolute;
      top: -25px;
      left: 5px;
      color: var(--gray);
      font-size: 14px;
    }

    button {
        height: 100%;
    }
    
    .filters {
      display: flex;
      
      .dialogButton {
        background-color: var(--purple-gray);
        
        min-width: 180px;
        padding: 0 20px;
        border-radius: 10px;
        gap: 20px;

        font-size: 14px;
        font-weight: bold;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          text-align: left;
        }

        svg {
          width: 20px;
          
          path {
            stroke: var(--white);
          }
        }
      }
      
      dialog {
        background-color: var(--purple-gray);
        border-color: var(--purple-dark-gray);
        border-radius: 10px;
        
        width: inherit;
        
        position: absolute;
        overflow: hidden;
        
        button {
          background-color: initial;

          width: 100%;
          
          font-size: 14px;
          font-weight: bold;
          text-align: left;

          display: flex;
          flex-direction: column;

        }
  
        & > * {
          padding: 10px;
          padding-left: 20px;
          
          &:hover {
            background-color: #282828;
          }
        }
      }
    }

  .searchBox {
      --radius: 25px;
      
      width: 100%;
      background-color: var(--purple-gray);
      border-radius: var(--radius);
      display: flex;
    
    .searchButton {
      background-color: transparent;
      padding-right: 24px;
      border-radius: var(--radius);
      
      svg {
        max-width: 100px;
        max-height: 100px;
        height: 100%;

        padding: 12px;
        padding-left: 18px;
  
        &:hover {
          cursor: pointer;
        }
        
        path {
          stroke: #757575;
        }
      }
    }
  }

    input {
      background-color: transparent;
      color: var(--gray);
      caret-color: var(--gray);
      width: 100%;
      padding: 14px 24px;
    }
  }

  .searchMore {
    display: flex;

    margin: 0 auto;
    margin-top: 30px;
    padding: 15px 20px;
    
    background-color: var(--purple-gray);
    color: var(--white);
    border-radius: 10px;

    &:hover {
      opacity: 80%;
    }
  }

  @media (max-width: 1680px) {
    .appList {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    h2 {
      max-width: 350px;
      margin: 0 auto;
    }
  }

  @media (max-width: 576px) {
    h2 {
      font-size: 24px;
      max-width: 300px;
    }
  }
`;