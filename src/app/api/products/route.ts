import Joi from 'joi';
import { productRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';
import {app, analytics, fireStorage} from '@/services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await productRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await productRepo.createProduct(body);
}


//upload image to firebase storage but have to shift to client side
function uploadImage(image: any) {
    const storageRef = ref(fireStorage, 'products/' + image.name)
    try {
        //upload image
        uploadBytes(storageRef, image);
        
        //get image url
        const url = getDownloadURL(storageRef);
        console.log("Image Uploaded: " + url);
        return url;
    }
    catch(err) {
        console.error('Error uploading image:',err);
    }
}


create.schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    image: Joi.string(),
    brand: Joi.string().required(),
    category: Joi.string(),
    countInStock: Joi.number().required(),
    rating: Joi.number(),
    numReviews: Joi.number(),
    reviews: Joi.array(),
});