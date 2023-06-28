
import apiAnimes from '../services/apiAnimes'
import Cabecalho from '../components/Cabecalho'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { BsFillPencilFill } from "react-icons/bs";
import Link from 'next/link'

const anime = ({ pullAnime }) => {

    console.log(pullAnime)
    return (
        <>
            <Cabecalho />
            <div className='text-center mb-4'><h1>{pullAnime.title}</h1></div>
            <Container>
                <Row className='mb-5'>
                    <Col md={4}>
                        <Card border='dark' className='border border-3'>
                            <Card.Header className='text-center text-light bg-black'><h1>{pullAnime.title_japanese}</h1></Card.Header>
                            <Card.Body>
                                <Card.Img variant='top' src={pullAnime.images.jpg.image_url}></Card.Img>
                            </Card.Body>

                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card border='dark' className='border border-3'>
                            <Card.Header className='text-center'><p><strong>{pullAnime.title_english}</strong></p></Card.Header>
                            <Card.Body>
                                <div className='d-flex justify-content-between border-bottom border-dark mb-2'>
                                    <Card.Text><strong>Estúdio: </strong>{pullAnime.studios[0].name}</Card.Text>
                                    <Card.Text><strong>Produção: </strong>{pullAnime.producers[0].name}</Card.Text>
                                </div>

                                <Card.Text><strong>Classificação: </strong>{pullAnime.rating}</Card.Text>
                                <Card.Text><strong>Episódios: </strong>{pullAnime.episodes}</Card.Text>

                                <div className='d-flex justify-content-between border-bottom border-top border-dark pt-2 mb-2'>
                                    <Card.Text><strong>Popularidade: </strong>{pullAnime.popularity}</Card.Text>
                                    <Card.Text><strong>Rank: </strong>{pullAnime.rank}</Card.Text>
                                </div>

                                <Card.Text><strong>Nota: </strong>{pullAnime.score}</Card.Text>
                                <Card.Text><strong>Ano de lançamento: </strong>{pullAnime.year}</Card.Text>
                                <Card.Text><strong>Finalizado?: </strong>{pullAnime.status}</Card.Text>
                                <Card.Text><strong>Sinopse: </strong>{pullAnime.synopsis}</Card.Text>

                                <Link type="submit" href='/anotacao' className='btn btn-primary' ><BsFillPencilFill style={{marginRight: '0.5em'}}/>Anotações</Link>
                                
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default anime

export async function getServerSideProps(context) {
    const id = context.params.id

    const anime = await apiAnimes.get('/anime/' + id)
    const pullAnime = anime.data.data

    return {
        props: { pullAnime }
    }
}