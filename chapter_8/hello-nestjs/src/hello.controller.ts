import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello() {
        return "NestJS Server";
    }
}