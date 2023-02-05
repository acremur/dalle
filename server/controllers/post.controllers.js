import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/post.js'

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json({ success: true, data: posts })
    } catch(error) {
        res.status(500).json({ success: false, message: error })
    }
}

const createPost = async (req, res) => {   
    try {
        const { name, prompt, photo } = req.body
        const photoUrl = await cloudinary.uploader.upload(photo, { folder: 'Dall-E' })

        const newPost = await Post.create({
            name, 
            prompt,
            photo: photoUrl.url
        })

        res.status(201).json({ success: true, data: newPost })
    } catch(error) {
        res.status(500).json({ success: false, message: error })
    }
}

export { getAllPosts, createPost }