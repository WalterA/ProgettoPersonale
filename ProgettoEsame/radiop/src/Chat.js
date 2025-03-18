import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'User' }]);
      setNewMessage('');
    }
  };

  const Message = ({ text, sender }) => {
    return (
      <div className={`message ${sender.toLowerCase()}`}>
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Scrivi un messaggio..." 
        />
        <button onClick={handleSendMessage}>Invia</button>
      </div>
    </div>
  );
};

export default Chat;
