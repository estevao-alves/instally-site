'use client'

import styled from "styled-components";

import WindowsSvg from "@/assets/icons/windows.svg";
import LinuxSvg from "@/assets/icons/linux.svg";
import DownloadSvg from "@/assets/icons/download.svg";
import ArrowDownSVG from "@/assets/icons/arrow-down.svg";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Size = "small" | "medium" | "large";

const Wrapper = styled.div<{ $size?: Size; $hasDropdown?: boolean}>`
    position: relative;
    display: flex;
    align-items: stretch;
    width: fit-content;
    margin: 0 auto;
    
    z-index: 10;

    opacity: 0;
    scale: .9;
    transform: translateY(5px);
    transition: opacity 300ms ease, transform 300ms ease;
    
    &.os-ready {
        scale: 1;
        opacity: 1;
        transform: translateY(0);
    }

    .cta {
        display: flex;
        align-items: center;
        gap: 18px;
        white-space: nowrap;
        margin-right: 6px;
            
        ${({ $hasDropdown }) => !$hasDropdown && `border-radius: 22px`}
    }

    .dialog-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--purple-violet);
        border-top-right-radius: 22px;
        border-bottom-right-radius: 22px;

        transition: 200ms ease-in-out;

        
        svg {
            padding: 8%;
            margin: 10px;

            path {
                stroke: var(--white);
            }
        }
        
        &:hover {
            transform: scale(1.02);
            background-color: #443176 !important;
        }
    }

    dialog {
        position: absolute;

        top: calc(100% + 8px);

        width: 100%;

        border: 1px solid rgba(255,255,255,.08);
        border-radius: 12px;

        background: var(--purple-gray);

        &::backdrop {
            background: transparent;
        }

        .option {
            width: 100%;
    
            display: flex;
            align-items: center;
    
            background: transparent;
            color: var(--white);
    
            transition: background .15s ease;
    
            svg {
                display: flex;
                align-items: center;
    
                margin-right: 20px;
            }
    
            .file-extension {
                margin-left: auto;
            }
    
            &:hover {
                background: rgba(255,255,255,.06);
            }
    
            &.active {
                background: rgba(255,255,255,.08);
            }
        }
    }

    ${({ $size }) => $size == "large" &&`
        .cta {
            padding: 14px 30px;
            font-size: 20px;
        }

        .option {
            padding: 14px 18px;
            font-size: 16px;
        }

        svg {
            height: 26px;
        }
    `};

    ${({ $size }) => $size == "medium" &&`
        .cta {
            padding: 10px 20px;
            font-size: 16px;
        }

        .option {
            padding: 12px 14px;
            font-size: 14px;
        }

        svg {
            height: 20px;
        }
    `};

    ${({ $size }) => $size == "small" &&`
        .cta {
            padding: 6px 20px;
            font-size: 12px;
        }
    
        .option {
            padding: 10px 14px;
            font-size: 12px;
        }
    
        svg {
            height: 16px;
        }
    `};
`;

type OS = "Windows" | "Linux";

type DownloadOption = {
    os: OS;
    label: string;
    text: string;
    url: string;
    icon: React.ReactNode;
};

