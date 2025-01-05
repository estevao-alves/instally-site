import styled from "styled-components"

import {Container} from "@/styles/layout"

import InstallyGrayLogoSvg from "/public/installyGrayLogo.svg"
import BrasilIconSvg from "/public/brazilFlag.svg"
import HeartSvg from "@/assets/icons/heart.svg";
import ShopBagSvg from "@/assets/icons/shop-bag.svg";
import DownloadSvg from "@/assets/icons/download.svg";
import ActionButton from "@/components/ActionButton";
import Link from "next/link";

const Wrapper = styled.div`
    padding: 60px 0;
    background: var(--purple-dark-gray);
    position: relative;

    a {
        color: var(--medium-gray);
        font-weight: 400;

        &:hover {
            text-decoration: underline;
        }
    }

    .businessAndLinks {
        gap: 18px;

        display: flex;
        flex-direction: column;

        .installyGrayLogo {
            width: 260px;
            height: 100px;
        }

        .number {
            display: flex;
            gap: 6px;

            .brasilIcon {
                margin-top: 1px;
                height: 20px;
                width: 20px;
            }
        }
    }

    span {
        font-weight: 300;
    }

    .author {
        display: flex;
        flex-direction: row-reverse;

        justify-content: space-between;

        span {
            margin-top: auto;
            margin-right: 10px;
        }
        
        .support {
            h3 {
                font-size: 20px;
                font-weight: 500;
                margin: 0 0 18px;
            }
            
            .support-links {
                display: flex;
                gap: 15px;
            }
        }
        
    }

    @media (max-width: 991px) {
        .author {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                margin-top: 20px;
            }
        }
    }

    @media (max-width: 480px) {
        .support {
            h3 {
                font-size: 18px !important;
            }
        }

        span {
            font-size: 14px;
        }
    }
`;

export default function Footer() {
    return <Wrapper>
        <Container>
            <div className="content">
                <div className="businessAndLinks">
                    <div className="installyGrayLogo"><InstallyGrayLogoSvg/></div>
                    <span>stayonlinedev@gmail.com</span>
                    {/*<div className="number">
              <div className="brasilIcon"><BrasilIconSvg /></div>
              <span>+55 (35) 99808-4139</span>
            </div>*/}
                </div>
            </div>

            <div className="author">

                {/*<div className="support">
                    <h3>Support the project by:</h3>

                    <div className="support-links">
                        <a href="https://ko-fi.com/stay" target="_blank" style={{textDecoration: "none"}}>
                            <ActionButton text="Donating" icon={<HeartSvg/>} downloadable={false}/>
                        </a>
                        <a href="https://ko-fi.com/stay" target="_blank" style={{textDecoration: "none"}}>
                            <ActionButton text="Shopping" icon={<ShopBagSvg/>} downloadable={false}/>
                        </a>
                    </div>
                </div>*/}

                <span>Made with 💜 by <a href="https://www.estevaoalves.com/" target="_blank">Estevão Alves</a></span>
            </div>
        </Container>
    </Wrapper>
};