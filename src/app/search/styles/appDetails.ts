import styled from "styled-components";

export const Wrapper = styled.div<{isAppBarActive: boolean}>`
  width: 400px;
  max-width: 400px;
  max-height: calc(96vh - ${({ isAppBarActive }) => isAppBarActive ? "80px" : "0px" });
  margin-left: 20px;
  
  top: 2vh;
  bottom: 0;
  position: sticky;
  overflow: auto;
  
  background: var(--purple-gray);
  border-radius: 20px;

  .close {
    --size: 40px;
    width: var(--size);
    min-width: var(--size); 
    height: var(--size);

    top: 5px;
    right: 5px;
    padding: 10px;
    position: absolute;
    cursor: pointer;

    background: radial-gradient(#00000033 55%, transparent 60%);
    border-end-start-radius: 20px;

    path {
      stroke: var(--white);
    }

    &:hover {
      background: radial-gradient(var(--purple-dark-gray) 55%, transparent 60%);
    }
  }

  .content {
    padding: 40px;
  }

  .ogImage {
    background-color: #444;
    background-size: cover;
    width: calc(100% + 80px);
    height: auto;
    margin: -40px;
    margin-bottom: 40px;
    aspect-ratio: 1.91/1;
  }

  img {
    height: 60px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .rightContent {
      display: flex;
      flex-direction: column;
      text-align: end;
      
      span {
        width: 100%;
      }
    }
  }

  .tagsSvg {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      margin-left: 20px;
    }

    svg {
      height: 24px;
      width: 24px;
    }

    path {
      stroke: var(--white);
    }
  }
  
  .description {
    margin: 20px 0;
  }

  .tags {
    gap: 10px;
    display: grid;
    grid-template-columns: auto auto;
    text-align: center;
    
    p {
      background-color: var(--purple-dark-gray);
      padding: 5px 20px;
      border-radius: 10px;
      width: fit-content;
    }
  }

  @media (min-width: 577px) {
    &::-webkit-scrollbar {
      background: var(--purple-gray);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #1e1d22;

      &:hover {
        background-color: var(--purple-dark-gray);
      }
    }
  }
`;