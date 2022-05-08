import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    // local mem for messages, will put on db later
    messages: Message[] = [{username: 'henrique', text: 'hello'}];
    
    // keep track of clients names / ids 
    clientToUser = {};  

    identify(username: string, password: string, clientId: string){
        // hash the password value and check it in the db
        this.clientToUser[clientId] = username; 
        console.log('clientToUser', this.clientToUser);
        return Object.values(this.clientToUser); 
    }

    getClientName(clientId: string){
        return this.clientToUser[clientId]; 
    }

    create(createMessageDto: CreateMessageDto, clientId: string) {
        const message = {
            username: this.clientToUser[clientId], 
            text: createMessageDto.text
        }; 
        this.messages.push(message);
        return message; 
    }

    findAll() {
        return this.messages;
        // to do: put query to retrieve messages from db, from user1 to user2 / user2 to user1
    }

    usersList() {
        return this.clientToUser; 
    }

    disconnect(clientId: string) {
        console.log('disconnected, ', clientId); 
        delete this.clientToUser[clientId]; 
    }
  /* 

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
  */
}
