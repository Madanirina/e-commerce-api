import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(image) {
    cloudinary.v2.config({
      cloud_name: 'dgsjami1j',
      api_key: '598225876876182',
      api_secret: 'Ur4dpRjscb0XcBW8Y_E1aNdrnvY',
    });

    try {
      const extensionFile = image.originalname.match(
        /\.([0-9a-z]+)(?:[\?#]|$)/i,
      )[1];
      const imageBase64 = image.buffer.toString('base64');
      const mimetype = image.mimetype.split('/');
      const isImage = mimetype[0] === 'image';

      const resourceType = isImage ? 'image' : 'video';

      const res = await cloudinary.v2.uploader.upload(
        `data:image/${extensionFile};base64,${imageBase64}`,
        {
          folder: 'Ecom',
          resource_type: resourceType, // Utilisez la variable resourceType
        },
      );

      return res.secure_url;
    } catch (err) {
      console.log('error during upload', err);
      throw err; // Vous devriez probablement lancer l'erreur pour la gérer correctement
    }
  }
}
