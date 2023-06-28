import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Container, Dropdown, DropdownButton, Form, Modal, Navbar } from 'react-bootstrap'

const Cabecalho = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg" className='px-5 py-2 mb-4'>
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />

          <div>
            <DropdownButton
              id='down-centered'
              drop='down-centered'
              variant="secondary"
              title='Opções'
            >
              <Dropdown.Item href="/biblioteca">Informações</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/registro">Registro</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/back">Feedbak</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/indicacao">Indicação</Dropdown.Item>
            </DropdownButton>
          </div>
          <Navbar.Collapse id="navbar-dark-example" className='justify-content-end'></Navbar.Collapse>

        </Container>
      </Navbar>
    </>

  )
}

export default Cabecalho

