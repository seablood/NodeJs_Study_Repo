import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

async function bootstrap() {
    const app = await NestFactory.create(HelloModule);

    app.listen(3000, () => {console.log("server start")});
}

bootstrap();