import React, { useEffect, useState } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { GrDocumentUpload } from "react-icons/Gr";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import indicacaoValidator from '../../validators/indicacaoValidator';
import { mask } from 'remask';

const form = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { push, query } = useRouter()

  useEffect(() => {
    if (query.id) {
        axios.get('/api/indicacaos/' + query.id).then(resultado => {
            const curso = resultado.data

            for (let atributo in curso) {
                setValue(atributo, curso[atributo])
            }
        })
    }
}, [query.id])

  function salvar(dados) {
    axios.put('/api/indicacaos/' + dados.id, dados)
    push('/indicacao')
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
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome do Anime: </Form.Label>
            <Form.Control type="text" isInvalid={errors.nome} {...register('nome', indicacaoValidator.nome)} />
            {
              errors.nome &&
              <small className='text-danger'>{errors.nome.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="estudio">
            <Form.Label>Estúdio: </Form.Label>
            <Form.Control type="text" isInvalid={errors.estudio} {...register('estudio', indicacaoValidator.estudio)} />
            {
              errors.estudio &&
              <small className='text-danger'>{errors.estudio.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="producao">
            <Form.Label>Produção: </Form.Label>
            <Form.Control type="text" isInvalid={errors.producao} {...register('producao', indicacaoValidator.producao)} />
            {
              errors.producao &&
              <small className='text-danger'>{errors.producao.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="lancamento">
            <Form.Label>Ano de lançamento: </Form.Label>
            <Form.Control type="text" isInvalid={errors.lancamento} mask='9999' {...register('lancamento', indicacaoValidator.lancamento)} onChange={handleChange} />
            {
              errors.lancamento &&
              <small className='text-danger'>{errors.lancamento.message}</small>
            }
          </Form.Group>

          <div className="mb-3 text-center">
            <Button type="submit" onClick={handleSubmit(salvar)}><GrDocumentUpload className='me-1' />Salvar</Button>
            <Link href={'/indicacao'} className='ms-2 btn btn-danger'><BiChevronLeft className='me-1' />Voltar</Link>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default form