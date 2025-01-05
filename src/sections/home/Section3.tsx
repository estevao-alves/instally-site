import ActionButton from "@/components/ActionButton"
import {Container} from "@/styles/layout"
import {styled} from "styled-components"

import GirlMeditatingSvg from "@/assets/girl-meditating.svg"
import Link from "next/link";

const Wrapper = styled.div`
    background-color: var(--purple-violet);
    padding: 180px 0;

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .rightContent {
            max-width: 420px;
            display: flex;
            flex-direction: column;
            align-items: baseline;
        }

        h2 {
            color: var(--white);
            font-size: 65px;
            font-weight: 800;
        }

        p {
            margin: 80px 0;
            max-width: 450px;
            font-size: 24px;
        }
    }

    .girlMeditating {
        max-width: 800px;
        max-height: 580px;
    }

    @media (max-width: 1200px) {
        padding: 120px 0;

        .content {
            .rightContent {
                max-width: 400px;
            }

            h2 {
                font-size: 60px;
            }

            p {
                font-size: 20px;
            }
        }
    }

    @media (max-width: 991px) {
        padding: 80px 0;
        overflow: hidden;

        .content {
            margin: 0 auto;

            justify-content: center;
            flex-direction: column-reverse;

            .rightContent {
                max-width: initial;
                align-items: center;
            }

            .text {
                max-width: initial;

                display: flex;
                flex-direction: column;
                align-items: center;
            }

            h2 {
                font-size: 45px;
                text-align: center;
            }

            p {
                max-width: 600px;

                margin: 25px;
                text-align: center;
            }
        }

        .girlMeditating {
            width: 100%;
            margin-left: 40px;
            margin-bottom: -20px;
        }
    }

    @media (max-width: 768px) {
        .content {
            p {
                font-size: 18px;
            }
        }
    }

    @media (max-width: 640px) {
        .content {
            h2 {
                font-size: 40px;
            }
        }
    }

    @media (max-width: 576px) {
        padding-bottom: 40px;

        .content {

            h2 {
                max-width: 260px;
            }

            p {
                font-size: 16px;
            }
        }
    }

    @media (max-width: 480px) {
        padding-bottom: 50px;
    }
`;

export default function Section3() {
    return <Wrapper>
        <Container>
            <div className="content">
                <GirlMeditatingSvg className="girlMeditating"/>
                <div className="rightContent">
                    <div className="text">
                        <h2>Find Your favorite app</h2>
                        <p>Easily search between more then 4.000+ packages available</p>
                    </div>
                    <Link href="/search">
                        <ActionButton text={"Search your app"} icon={false} downloadable={false}
                                      style={{backgroundColor: "#1a1a1a", padding: "20px 100px"}}/>
                    </Link>
                </div>
            </div>
        </Container>
    </Wrapper>
};