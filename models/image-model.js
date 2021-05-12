const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aws = require('aws-sdk')
const s3 = new aws.S3()
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const ImagePost = new Schema(
    {
        name: String,
        size: Number,
        key: String,
        url:String,
        createDate: { 
            type: Date, 
            default: Date.now },
    }, { collection: 'image' }
)

ImagePost.pre('save', function() {
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

ImagePost.pre('remove', function() {
    if(process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: 'image-sos',
            Key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', 'tmp', 'uploads', this.key)
        )
    }
})

module.exports = mongoose.model('image', ImagePost)
