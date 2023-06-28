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
import backValidator from '../../validators/backValidator'

const form = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { push } = useRouter()

  const [back, setBack] = useState([])

  useEffect(() => {
    getALL()
  }, [])

  function salvar(dados) {
    axios.post('/api/backs', dados)
    push('/back')
  }

  function getALL() {
    axios.get('/api/backs').then(resultado => {
      setBack(resultado.data);
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
          
          <Form.Group className="mb-3">
            <Form.Label>Opnião: </Form.Label>
            <Form.Control type="text" {...register('opniao', backValidator.opniao)} />
            {
              errors.opniao &&
              <small className='text-danger'>{errors.opniao.message}</small>
            }
          </Form.Group>

          <div className="mb-3 text-center">
            <Button type="submit" onClick={handleSubmit(salvar)}><GrDocumentUpload className='me-1' />Salvar</Button>
            <Link href={'/back'} className='ms-2 btn btn-danger'><BiChevronLeft className='me-1' />Voltar</Link>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default form