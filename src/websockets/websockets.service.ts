import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
    [id:string]: Socket  
}

@Injectable()
export class WebsocketsService {
    private  connectedClients:ConnectedClients = {}

    registerClient(client:Socket){
        this.connectedClients[client.id] = client
        console.log(client)
    }

    disconnectedClient(clientId:string){
        delete this.connectedClients[clientId]
    }


    clientsConnected() : number {
        return Object.keys(this.connectedClients).length
    }

}
