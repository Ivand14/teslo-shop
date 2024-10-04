import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";

import { Socket } from "socket.io";
import { WebsocketsService } from "./websockets.service";

@WebSocketGateway({cors:true})
export class WebSockets implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    private readonly websocketsService:WebsocketsService
  ){}


  handleConnection(client: Socket) {
    this.websocketsService.registerClient(client)
    console.log({conectado: this.websocketsService.clientsConnected()})
  }

  handleDisconnect(client: Socket) {
    this.websocketsService.disconnectedClient(client.id)
  }

  
  
}
