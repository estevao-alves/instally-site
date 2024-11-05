import styled from "styled-components";

import DownloadSVG from "@/assets/icons/download.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  
  svg {
    --size: 28px;
    
    max-width: var(--size);
    width: var(--size);
    height: var(--size);
    margin-right: 16px;
    
    path {
      stroke: var(--white);
    }
  }

  @media (max-width: 991px) {
    svg {
      --size: 24px;
    }
  }

  @media (max-width: 576px) {
    svg {
      --size: 20px;
    }
  }
`;

interface IActionButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  icon?: any,
  style?: {}
}

export default function ActionButton({text, icon, style}: IActionButton) {
  return <Wrapper>
    <button className="cta" style={style}>
      {icon !== false ? <DownloadSVG /> : <></> }
      {text || "Beta coming soon"}
      </button>
  </Wrapper>
}