import { useRef, useState } from 'react'
import './refs-common.css'

/**
 * Ejemplo 2.3: Scroll Programático
 * 
 * Demuestra cómo usar refs para controlar el scroll de elementos.
 */

interface Message {
    id: number
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function Example3Scroll() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: '¡Hola! Bienvenido al chat', sender: 'bot', timestamp: new Date() }
    ])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        const newMessage: Message = {
            id: Date.now(),
            text,
            sender,
            timestamp: new Date()
        }
        setMessages(prev => [...prev, newMessage])

        // Auto-scroll al nuevo mensaje
        setTimeout(scrollToBottom, 100)
    }

    const handleSend = () => {
        const text = inputRef.current?.value
        if (!text?.trim()) return

        addMessage(text, 'user')
        if (inputRef.current) inputRef.current.value = ''

        // Simular respuesta del bot
        setTimeout(() => {
            addMessage(`Recibí tu mensaje: "${text}"`, 'bot')
        }, 1000)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className="refs-container">
            <h2 className="refs-title">Ejemplo 2.3: Scroll Programático</h2>

            <p className="refs-description">
                Usa refs para controlar el scroll de contenedores.
                Útil para chats, feeds infinitos, navegación, etc.
            </p>

            <div className="chat-container">
                <div className="chat-header">
                    <h3>💬 Chat Demo</h3>
                    <div className="chat-actions">
                        <button onClick={scrollToTop} className="refs-button small">
                            ⬆️ Inicio
                        </button>
                        <button onClick={scrollToBottom} className="refs-button small">
                            ⬇️ Final
                        </button>
                    </div>
                </div>

                <div ref={containerRef} className="chat-messages">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`chat-message ${message.sender}`}
                        >
                            <div className="message-content">
                                {message.text}
                            </div>
                            <div className="message-time">
                                {message.timestamp.toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Escribe un mensaje..."
                        className="chat-input"
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSend} className="refs-button primary">
                        Enviar
                    </button>
                </div>
            </div>

            <div className="code-box">
                <h4>Código:</h4>
                <pre>{`const messagesEndRef = useRef<HTMLDivElement>(null)
const containerRef = useRef<HTMLDivElement>(null)

// Scroll al final
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}

// Scroll al inicio
const scrollToTop = () => {
  containerRef.current?.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  })
}

// En el JSX
<div ref={containerRef} className="messages">
  {messages.map(msg => <Message key={msg.id} {...msg} />)}
  <div ref={messagesEndRef} /> {/* Ancla invisible */}
</div>`}</pre>
            </div>

            <div className="info-box success">
                <h4>🎯 Casos de uso comunes:</h4>
                <ul>
                    <li><strong>scrollIntoView():</strong> Navegar a un elemento específico</li>
                    <li><strong>scrollTo():</strong> Scroll a una posición exacta</li>
                    <li><strong>scrollBy():</strong> Scroll relativo</li>
                    <li><strong>getBoundingClientRect():</strong> Obtener posición y tamaño</li>
                </ul>
            </div>
        </div>
    )
}

