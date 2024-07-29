import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService, private weatherService: WeatherService) {}
    @Get()
    getWeather(): string {
        const weatherAPI = this.configService.get('WEATHER_API');
        const weatherAPIKey = this.configService.get('WEATHER_API_KEY');

        return this.weatherService.callWeatherAPI(weatherAPI, weatherAPIKey);
    }    
}
