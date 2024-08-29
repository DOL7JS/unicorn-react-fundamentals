import Header from "./Header";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const info = () => {
        let infos = []
        for (let i = 0; i < 5; i++) {
            infos.push(<li key={'info-key-'.concat(i.toString())}>More info about recipes <a
                href={'https://www.allrecipes.com/'}
                rel="noopener noreferrer"
                target="_blank"
            >
                {'HERE'}
            </a></li>)

        }
        return infos;
    }
    return (
        <>
            <Header title={'Here is your Home'}></Header>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" style={{textAlign: "center"}}>
                        <Nav>
                            <Nav.Link onClick={() => navigate('/recipeList')}>Recipes</Nav.Link>
                            <Nav.Link onClick={() => navigate('/ingredientList')}>Ingredients</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className={'m-5'}>
                <h2>Some awesome advices about recipe etc</h2>
                {info()}
            </div>

        </>
    )
        ;
}


export default Home;