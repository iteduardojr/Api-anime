import React from 'react'
import Cabecalho from '../components/Cabecalho'
import apiAnimes from '../services/apiAnimes'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import HoverableImage from '../components/Hoover'

const index = ({ pullAnime }) => {

  console.log(pullAnime)

  // const imagem = pullAnime.images.jpg.image_url


  return (
    <>
      <Cabecalho />
      <Container>
        <Row>
          {pullAnime.map(item => (
            <Col md={3} style={{ height: '27em' }} className='mb-4'>
              <Link href={'/' + item.mal_id} className='btn btn-tresparent'>
                <Card border='dark' className='border border-3 text-center' >
                  <Card.Header style={{ height: '4em' }}>{item.title}</Card.Header>
                  <Card.Body className='p-2'>
                    <HoverableImage  src={item.images.jpg.image_url} alt={item.title}/>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container >

    </>
  )
}

export default index

export async function getServerSideProps(context) {

  const anime = await apiAnimes.get('/anime')
  const pullAnime = anime.data.data

  return {
    props: { pullAnime }
  }
}