import styled from "styled-components";

import TimesSVG from "@/assets/icons/times.svg";
import ActionButton from "./ActionButton";
import { Package } from "@/services/packages/types";
import { PackageIcon } from "@/sections/search/apps";

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
  z-index: 99;
  
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    --size: 60px;

    .apps {
      display: flex;
      padding-left: 14px;
      overflow: scroll;
      width: 100%;
      
      .item {
        flex-shrink: 0;
        background-color: rgb(60, 60, 70, .4);
        padding: 12px;
        margin-right: 10px;
        border-radius: 10px;
        width: 100%;
        aspect-ratio: 1 / 1;
        
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
  }
`;

interface ComponentTypes {
    appList: Package[],
    removeApp: (item: Package) => void
}

export default function AppsSelectedBar({appList, removeApp}: ComponentTypes) {
    return <Wrapper>
        <div className="content">
            <div className="apps">
                {appList.map((item, i: number) => {
                    return <div key={i} className="item" onClick={() => removeApp(item)}>
                        <PackageIcon item={item} />
                        <TimesSVG/>
                    </div>
                })}
            </div>

            <div>
              <ActionButton
                  style={{padding: "12px 30px", borderRadius: "8px", marginRight: "20px"}}
                  customText="Instally"
                  />
            </div>
        </div>
    </Wrapper>
}