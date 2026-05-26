import {Container} from "@/styles/layout";
import ActionButton from "./ActionButton";
import {Wrapper} from "./styles/form";

export default async function Form() {
    return <Wrapper>
        <Container>
            <div className="title">
                <h2>Get in Touch</h2>
                <p>Feel free to submit your inquiries, suggestions, or feedback to help us improve our software. Thank
                    you for your support!</p>
            </div>
            <div className="form">
                <input type="text" placeholder="Nome"></input>
                <input type="email" placeholder="E-mail"></input>
                <input type="text" className="message" placeholder="Como podemos te ajudar?"></input>
                <ActionButton customText="Enviar" icon={false}/>
            </div>
        </Container>
    </Wrapper>
}