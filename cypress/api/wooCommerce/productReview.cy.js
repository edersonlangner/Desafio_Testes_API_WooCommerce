/// <reference types="cypress" />
import tokenFixture from "../../fixtures/token.json"
import productsFixture from "../../fixtures/productReview.json"
import statusFixtures from "../../fixtures/status.json"
import { faker } from '@faker-js/faker'
import productReviewWooCommerceSchema from '../../contracts/productReview.contract'

describe('Product Review WooCommerce', () => {
    it('Criar Product Review - Aceitação', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(

            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                expect(response.status).to.eq(statusFixtures.Created)
                expect(response.body.product_id).eq(productsFixture.ProductsValido.product_id)
                expect(response.body.review).eq(review)
                expect(response.body.reviewer).eq(reviewer)
                expect(response.body.reviewer_email).eq(reviewerEmail)
                expect(response.body.rating).eq(productsFixture.ProductsValido.rating)
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productsFixture.DeletarProductReview.force
                ).then((response) => {
                    expect(response.status).to.eq(statusFixtures.ok)
                })
            })
    })
    it('Criar Product Review - Contrato', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        ).then((response) => {
            return productReviewWooCommerceSchema.validateAsync(response.body)
        })
    })
    it('Editar Product Review - Aceitação', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                cy.putProductReviewWooCommerce(
                    tokenFixture.token,
                    productsFixture.ProductsEditar.rating,
                    id

                ).then((response) => {
                    var id = response.body.id
                    expect(response.status).to.eq(statusFixtures.ok)
                    expect(response.body.rating).to.eq(productsFixture.ProductsEditar.rating)
                    cy.deleteProductReviewWooCommerce(
                        tokenFixture.token,
                        id,
                        productsFixture.DeletarProductReview.force
                    ).then((response) => {
                        expect(response.status).to.eq(statusFixtures.ok)
                    })

                })


            })
    })
    it('Editar Product Review - Contrato', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                cy.putProductReviewWooCommerce(
                    tokenFixture.token,
                    productsFixture.ProductsEditar.rating,
                    id

                ).then((response) => {
                    return productReviewWooCommerceSchema.validateAsync(response.body)
                })
            })
    })
    it('Deletar Product Review - Aceitação', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productsFixture.DeletarProductReview.force
                ).then((response) => {
                    expect(response.status).to.eq(statusFixtures.ok)
                    expect(response.body.previous.product_id).eq(productsFixture.ProductsValido.product_id)
                    expect(response.body.previous.review).eq(review)
                    expect(response.body.previous.reviewer).eq(reviewer)
                    expect(response.body.previous.reviewer_email).eq(reviewerEmail)
                    expect(response.body.previous.rating).eq(productsFixture.ProductsValido.rating)
                })

            })
    })
    it('Deletar Product Review - Contrato', () => {
        const review = faker.name.firstName()
        const reviewer = faker.name.firstName()
        const reviewerEmail = faker.internet.email(reviewer)
        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productsFixture.ProductsValido.product_id,
            review,
            reviewer,
            reviewerEmail,
            productsFixture.ProductsValido.rating,
        )
            .then((response) => {
                var id = response.body.id
                cy.deleteProductReviewWooCommerce(
                    tokenFixture.token,
                    id,
                    productsFixture.DeletarProductReview.force
                ).then((response) => {
                    return productReviewWooCommerceSchema.validateAsync(response.body.previous)
                })
            })
    })
})