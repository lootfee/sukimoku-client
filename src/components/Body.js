import Container from "react-bootstrap/esm/Container";
import FlashMessage from "./FlashMessage";


function Body({children}) {
    return (
        <Container className="Body">
            <FlashMessage />
            {children}
        </Container>
    )
}

export default Body;