const DOWNLOAD_OPTIONS: DownloadOption[] = [
    {
        os: "Windows",
        label: "Portable .exe",
        text: "Windows Download",
        url: "https://release-assets.githubusercontent.com/github-production-release-asset/911751055/9a15c6a4-eb1a-43ed-8016-500f15ebdd13?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-06-07T02%3A29%3A51Z&rscd=attachment%3B+filename%3DInstally-v1.1.0.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-06-07T01%3A29%3A25Z&ske=2026-06-07T02%3A29%3A51Z&sks=b&skv=2018-11-09&sig=3nyTw79owFAbLCfhXE268UeJ%2BcZNfJkcS01V%2FvK%2BlD0%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc4MDc5ODE1NiwibmJmIjoxNzgwNzk2MzU2LCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.vTXXGSrYVt9Y0J4TAJs84gQHez1qiXKL4DFvEdeDcrc&response-content-disposition=attachment%3B%20filename%3DInstally-v1.1.0.exe&response-content-type=application%2Foctet-stream",
        icon: <WindowsSvg />
    },

    {
        os: "Linux",
        label: "AppImage",
        text: "Linux Download",
        url: "https://release-assets.githubusercontent.com/github-production-release-asset/911751055/8987df9c-9db2-48ff-9c74-1c53de04769d?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-06-07T02%3A08%3A12Z&rscd=attachment%3B+filename%3DInstally-v1.1.0.AppImage&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-06-07T01%3A07%3A14Z&ske=2026-06-07T02%3A08%3A12Z&sks=b&skv=2018-11-09&sig=sbQiiQU7n3cy%2BIS1f9zkkuyHCajr55lvcrL4llxzuqQ%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc4MDc5Njk1OSwibmJmIjoxNzgwNzk1MTU5LCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.iDi5gSOT9faH-U0aLuA4ZwLBDHuFXmhscEBQCtYOoEA&response-content-disposition=attachment%3B%20filename%3DInstally-v1.1.0.AppImage&response-content-type=application%2Foctet-stream",
        icon: <LinuxSvg />
    },
];

interface IActionButton {
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    size?: Size;
    hasDropdown?: boolean;
    customText?: string;
    downloadable?: boolean;
}

export default function ActionButton({icon, style, hasDropdown, customText, downloadable, size = "large"}: IActionButton) {
    
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    const [osReady, setOsReady] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = DOWNLOAD_OPTIONS[selectedIndex];
    
    //------- Detect OS
    useLayoutEffect(() => {
        function detectOS(): OS {
            if (typeof window === "undefined")
                return "Windows";
            
            return navigator.userAgent.toLowerCase().includes("linux")
            ? "Linux"
            : "Windows";
        }
        
        const detectedOS = detectOS();
        
        const defaultIndex = DOWNLOAD_OPTIONS.findIndex(
            option => option.os === detectedOS
        );
        
        if (defaultIndex >= 0) {
            setSelectedIndex(defaultIndex);
        }

        setOsReady(true);
    }, []);
    /// -----

    const toggleDropdown = () => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        dialog.open
            ? dialog.close()
            : dialog.show();
    };

    const handleDownload = () => {
        sendGAEvent({
            eventName: "Download",
            url: selected.url
        });

        const isDirectFile =
            selected.url.endsWith(".exe") ||
            selected.url.endsWith(".deb") ||
            selected.url.endsWith(".rpm") ||
            selected.url.endsWith(".AppImage");

        if (isDirectFile) {
            const anchor = document.createElement("a");

            anchor.href = selected.url;
            anchor.download = "";

            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();

            return;
        }

        window.open(selected.url, "_blank");
    };

    /// ---- Close dropdown on Click Outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const dialog = dialogRef.current;

            if (
                dialog?.open &&
                !dialog.contains(e.target as Node)
            ) {
                dialog.close();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    /// ----

    return (
        <Wrapper $size={size} $hasDropdown={hasDropdown} className={`${osReady ? "os-ready" : ""}`}>
            <button className="cta" onClick={downloadable ? handleDownload : undefined} style={style}>
                {icon || selected.icon}

                <span>{customText || selected.text}</span>
            </button>

            {hasDropdown && (
                <>
                <button className="dialog-arrow" onClick={toggleDropdown}> <ArrowDownSVG /> </button>

                <dialog
                    ref={dialogRef}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            e.currentTarget.close();
                        }
                    }}>

                    {DOWNLOAD_OPTIONS.map((option, index) => (
                        <button
                            key={option.label}
                            className={`option ${index === selectedIndex ? "active" : ""}`}
                            onClick={() => {
                                setSelectedIndex(index);
                                dialogRef.current?.close();
                            }}>

                            {option.icon}
                            {option.os}
                            <span className="file-extension">{option.label}</span>

                        </button>
                    ))}

                </dialog>
                </>
            )}
        </Wrapper>
    );
}