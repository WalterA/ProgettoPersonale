import React, { useState, useCallback, useRef, useEffect } from 'react';

// Gestione persistenza messaggi con JSON locale
const CHAT_STORAGE_KEY = 'radiopopizz_chat_messages';
const USERNAME_STORAGE_KEY = 'radiopopizz_username';

// Lista degli amministratori
const ADMIN_USERS = ['admin', 'moderatore', 'dj', 'radiopopizz'];

// Funzione per verificare se un utente è amministratore
const isAdmin = (username) => {
  return ADMIN_USERS.includes(username.toLowerCase());
};

// Funzioni per gestire il salvataggio locale
const saveMessagesToLocal = (messages) => {
  try {
    const chatData = {
      messages: messages,
      lastUpdate: Date.now(),
      version: '1.0'
    };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData));
  } catch (error) {
    console.error('Errore nel salvare i messaggi:', error);
  }
};

const loadMessagesFromLocal = () => {
  try {
    const savedData = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedData) {
      const chatData = JSON.parse(savedData);
      return chatData.messages || [];
    }
  } catch (error) {
    console.error('Errore nel caricare i messaggi:', error);
  }
  return [];
};

const saveUsernameToLocal = (username) => {
  try {
    localStorage.setItem(USERNAME_STORAGE_KEY, username);
  } catch (error) {
    console.error('Errore nel salvare username:', error);
  }
};

const loadUsernameFromLocal = () => {
  try {
    return localStorage.getItem(USERNAME_STORAGE_KEY) || '';
  } catch (error) {
    console.error('Errore nel caricare username:', error);
    return '';
  }
};

