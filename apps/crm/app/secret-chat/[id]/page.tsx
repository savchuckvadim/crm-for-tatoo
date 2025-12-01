'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SecretChatUI } from '@/modules/entities/Chat/ui/SecretChatUI'

export default function SecretChat() {
  const { id } = useParams()
  const roomId = Number(id)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const peer = useRef<RTCPeerConnection | null>(null)
  const dataChannel = useRef<RTCDataChannel | null>(null)
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    socket.current = io('http://localhost:5000')

    peer.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })

    dataChannel.current = peer.current.createDataChannel('chat')
    dataChannel.current.onmessage = (e) =>
      setMessages((prev) => [...prev, e.data])

    peer.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current?.emit('ice-candidate', { roomId, candidate: event.candidate })
      }
    }

    peer.current.createOffer().then((offer) => {
      peer.current?.setLocalDescription(offer)
      socket.current?.emit('create-offer', { roomId, offer })
    })

    socket.current?.on('answer', async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      await peer.current?.setRemoteDescription(answer)
      setConnected(true)
    })

    socket.current?.on('ice-candidate', async ({ candidate }: { candidate: RTCIceCandidate }) => {
      await peer.current?.addIceCandidate(candidate)
    })

    return () => {
      socket.current?.disconnect()
    }
  }, [roomId])

  const send = (msg: string) => {
    dataChannel.current?.send(msg)
    setMessages((prev) => [...prev, `me: ${msg}`])
  }

  return (
    <div>
      <h1>Secret Chat Room {roomId}</h1>
      {connected ? (
        <SecretChatUI messages={messages} onSend={send} />
      ) : (
        <p>Ожидание подключения второго участника...</p>
      )}
    </div>
  )
}
