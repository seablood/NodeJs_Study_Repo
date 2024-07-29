import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get("MESSAGE");
    return message;
  }

  @Get('/service-url')
  getServiceUrl(): string {
    const service_url = this.configService.get("SERVICE_URL");
    return service_url;
  }

  @Get('/db-info')
  getDBInfo(): string {
    console.log(`logLevel: ${this.configService.get("logLevel")}`);
    console.log(`apiVersion: ${this.configService.get("apiVersion")}`);

    return this.configService.get("dbInfo");
  }

  @Get('/redis-info')
  getRedisInfo(): string {
    return `${this.configService.get("redis.host")}:${this.configService.get("redis.port")}`;
  }
}
