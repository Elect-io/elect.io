import cloudinary from '../config/cloudinary';

const upload = async (img) => {
    let image = await cloudinary.uploader.upload(img, { upload_preset: "elect.io", width: 170, crop: "scale" });
    const imageUrl = image.secure_url;
    return imageUrl;
}

export default upload;