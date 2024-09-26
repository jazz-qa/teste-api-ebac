/// <reference types="cypress" />
import contract from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker';
describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contract.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
  }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')            
  })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(faker.person.fullName(), faker.internet.email()).should((response) => {
      expect(response.status).equal(201)
      expect(response.body).to.have.property('_id')
      expect(response.body.message).equal('Cadastro realizado com sucesso')
  })  
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.loginEmailInvalido("usuarioemailinvalido@gmail.com", "abc123").should((response) => {
      expect(response.body.message).equal('Email e/ou senha inválidos')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios' + '/hHHZMwx20m0KBLX7',
      body: {
        "nome": "Ciclano da Silva Santos",
        "email": "ciclano.santos@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should(response => {
      expect(response.body.message).to.equal("Registro alterado com sucesso");
      expect(response.status).to.equal(200)
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/2qO8ybBDugcJhFO9'
    }).should((response => {
      expect(response.body.message).to.equal("Registro excluído com sucesso");
      expect(response.status).to.equal(200)
    }))
  });
});
