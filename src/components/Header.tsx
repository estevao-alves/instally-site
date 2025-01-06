import {Container} from "@/styles/layout";
import styled from "styled-components";

import Link from "next/link";
import {usePathname} from "next/navigation";

import ExternalLinkSvg from "@/assets/icons/external-link.svg";
import LogoSvg from "/public/logo.svg";


const Wrapper = styled.div`
    padding: 10px;
    height: 100px;
    background-color: var(--purple-dark-gray);

    display: flex;
    align-items: center;

    .content {
        display: flex;
    }

    .options {
        display: flex;
        margin-left: auto;
        align-items: center;
        justify-content: center;

        gap: 60px;

        span {
            font-size: 20px;
        }

        :hover {
            cursor: pointer;
            color: var(--gray);
        }

        .item {
            position: relative;
            user-select: none;

            svg {
                bottom: -5px;
                margin: 0;
                position: absolute;
            }
        }

        .item.active::after, .item:hover::after {
            content: '';
            height: 8px;
            width: 40px;
            left: 0;
            right: 0;
            bottom: -10px;
            margin: 0 auto;
            position: absolute;
            border-radius: 20px;
        }

        .item.active::after {
            background-color: var(--purple-violet);
        }

        .item:hover::after {
            background-color: var(--purple-gray);
        }

    }

    @media (max-width: 768px) {
        .content {
            justify-content: center;
        }
    }

    @media (max-width: 991px) {
        svg {
            margin-left: 10px;
            scale: 0.8;
        }

        .options {
            gap: 30px;

            span {
                font-size: 18px;
            }
        }
    }
    @media (max-width: 576px) {
        
        .content {
            flex-direction: column;
            align-items: center;
        }
        
        .options {
            margin: auto 0;
        }
    }

    @media (max-width: 480px) {
        svg {
            margin-right: 10px;
            scale: 0.7;
        }

        .options {
            span {
                font-size: 16px;
            }
        }
    }
`;

export default function Header() {
    const menu = [
        {title: "Home", pathname: "/",},
        {title: "Search", pathname: "/search",},
        {
            title: "GitHub",
            pathname: "https://github.com/estevao-alves/Instally",
            target: "_blank",
            icon: <ExternalLinkSvg />
        },
    ];

    const pathname = usePathname();

    return <Wrapper>
        <Container>
            <div id="content" className="content">
                <Link href="/"><LogoSvg /></Link>
                <div className="options">
                    {menu.map((item, i) =>
                        <Link key={i} href={item.pathname} target={item.target}
                              className={`item ${pathname === item.pathname ? "active" : ""}`}>
                            <span>{item.title}</span>
                            {item.icon}
                        </Link>
                    )}
                </div>
            </div>
        </Container>
    </Wrapper>
};