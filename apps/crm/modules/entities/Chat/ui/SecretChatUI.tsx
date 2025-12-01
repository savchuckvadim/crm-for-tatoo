import { useState } from 'react';

interface SecretChatProps {
    messages: string[];
    onSend: (message: string) => void;
}

export function SecretChatUI({ messages, onSend }: SecretChatProps) {
    const [text, setText] = useState('')
    return (
        <>
            <div>{messages.map((m, i) => <p key={i}>{m}</p>)}</div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => { onSend(text); setText('') }}>Send</button>
        </>
    )
} 