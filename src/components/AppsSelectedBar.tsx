import { AppItemTypes } from "@/app/api/route";
import styled from "styled-components";

import TimesSVG from "@/assets/icons/times.svg";

const Wrapper = styled.div`
  background-color: var(--purple-gray);
  width: 100%;
  padding: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  
  .content {
    display: flex;
    align-items: center;
    width: 100%;
    --size: 60px;

    .apps {
      display: flex;
      padding-left: 14px;
      
      .item {
        background-color: rgb(60, 60, 70, .4);
        padding: 12px;
        margin-right: 10px;
        border-radius: 10px;
        
        width: 100%;
        max-width: var(--size);
        max-height: var(--size);

        position: relative;
        cursor: pointer;
        
        img {
          width: 100%;
          height: 100%;
          user-select: none;
        }
        
        svg {
          --size: 30px;

          height: var(--size);
          width: var(--size);
          min-width: var(--size);

          display: none;
          position: absolute;
          margin: auto;
          inset: 0;

          path {
            stroke: var(--white);
          }
        }
      }
        
      & > :hover {
        background: rgba(0,0,0,.4);

        img {
          position: relative;
          z-index: -1;
        }

        svg {
          display: block;
        }
      }
    }

    .install {
      background-color: var(--purple-violet);
      color: var(--white);
      height: 100%;
      margin-left: auto;
      margin-right: 20px;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

interface ComponentTypes {
  appList: AppItemTypes[],
  removeApp: (item: AppItemTypes) => void
}

export default function AppsSelectedBar({ appList, removeApp }: ComponentTypes) {
  
  return <Wrapper>
    <div className="content">
      <div className="apps">
        {appList.map((item, i: number) => {
          return <div key={i} className="item" onClick={() => removeApp(item)}>
            <img src={`/icons/${item.WingetId}.png`} />
            <TimesSVG />
          </div>
        })}
      </div>
      
      <button className="install">Beta coming soon</button>
    </div>
  </Wrapper>
}