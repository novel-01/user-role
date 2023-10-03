import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const start = async () => {
  try{
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
    .setTitle('User role Project')
    .setDescription("Rest API")
    .setVersion("1.0.0")
    .addTag("NestJS, Postgress, Sequelize")
    .build();

    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('/api/docs',app,document)
    
    await app.listen(PORT, ()=> {
      console.log(PORT);
      
    })
  }catch(error){
    console.log(error)
  }
}
 
start()
