'use client'

import styled from "styled-components";

import WindowsSvg from "@/assets/icons/windows.svg";
import LinuxSvg from "@/assets/icons/linux.svg";
import DownloadSvg from "@/assets/icons/download.svg";
import ArrowDownSVG from "@/assets/icons/arrow-down.svg";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type ButtonSize = "small" | "medium" | "large";

const sizeStyles = {
        small: `
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
        `,

        medium: `
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
        `,

        large: `
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
        `
    };

const Wrapper = styled.div<{ $ButtonSize?: ButtonSize; $hasDropdown?: boolean}>`
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

    ${({ $ButtonSize = "large" }) => sizeStyles[$ButtonSize]}

    @media (max-width: 576px) {
        ${({ $ButtonSize = "large" }) =>
            sizeStyles[
                $ButtonSize === "large"
                    ? "medium"
                    : "small"
            ]}
    }
    
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
        url: "https://github.com/estevao-alves/Instally/releases/download/V1.1.0/Instally-v1.1.0-windows-x86_64.exe",
        icon: <WindowsSvg />
    },

    {
        os: "Linux",
        label: "AppImage",
        text: "Linux Download",
        url: "https://github.com/estevao-alves/Instally/releases/download/V1.1.0/Instally-v1.1.0-linux-x86_64.AppImage",
        icon: <LinuxSvg />
    },
];

interface IActionButton {
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    ButtonSize?: ButtonSize;
    hasDropdown?: boolean;
    customText?: string;
    downloadable?: boolean;
}

export default function ActionButton({icon, style, hasDropdown, customText, downloadable = true, ButtonSize = "large"}: IActionButton) {
    
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

        console.log("selected.url");
        window.open(selected.url, "_blank");
    };

    const toggleDropdown = () => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        dialog.open
            ? dialog.close()
            : dialog.show();
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
        <Wrapper $ButtonSize={ButtonSize} $hasDropdown={hasDropdown} className={`${osReady ? "os-ready" : ""}`}>
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