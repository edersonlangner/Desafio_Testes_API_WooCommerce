/// <reference types="cypress" />
import tokenFixture from "../../fixtures/token.json"
import productsFixture from "../../fixtures/productReview.json"
import statusFixtures from "../../fixtures/status.json"
import { faker } from '@faker-js/faker'
import productReviewPOSTWooCommerceSchema from '../../contracts/productReviewPOST.contract'
import productReviewPUTWooCommerceSchema from '../../contracts/productReviewPUT.contract'
import productReviewDELETEWooCommerceSchema from '../../contracts/productReviewDELETE.contract'


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
            return productReviewPOSTWooCommerceSchema.validateAsync(response.body)
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
                    var review = response.body.review
                    var reviewer = response.body.reviewer
                    var reviewerEmail = response.body.reviewer_email
                    expect(response.status).to.eq(statusFixtures.ok)
                    expect(response.body.rating).to.eq(productsFixture.ProductsEditar.rating)
                    expect(response.body.review).to.eq(review)
                    expect(response.body.reviewer).to.eq(reviewer)
                    expect(response.body.reviewer_email).to.eq(reviewerEmail)

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
                    return productReviewPUTWooCommerceSchema.validateAsync(response.body)
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
                    return productReviewDELETEWooCommerceSchema.validateAsync(response.body)
                })
            })
    })
})