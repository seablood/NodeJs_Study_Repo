import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUser, UpdateUser } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async saveUser(user: CreateUser){
        return this.userRepository.save(user);
    }

    async findUser(email: string){
        return await this.userRepository.findOne({where: {email}});
    }

    async updateUser(email: string, data: UpdateUser){
        const user = await this.findUser(email);
        user.username = data.username;
        user.password = data.password;
        return this.userRepository.save(user);
    }

    deleteUser(email: string){
        return this.userRepository.delete({email});
    }

    async findUserOrSave(email, username, providerId): Promise<User> {
        const user = await this.findUser(email);

        if(user){
            return user;
        }

        const userData = {
            email, 
            username, 
            providerId
        };

        const newUser = await this.userRepository.save(userData);

        return newUser;
    }
}
