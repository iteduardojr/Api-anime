import React, { useEffect, useState } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { GrDocumentUpload } from "react-icons/Gr";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { mask } from 'remask'
import bibliotecaValidator from '../../validators/bibliotecaValidator'

const form = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { push } = useRouter()

  const [biblioteca, setBiblioteca] = useState([])


  useEffect(() => {
    getALL()
  }, [])

  function salvar(dados) {
    axios.post('/api/bibliotecas', dados)
    push('/biblioteca')
  }

  function getALL() {
    axios.get('/api/bibliotecas').then(resultado => {
      setBiblioteca(resultado.data);
    })
  }

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const mascara = event.target.getAttribute('mask')

    setValue(name, mask(value, mascara))
  }


  return (
    <>
      <Cabecalho />
      <Container>
        <Form className='mb-2'>
          <Form.Group className="mb-3" controlId="estudio">
            <Form.Label>Estúdio do anime: </Form.Label>
            <Form.Control type="text" isInvalid={errors.estudio} {...register('estudio', bibliotecaValidator.estudio)} />
            {
              errors.estudio &&
              <small className='text-danger'>{errors.estudio.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="producao">
            <Form.Label>Produção do anime: </Form.Label>
            <Form.Control type="text" isInvalid={errors.producao} {...register('producao', bibliotecaValidator.producao)} />
            {
              errors.producao &&
              <small className='text-danger'>{errors.producao.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="lancamento">
            <Form.Label>Ano de lançamento: </Form.Label>
            <Form.Control type="text" isInvalid={errors.lancamento} mask='9999' {...register('lancamento', bibliotecaValidator.lancamento)} onChange={handleChange} />
            {
              errors.lancamento &&
              <small className='text-danger'>{errors.lancamento.message}</small>
            }
          </Form.Group>

          <div className="mb-3 text-center">
            <Button type="submit" onClick={handleSubmit(salvar)}><GrDocumentUpload className='me-1' />Salvar</Button>
            <Link href={'/biblioteca'} className='ms-2 btn btn-danger'><BiChevronLeft className='me-1' />Voltar</Link>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default form