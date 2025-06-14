import { Module } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/clodinary.service';

@Module({
  providers: [CloudinaryService],
})
export class CloudinaryModule {}
