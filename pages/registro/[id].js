import React, { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GrDocumentUpload } from "react-icons/Gr";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import registroValidator from "../../validators/registroValidator";
import { mask } from "remask";

const form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { push, query } = useRouter();

  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    if (query.id) {
      axios.get("/api/registros/" + query.id).then((resultado) => {
        const curso = resultado.data;

        for (let atributo in curso) {
          setValue(atributo, curso[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/registros/" + dados.id, dados);
    push("/registro");
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const mascara = event.target.getAttribute("mask");

    setValue(name, mask(value, mascara));
  }

  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    setValue("rua", "");
    setValue("bairro", "");
    setValue("cidade", "");
    setValue("uf", "");
    setValue("ibge", "");
  }

  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      // Atualiza os campos com os valores.
      setValue("rua", conteudo.logradouro);
      setValue("bairro", conteudo.bairro);
      setValue("cidade", conteudo.localidade);
      setValue("uf", conteudo.uf);
      setValue("ibge", conteudo.ibge);
    } else {
      // CEP não encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }

  function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, "");

    if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        limpa_formulário_cep();

        axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => {
            meu_callback(response.data);
          })
          .catch((error) => {
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          });
      }
    } else {
      limpa_formulário_cep();
    }
  }

  return (
    <>
      <Cabecalho />
      <Container>
        <Form className="mb-2">
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome: </Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.nome}
              {...register("nome", registroValidator.nome)}
            />
            {errors.nome && (
              <small className="text-danger">{errors.nome.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha: </Form.Label>
            <Form.Control
              type="password"
              isInvalid={errors.senha}
              {...register("senha", registroValidator.senha)}
            />
            {errors.senha && (
              <small className="text-danger">{errors.senha.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.email}
              {...register("email", registroValidator.email)}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF: </Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.cpf}
              mask="999.999.999-99"
              {...register("cpf", registroValidator.cpf)}
              onChange={handleChange}
            />
            {errors.cpf && (
              <small className="text-danger">{errors.cpf.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefone">
            <Form.Label>Telefone: </Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.telefone}
              mask="(99) 99999-9999"
              {...register("telefone", registroValidator.telefone)}
              onChange={handleChange}
            />
            {errors.telefone && (
              <small className="text-danger">{errors.telefone.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="cep">
  <Form.Label>CEP</Form.Label>
  <Form.Control type="text" isInvalid={errors.cep} mask="99.999-999" {...register('cep', registroValidator.cep)} 
  onChange={(event) => {
      handleChange(event);
      pesquisacep(event.target.value);
    }}
  />
  {errors.cep && <small className="text-danger">{errors.cep.message}</small>}
</Form.Group>

<Form.Group className="mb-3" controlId="rua">
  <Form.Label>Rua: </Form.Label>
  <Form.Control type="text" {...register('rua')} disabled />
</Form.Group>

<Form.Group className="mb-3" controlId="bairro">
<Form.Label>Bairro: </Form.Label>
  <Form.Control type="text" {...register('bairro')} disabled  />
</Form.Group>

<Form.Group className="mb-3" controlId="cidade">
  <Form.Label>Cidade: </Form.Label>
  <Form.Control type="text" {...register('cidade')} disabled />
</Form.Group>

<Form.Group className="mb-3" controlId="uf">
  <Form.Label>Estado: </Form.Label>
  <Form.Control type="text" {...register('uf')} disabled  />
</Form.Group>

          <div className="mb-3 text-center">
            <Button type="submit" onClick={handleSubmit(salvar)}>
              <GrDocumentUpload className="me-1" />
              Salvar
            </Button>
            <Link href={"/registro"} className="ms-2 btn btn-danger">
              <BiChevronLeft className="me-1" />
              Voltar
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default form;
