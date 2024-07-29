import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
    callWeatherAPI(weatherAPI: string, weatherAPIKey: string): string {
        console.log(weatherAPI);
        console.log(weatherAPIKey);
        console.log("weatherAPI에 접속 중입니다. ");

        return '내일은 맑음';
    }
}