// Esporta/Importa chat in formato JSON
const exportChatToJSON = (messages) => {
  const chatExport = {
    title: "Radio PoPizz Chat Export",
    exportDate: new Date().toISOString(),
    totalMessages: messages.length,
    messages: messages.map(msg => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
      timestamp: msg.timestamp,
      date: new Date(msg.timestamp).toLocaleString('it-IT')
    }))
  };
  
  const dataStr = JSON.stringify(chatExport, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `radiopopizz_chat_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

let globalMessages = loadMessagesFromLocal();

// Componente Message memoizzato
const Message = React.memo(({ text, sender, timestamp, id, currentUser }) => {
  const isCurrentUser = sender === currentUser;
  const isSystem = sender === 'Radio PoPizz' || sender === 'Sistema';
  const isAdminMessage = isAdmin(sender);
  
  return (
    <div 
      className={`message ${isCurrentUser ? 'current-user' : isSystem ? 'system' : 'other-user'} ${isAdminMessage ? 'admin-message' : ''}`}
      role="log"
      aria-label={`Messaggio da ${isCurrentUser ? 'te' : sender}`}
    >
      <div className="message-content">
        {!isCurrentUser && !isSystem && (
          <div className="message-sender">
            {sender}
            {isAdminMessage && <span className="admin-badge">👑</span>}
          </div>
        )}
        <p>{text}</p>
        {timestamp && (
          <span className="message-timestamp" aria-label="Orario invio">
            {new Date(timestamp).toLocaleTimeString('it-IT', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );
});

Message.displayName = 'Message';

// Hook per gestire i messaggi con persistenza locale
const useMessages = (username) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carica i messaggi all'avvio
  useEffect(() => {
    const loadedMessages = loadMessagesFromLocal();
    globalMessages = loadedMessages;
    setMessages([...loadedMessages]);
    setIsLoading(false);
  }, []);
  
  const addMessage = useCallback((text, sender = username) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      sender,
      timestamp: Date.now()
    };
    
    // Aggiungi al "database" globale
    globalMessages.push(newMessage);
    
    // Salva immediatamente nel localStorage
    saveMessagesToLocal(globalMessages);
    
    // Aggiorna lo stato locale
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    return newMessage.id;
  }, [username]);

  const clearMessages = useCallback(() => {
    globalMessages = [];
    setMessages([]);
    // Pulisci anche il localStorage
    saveMessagesToLocal([]);
  }, []);

  const exportMessages = useCallback(() => {
    exportChatToJSON(messages);
  }, [messages]);

  return {
    messages,
    addMessage,
    clearMessages,
    exportMessages,
    isLoading
  };
};

// Hook per gestire input e validazione
const useMessageInput = (onSendMessage) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const MAX_MESSAGE_LENGTH = 500;
  
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setNewMessage(value);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    
    if (!newMessage.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await onSendMessage(newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Errore invio messaggio:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newMessage, onSendMessage, isSubmitting]);

  return {
    newMessage,
    setNewMessage,
    isSubmitting,
    remainingChars: MAX_MESSAGE_LENGTH - newMessage.length,
    handleInputChange,
    handleSubmit
  };
};

// Componente Chat integrato
const IntegratedChat = ({ username, onUsernameChange }) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { messages, addMessage, clearMessages, exportMessages, isLoading } = useMessages(username);
  const userIsAdmin = isAdmin(username);
  
  // Simulazione risposta automatica occasionale
  const simulateResponse = useCallback(async (userMessage) => {
    // Risposta automatica solo ogni tanto
    if (Math.random() < 0.3) {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const responses = [
        "Ciao a tutti gli ascoltatori! 🎵",
        "Grazie per essere qui su Radio PoPizz!",
        "Che bel messaggio! Continuate a scrivere!",
        "La musica ci unisce tutti! 🎶",
        "Radio PoPizz è sempre con voi!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'Radio PoPizz');
    }
  }, [addMessage]);

  const handleSendMessage = useCallback(async (messageText) => {
    // Aggiungi messaggio utente
    addMessage(messageText, username);
    
    // Possibile risposta automatica
    try {
      await simulateResponse(messageText);
    } catch (error) {
      console.error('Errore risposta automatica:', error);
    }
  }, [addMessage, username, simulateResponse]);

  const { 
    newMessage, 
    setNewMessage,
    isSubmitting, 
    remainingChars, 
    handleInputChange, 
    handleSubmit 
  } = useMessageInput(handleSendMessage);

  // Auto-scroll ai nuovi messaggi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus su input quando componente si monta
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Gestione tasti di scelta rapida
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setNewMessage('');
    }
  }, [handleSubmit, setNewMessage]);

  return (
    <div className="integrated-chat-container">
      {/* Header della chat */}
      <div className="chat-header">
        <div className="header-content">
          <h3>🎵 Radio PoPizz Chat - Entra nella chat della radio!</h3>
          <div className="chat-controls">
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Il tuo username"
              className="username-input"
              maxLength={20}
            />
            {userIsAdmin && (
              <span className="admin-indicator" title="Sei un amministratore">
                👑 Admin
              </span>
            )}
            <span className="message-count">{messages.length} messaggi</span>
            
            {/* Bottoni visibili solo agli admin */}
            {userIsAdmin && (
              <>
                <button 
                  onClick={exportMessages}
                  className="export-button admin-button"
                  disabled={messages.length === 0}
                  title="Scarica chat in formato JSON (Solo Admin)"
                >
                  📥 Esporta
                </button>
                <button 
                  onClick={clearMessages}
                  className="clear-button admin-button"
                  disabled={messages.length === 0}
                  title="Cancella tutta la chat (Solo Admin)"
                >
                  🗑️ Cancella
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Area messaggi */}
      <div className="messages-container">
        {isLoading ? (
          <div className="loading-state">
            <p>🔄 Caricamento chat...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p>🎵 Benvenuto nella chat di Radio PoPizz!</p>
            <p>Inserisci un username e inizia a chattare con gli altri ascoltatori!</p>
            <p><small>💾 I tuoi messaggi vengono salvati automaticamente</small></p>
            {userIsAdmin && (
              <p><small>👑 Hai privilegi di amministratore</small></p>
            )}
          </div>
        ) : (
          <div className="messages">
            <div className="chat-info">
              <p><small>💾 Chat salvata automaticamente - {messages.length} messaggi caricati</small></p>
            </div>
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                text={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
                currentUser={username}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input container */}
      {username && (
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi un messaggio..."
              className="message-input"
              disabled={isSubmitting}
              rows="1"
              aria-label="Scrivi il tuo messaggio"
            />
            
            <button 
              onClick={handleSubmit}
              disabled={!newMessage.trim() || isSubmitting}
              className="send-button"
              aria-label="Invia messaggio"
            >
              {isSubmitting ? 'Invio...' : 'Invia'}
            </button>
          </div>
          
          <div className="char-counter">
            <span 
              className={`char-count ${remainingChars < 50 ? 'warning' : ''}`}
              aria-label={`${remainingChars} caratteri rimanenti`}
            >
              {remainingChars} caratteri rimanenti
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .integrated-chat-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .chat-header {
          background: #f8f9fa;
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .header-content h3 {
          margin: 0;
          color: #333;
          font-size: 1.2em;
          flex: 1;
          min-width: 300px;
        }

        .chat-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .username-input {
          padding: 8px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 1em;
          min-width: 150px;
          transition: border-color 0.3s ease;
        }

        .username-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .admin-indicator {
          background: linear-gradient(45deg, #ffd700, #ffed4a);
          color: #333;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8em;
          font-weight: bold;
          border: 1px solid #f39c12;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .message-count {
          color: #666;
          font-size: 0.9em;
          padding: 5px 10px;
          background: #e9ecef;
          border-radius: 12px;
          white-space: nowrap;
        }

        .admin-button {
          position: relative;
        }

        .admin-button::before {
          content: "👑";
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 12px;
          background: #ffd700;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #f39c12;
        }

        .export-button {
          padding: 6px 12px;
          border: 1px solid #28a745;
          background: white;
          color: #28a745;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9em;
        }

        .export-button:hover:not(:disabled) {
          background: #28a745;
          color: white;
        }

        .export-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .clear-button {
          padding: 6px 12px;
          border: 1px solid #dc3545;
          background: white;
          color: #dc3545;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9em;
        }

        .clear-button:hover:not(:disabled) {
          background: #dc3545;
          color: white;
        }

        .clear-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .messages-container {
          height: 400px;
          overflow-y: auto;
          padding: 20px;
          background: #fafafa;
        }

        .loading-state {
          text-align: center;
          color: #666;
          padding: 60px 20px;
        }

        .loading-state p {
          margin: 10px 0;
          font-size: 1.1em;
        }

        .chat-info {
          text-align: center;
          margin-bottom: 20px;
          padding: 10px;
          background: #e8f5e8;
          border-radius: 10px;
          border: 1px solid #d4edda;
        }

        .chat-info p {
          margin: 0;
          color: #155724;
        }

        .empty-state {
          text-align: center;
          color: #666;
          padding: 60px 20px;
        }

        .empty-state p {
          margin: 10px 0;
          font-size: 1.1em;
        }

        .messages {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .message {
          display: flex;
          max-width: 70%;
          margin-bottom: 5px;
        }

        .message.current-user {
          align-self: flex-end;
        }

        .message.current-user .message-content {
          background: #007bff;
          color: white;
          border-radius: 18px 18px 5px 18px;
        }

        .message.other-user .message-content {
          background: white;
          color: #333;
          border-radius: 18px 18px 18px 5px;
          border: 1px solid #e9ecef;
        }

        .message.admin-message .message-content {
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          border: 1px solid #ffd700;
        }

        .message.system {
          align-self: center;
          max-width: 80%;
        }

        .message.system .message-content {
          background: #f8f9fa;
          color: #666;
          border-radius: 15px;
          border: 1px solid #dee2e6;
          text-align: center;
        }

        .message-content {
          padding: 10px 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          word-wrap: break-word;
        }

        .message-sender {
          font-size: 0.8em;
          font-weight: bold;
          margin-bottom: 4px;
          opacity: 0.8;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .admin-badge {
          font-size: 0.7em;
          background: #ffd700;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #f39c12;
        }

        .message-content p {
          margin: 0;
          line-height: 1.4;
        }

        .message-timestamp {
          font-size: 0.7em;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }

        .input-container {
          padding: 20px;
          background: white;
          border-top: 1px solid #e9ecef;
        }

        .input-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          border: 2px solid #e9ecef;
          border-radius: 20px;
          padding: 10px 15px;
          outline: none;
          resize: none;
          font-family: inherit;
          font-size: 1em;
          line-height: 1.4;
          background: white;
          min-height: 40px;
          max-height: 100px;
        }

        .message-input:focus {
          border-color: #007bff;
        }

        .send-button {
          padding: 10px 20px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .send-button:hover:not(:disabled) {
          background: #218838;
          transform: translateY(-1px);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .char-counter {
          margin-top: 8px;
          text-align: right;
        }

        .char-count {
          font-size: 0.8em;
          color: #666;
        }

        .char-count.warning {
          color: #dc3545;
          font-weight: bold;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: stretch;
          }

          .header-content h3 {
            text-align: center;
            min-width: auto;
            margin-bottom: 10px;
          }

          .chat-controls {
            justify-content: center;
          }

          .username-input {
            min-width: 120px;
          }

          .message {
            max-width: 85%;
          }

          .messages-container {
            height: 300px;
            padding: 15px;
          }

          .input-container {
            padding: 15px;
          }

          .input-wrapper {
            flex-direction: column;
            gap: 10px;
          }

          .send-button {
            align-self: flex-end;
          }
        }

        /* Scrollbar personalizzata */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

// Componente principale dell'app
const App = () => {
  const [username, setUsername] = useState('');

  // Carica username salvato all'avvio
  useEffect(() => {
    const savedUsername = loadUsernameFromLocal();
    setUsername(savedUsername);
  }, []);

  const handleUsernameChange = (newUsername) => {
    const trimmedUsername = newUsername.slice(0, 20); // Limita a 20 caratteri
    setUsername(trimmedUsername);
    // Salva username automaticamente
    saveUsernameToLocal(trimmedUsername);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <IntegratedChat 
        username={username} 
        onUsernameChange={handleUsernameChange} 
      />
    </div>
  );
};

export default App;