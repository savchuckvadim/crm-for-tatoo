// signaling.gateway.ts
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets'
  import { Socket } from 'socket.io'
  
  @WebSocketGateway({ cors: true })
  export class SignalingGateway {
    private rooms = new Map<string, Socket[]>()
  
    @SubscribeMessage('create-offer')
    handleCreateOffer(@MessageBody() data, @ConnectedSocket() client: Socket) {
      const { roomId, offer } = data
      this.rooms.set(roomId, [client])
      client.join(roomId)
    }
  
    @SubscribeMessage('join-room')
    handleJoinRoom(@MessageBody() data, @ConnectedSocket() client: Socket) {
      const { roomId } = data
      const room = this.rooms.get(roomId)
      if (room) {
        room.push(client)
        client.join(roomId)
        room[0].emit('offer', { offer: room[0].handshake.query.offer })
      }
    }
  
    @SubscribeMessage('send-answer')
    handleAnswer(@MessageBody() data, @ConnectedSocket() client: Socket) {
      const { roomId, answer } = data
      client.to(roomId).emit('answer', { answer })
    }
  
    @SubscribeMessage('ice-candidate')
    handleIce(@MessageBody() data, @ConnectedSocket() client: Socket) {
      const { roomId, candidate } = data
      client.to(roomId).emit('ice-candidate', { candidate })
    }
  }
  