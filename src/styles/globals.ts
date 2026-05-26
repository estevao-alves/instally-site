'use client'

import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    ::selection {
        background-color: var(--purple-violet);
        color: white;
    }

    body {
        overflow-x: hidden;
    }

    a {
        text-decoration: none;
    }

    input {
        outline: none;
        border-style: none;
        border-radius: 30px;
        font-size: 16px;
    }

    :root {
        --purple-violet: #6247AA;
        --purple-simple: #7251B5;
        --purple-gray: #2d2d33;
        --purple-dark-gray: #1e1d22;

        --white: #FFF;
        --gray: #DFDFDF;
        --medium-gray: #F1F1EF;
        --black: #000;
        --hover-gray: #282828;

        --red: #e15a5a;
        --green: #38D381;
        --blue: #356DA0;
    }

    @media (min-width: 577px) {
        ::-webkit-scrollbar {
            width: 14px;
            background: var(--purple-dark-gray);
            padding: 2px;
        }

        ::-webkit-scrollbar-thumb {
            background-clip: padding-box;
            border-radius: 8px;
            box-shadow: none;
            min-height: 50px;
            border: 4px solid transparent;
            background-color: var(--purple-gray);

            &:hover {
                background-clip: padding-box;
                border-radius: 8px;
                box-shadow: none;
                min-height: 50px;

                border: 3px solid transparent;
                background-color: var(--purple-violet);
            }
        }
    }

    h1, h2, h3, h4, p, span {
        color: var(--white);
    }

    button, input, textarea {
        font-family: var(--font-family);
    }

    button {
        border: none;
        cursor: pointer;
    }

    button.cta {
        background-color: var(--purple-violet);
        color: var(--white);
        
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        
        display: flex;
        align-self: center;
        font-weight: bold;
        text-transform: uppercase;

        transition: 200ms ease-in;

        &:hover {
            transform: scale(1.02, 1.02);
            background-color: #443176 !important;
        }
    }

    @media (max-width: 1500px) {
        button.cta {
            font-size: 18px;
        }
    }

    @media (max-width: 991px) {
        button.cta {
            font-size: 16px;
        }
    }

    @media (max-width: 576px) {
        button.cta {
            justify-content: center;
        }

        @media (max-width: 480px) {
            button.cta {
                font-size: 17px;
            }
        }

        @media (max-width: 380px) {
            button.cta {
                padding: 15px 30px;
                font-size: 14px;
            }
        }
    }
`;

export default GlobalStyle;