import styled from "styled-components";

import DownloadSvg from "@/assets/icons/download.svg";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        display: block;
        margin: auto;
        height: 100%;

        margin-right: 16px;

        path {
            stroke: var(--white);
        }
    }

    /*  @media (max-width: 991px) {
        svg {
          --size: 24px;
        }
      }
    
      @media (max-width: 576px) {
        svg {
          --size: 20px;
        }
      }*/
`;

const INSTALLY_EXE_URL = "https://github.com/estevao-alves/Instally/releases/download/main-release/Instally-V1.0.0.exe"

interface IActionButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    icon?: any,
    style?: {},
    downloadable?: boolean
}

export default function ActionButton({text, icon, style, downloadable = true}: IActionButton) {
    const downloadFile = (url: string) => {
        const fileName = url.split("/").pop() || "Instally.exe";
        const anchorTag = document.createElement("a");
        anchorTag.href = url;
        anchorTag.setAttribute("download", fileName);
        document.body.appendChild(anchorTag);
        anchorTag.click();
        anchorTag.remove();
    }

    return <Wrapper>
        <button className="cta" onClick={downloadable ? () => downloadFile(INSTALLY_EXE_URL) : () => {
        }} style={style}>
            {!icon ? <DownloadSvg/> : icon}
            {text || "Windows download"}
        </button>
    </Wrapper>
}