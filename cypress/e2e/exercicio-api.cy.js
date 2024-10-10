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
    cy.cadastrarUsuario().should((response) => {
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
    cy.cadastrarUsuario().then((response) => {
      const id = response.body._id;
      cy.request({
        method: 'PUT',
        url: 'usuarios/' + id,
        body: {
          "nome": faker.person.fullName(),
          "email": faker.internet.email(),
          "password": "teste",
          "administrador": "true"
        }
      }).should(response => {
        expect(response.body.message).to.equal("Registro alterado com sucesso");
        expect(response.status).to.equal(200)
      })    })
    
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario().then((response) => {
      const id = response.body._id;
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
      }).should((response => {
        expect(response.body.message).to.equal("Registro excluído com sucesso");
        expect(response.status).to.equal(200)
      }))
    })
  });
});
