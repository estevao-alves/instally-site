import styled from "styled-components"

import {Container} from "@/styles/layout"

import InstallyGrayLogoSvg from "/public/installyGrayLogo.svg"
import HeartSvg from "@/assets/icons/heart.svg";
import ShopBagSvg from "@/assets/icons/shop-bag.svg";
import DownloadSvg from "@/assets/icons/download.svg";
import ActionButton from "@/components/ActionButton";

import Link from "next/link";

const Wrapper = styled.div`
    padding: 40px 0 50px 0;
    background: var(--purple-dark-gray);
    position: relative;

    section {
        display: flex;
    }
    
    .content {
        margin-bottom: 40px;
        
        .businessAndLinks {
            gap: 18px;

            display: flex;
            flex-direction: column;

            .installyGrayLogo {
                width: 260px;
                height: 100px;
            }

            span {
                font-weight: 300;
            }
        }

        .support {
            margin-top: 40px;

            h3 {
                font-size: 20px;
                font-weight: 500;
                margin: 0 0 25px;
            }

            .support-links {
                display: flex;
                gap: 15px;
            }
        }
    }

    .author {
        display: flex;
        flex-direction: row-reverse;
        
            a {
                color: var(--medium-gray);
                font-weight: 400;

                &:hover {
                    text-decoration: underline;
                }
            }
    }

    @media (max-width: 991px) {
        .author {
            display: flex;
            flex-direction: column;
            align-items: center;
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
                    </div>

                    <div className="support">
                        <h3>Support the project by:</h3>

                        <div className="support-links">
                            <a href="https://ko-fi.com/stay" target="_blank" style={{textDecoration: "none"}}>
                                <ActionButton text="Donating" size="medium" icon={<HeartSvg/>} downloadable={false}/>
                            </a>
                            <a href="https://cozydragon.shop/" target="_blank" style={{textDecoration: "none"}}>
                                <ActionButton text="Shopping" size="medium" icon={<ShopBagSvg/>} downloadable={false}/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="author">
                    <span>Made with 💜 by <a href="https://www.estevaoalves.com/"
                                            target="_blank">Estevão Alves</a></span>
                </div>
        </Container>
    </Wrapper>
};