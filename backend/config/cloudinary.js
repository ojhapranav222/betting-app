import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: 'diikas4mp', 
    api_key: '951341396288134', 
    api_secret: 'U7CdTvm2axgBer9C5zckQIBqmVY'
})

export default cloudinary;