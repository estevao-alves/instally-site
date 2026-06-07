import styled from "styled-components";

export const Wrapper = styled.div`

  .searchResult {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 20px;
    position: relative;
    user-select: none;
 
    .loading {
      height: 18px;
      width: 18px;
      background-color: var(--white);
      border-radius: 50%;
      top: 30px;
      left: 0;
      right: 0;
      position: absolute;
      
      @keyframes rotate {
        0% {
          transform: rotate(0deg) scale(0.5);
        };
        50% {
          transform: rotate(180deg) scale(1);
        };
        100% {
          transform: rotate(360deg) scale(0.5);
        };
      }

      transform-origin: 50% -50%;
    
      animation: rotate 1s linear infinite;
    }

  
  .item {
    min-height: 210px;
    background-color: var(--purple-gray);
    padding: 30px 40px;
    border-radius: 24px;
    gap: 20px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    position: relative;

    &.selected {
      outline: var(--green) solid 2px;
      opacity: 80%;
    }

    .clickArea {
      min-height: inherit;
      width: 100%;
      inset: 0;
      border-radius: inherit;
      position: absolute;
      z-index: 2;
    }

    .icon, img {
      height: 60px;
      position: relative;
      user-select: none;

        span {
          background-color: var(--purple-dark-gray);
          height: 60px;
          width: 60px;
          padding: 2px;
          border-radius: 50%;
          color: var(--gray);
          
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 22px;
          font-weight: bolder;

          inset: 0;
        }
      }

      &:hover {
        .infoSvg {
          display: block;
        }
      }
  
      &:hover {
        opacity: 80%;
      }
    }

    h3 {
      width: 100%;
      font-size: 18px;
      text-align: center;
      text-overflow: ellipsis;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .infoSvg {
      display: none;
      width: 50px;
      height: 50px; 
      padding: 10px;
      right: 0;
      top: 0;
      border-radius: inherit;
      position: absolute;
      z-index: 3;

      path {
        stroke: var(--white);
      }
    }

    .infoSvg.active {
      display: block;
      background-color: var(--blue);
      
      &::after {
        content: '';
        position: absolute;
        height: 100px;
        width: 100px;
        background-color: red;
      }
    }
  }
`;