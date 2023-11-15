import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: { origin: '*' }
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection {

    private logger: Logger = new Logger('ChatGateway');

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        this.logger.log('Le websocket gateway est initialisé')
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connecté avec id: ${client.id}`);
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): WsResponse<string> {
        this.logger.log('Message recu du client : ', payload)
        client.broadcast.emit('msgToClient', payload)
        return { event: 'msgToClient', data: payload }
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}