import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("https://chat-application-8a7q.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && message.trim() !== "") {
      socket.emit("chat", { username, message });
      setMessage("");
    }
  };

  return (
    <div className="App">
      <h1>React Chat App</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.username === username ? "outgoing" : "incoming"}>
            <p>{msg.username}: {msg.message}</p>
          </div>
        ))}
      </div>
      <div className="input-area">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
