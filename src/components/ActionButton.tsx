'use client'

import styled from "styled-components";

import DownloadSvg from "@/assets/icons/download.svg";
import { sendGAEvent } from "@next/third-parties/google";

export type Size = "small" | "medium" | "large";

const Wrapper = styled.div<{ size?: Size }>`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        display: block;
        margin: auto 16px auto auto;

        path {
            stroke: var(--white);
        }
    }

    ${({ size }) => size == "large" &&`
        .cta {
            padding: 14px 38px;
            font-size: 20px;
        }
        
        svg {
            height: 26px;
        }
    `};

    ${({ size }) => size == "medium" &&`
        .cta {
            padding: 10px 25px;
            font-size: 16px;
        }
    
        svg {
            height: 20px;
        }
    `};

    ${({ size }) => size == "small" &&`
        .cta {
            padding: 6px 20px;
            font-size: 12px;
        }
    
        svg {
            height: 16px;
            margin-right: 10px;
        }
    `};

    @media (max-width: 576px) {
        ${({ size }) => size == "large" &&`
            .cta {
                padding: 10px 25px;
                font-size: 16px;
            }
        
            svg {
                height: 20px;
            }
        `};

        ${({ size }) => size == "medium" &&`
            .cta {
                padding: 6px 20px;
                font-size: 12px;
            }
        
            svg {
                height: 16px;
                margin-right: 10px;
            }           
        `};
    }
`;

const INSTALLY_EXE_URL = "https://github.com/estevao-alves/Instally/releases/download/main-release/Instally-V1.0.0.exe"

interface IActionButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    icon?: any,
    style?: {},
    downloadable?: boolean,
    size?: Size
}

export default function ActionButton({text, icon, style, size = "large", downloadable = true}: IActionButton) {
    const downloadFile = (url: string) => {
        const fileName = url.split("/").pop() || "Instally.exe";
        const anchorTag = document.createElement("a");
        anchorTag.href = url;
        anchorTag.setAttribute("download", fileName);
        document.body.appendChild(anchorTag);
        sendGAEvent({ eventName: "Download", url: url });
        anchorTag.click();
        anchorTag.remove();
    }

    return <Wrapper size={size}>
        <button className="cta" onClick={downloadable ? () => downloadFile(INSTALLY_EXE_URL) : () => {
        }} style={style}>
            {downloadable ? <DownloadSvg/> : icon}
            <span>{text || "Windows download"}</span>
        </button>
    </Wrapper>
}