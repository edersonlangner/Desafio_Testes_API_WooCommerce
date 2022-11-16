const joi = require('joi');

const productReviewWooCommerceSchema = joi.object({
    "id": joi.number().required(),
    "date_created": joi.date().required(),
    "date_created_gmt": joi.date().required(),
    "product_id": joi.number().required(),
    "product_name": joi.string().required(),
    "product_permalink": joi.string().required(),
    "status": joi.string().required(),
    "reviewer": joi.string().required(),
    "reviewer_email": joi.string().required(),
    "review": joi.string().required(),
    "rating": joi.number().required(),
    "verified": joi.boolean().required(),
    "reviewer_avatar_urls": joi.object({
        "24": joi.string().required(),
        "48": joi.string().required(),
        "96": joi.string().required()
    }),
    "_links": joi.object({
        "self": joi.array().items(
            joi.object({
                "href": joi.string().required()
            })
        ),
        "collection": joi.array().items(
            joi.object({
                "href": joi.string().required()
            })
        ),
        "up": joi.array().items(
            joi.object({
                "href": joi.string().required()
            })
        )
    })
}).required()

export default productReviewWooCommerceSchema