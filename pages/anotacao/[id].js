import React, { useEffect, useState } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { Button, Col, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form'
import { GrDocumentUpload } from "react-icons/Gr";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import anotacaoValidator from '../../validators/anotacaoValidator';
import { mask } from 'remask';

const form = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { push, query } = useRouter()

  useEffect(() => {
    if (query.id) {
        axios.get('/api/anotacoes/' + query.id).then(resultado => {
            const curso = resultado.data

            for (let atributo in curso) {
                setValue(atributo, curso[atributo])
            }
        })
    }
}, [query.id])

  function salvar(dados) {
    axios.put('/api/anotacoes/' + dados.id, dados)
    push('/anotacao')
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
            <Form.Label>Nome do anime: </Form.Label>
            <Form.Control type="text" isInvalid={errors.nome} {...register('nome', anotacaoValidator.nome)} />
            {
              errors.nome &&
              <small className='text-danger'>{errors.nome.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="temporada">
            <Form.Label>Temporada: </Form.Label>
            <Form.Control type="text" isInvalid={errors.temporada} mask='99' {...register('temporada', anotacaoValidator.temporada)} onChange={handleChange} />
            {
              errors.nome &&
              <small className='text-danger'>{errors.temporada.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="ep">
            <Form.Label>Episódio: </Form.Label>
            <Form.Control type="text" isInvalid={errors.ep} mask='999' {...register('ep', anotacaoValidator.ep)} onChange={handleChange} />
            {
              errors.ep &&
              <small className='text-danger'>{errors.ep.message}</small>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="personagem">
            <Form.Label>Personagem favorito: </Form.Label>
            <Form.Control type="text" isInvalid={errors.personagem} {...register('personagem', anotacaoValidator.personagem)} />
            {
              errors.personagem &&
              <small className='text-danger'>{errors.personagem.message}</small>
            }
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="opniao">
            <Form.Label>Opnião: </Form.Label>
            <Form.Control type="text" {...register('opniao', anotacaoValidator.opniao)} />
            {
              errors.opniao &&
              <small className='text-danger'>{errors.opniao.message}</small>
            }
          </Form.Group>

          <div className="mb-3 text-center">
            <Button type="submit" onClick={handleSubmit(salvar)}><GrDocumentUpload className='me-1' />Salvar</Button>
            <Link href={'/anotacao'} className='ms-2 btn btn-danger'><BiChevronLeft className='me-1' />Voltar</Link>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default form