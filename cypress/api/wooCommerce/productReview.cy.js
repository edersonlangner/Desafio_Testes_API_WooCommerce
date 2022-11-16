/// <reference types="cypress" />
import tokenFixture from "../../fixtures/token.json"
import productsFixture from "../../fixtures/productReview.json"
import statusFixtures from "../../fixtures/status.json"
import { faker } from '@faker-js/faker'
import productReviewWooCommerceSchema from '../../contracts/productReview.contract'

describe('Product Review WooCommerce', () => {
    it('Criar Product Review', () => {
        const review = faker.company.name()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            productsFixture.ProductsValido.reviewer,
            productsFixture.ProductsValido.reviewer_email,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                expect(response.status).to.eq(statusFixtures.Created)
                expect(response.body.product_id).eq(productsFixture.ProductsValido.product_id)
                expect(response.body.review).eq(review)
                expect(response.body.reviewer).eq(productsFixture.ProductsValido.reviewer)
                expect(response.body.reviewer_email).eq(productsFixture.ProductsValido.reviewer_email)
                expect(response.body.rating).eq(productsFixture.ProductsValido.rating)
                return productReviewWooCommerceSchema.validateAsync(response.body),
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productsFixture.DeletarProductReview.force
                ).then((response) => {
                    expect(response.status).to.eq(statusFixtures.ok)})
            })
    })
    it('Editar Product Review', () => {
        const review = faker.name.lastName()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            productsFixture.ProductsValido.reviewer,
            productsFixture.ProductsValido.reviewer_email,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                const reviewEditar = faker.animal.cat()
                var id = response.body.id
                cy.putProductReviewWooCommerce(
                    tokenFixture.token,
                    productsFixture.ProductsEditar.product_id,
                    reviewEditar,
                    productsFixture.ProductsEditar.reviewer,
                    productsFixture.ProductsEditar.reviewer_email,
                    productsFixture.ProductsEditar.rating,
                    id

                ).then((response) => {
                    var id = response.body.id
                    expect(response.status).to.eq(statusFixtures.ok)
                    expect(response.body.product_id).to.eq(productsFixture.ProductsEditar.product_id)
                    expect(response.body.review).to.eq(reviewEditar)
                    expect(response.body.reviewer).to.eq(productsFixture.ProductsEditar.reviewer)
                    expect(response.body.reviewer_email).to.eq(productsFixture.ProductsEditar.reviewer_email)
                    expect(response.body.rating).to.eq(productsFixture.ProductsEditar.rating)
                    return productReviewWooCommerceSchema.validateAsync(response.body),
                    cy.deleteProductReviewWooCommerce(
                        tokenFixture.token,
                        id,
                        productsFixture.DeletarProductReview.force
                    ).then((response) => {
                        expect(response.status).to.eq(statusFixtures.ok)})
                    
                })


            })
    })
    it('Deletar Product Review', () => {
        const review = faker.name.firstName()
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            productsFixture.ProductsValido.reviewer,
            productsFixture.ProductsValido.reviewer_email,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productsFixture.DeletarProductReview.force
                ).then((response) => {
                    console.log(response, "Teste"),
                    expect(response.status).to.eq(statusFixtures.ok)
                    expect(response.body.previous.product_id).eq(productsFixture.ProductsValido.product_id)
                    expect(response.body.previous.review).eq(review)
                    expect(response.body.previous.reviewer).eq(productsFixture.ProductsValido.reviewer)
                    expect(response.body.previous.reviewer_email).eq(productsFixture.ProductsValido.reviewer_email)
                    expect(response.body.previous.rating).eq(productsFixture.ProductsValido.rating)
                    return productReviewWooCommerceSchema.validateAsync(response.body.previous)
                })

            })
    })
})