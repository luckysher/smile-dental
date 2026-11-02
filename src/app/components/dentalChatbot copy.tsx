import React, { useState } from "react";
import PropertyCard from "./propertyCard";
import TimeSlotsCard from "./timeSlotsCard";

const quickQuestions = [
  "Show me 3 BHK properties",
  "Properties under ₹1 Cr",
  "Best properties in Goa",
  "I want a property near Bangalore",
];

const DentalChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
                                                {
                                                id: 1,
                                                sender: "ai",
                                                text: "Hi! 👋 Welcome to smile dental and I'm your real-estate assistant. I can help you find properties, compare prices, and answer questions about listings. I can also schedule viewings.",
                                                },
                                            ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const propertyJsonToDetail = (props) => {
      let details = "";
      for(let i=0; i < props.length; i++){
         const prop = props[i];
         details += `Match ${i+1}: (ID: ${prop['title'].toLowerCase().replaceAll(" ", "_")}_${prop['id']}) ${prop['description']} \n`;
      }      
      return details;
  }

  const slotsJsonToDetail = (slotJson) => {
    let details = "available time slots are";
       if (Object.keys(slotJson).length){
           details = ` Availble time slots are: ${Object.values(slotJson)}`;
       } 
    return details;
  }

  const sendMessage = async (messageText = input) => {
        const text = messageText.trim();

        if (!text) return;

        // Add user message
        const userMessage = {
        id: Date.now(),
        sender: "user",
        text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
          
          // load chat history
          const chatHistoryData = localStorage.getItem('chatHistory');          
          const chatHistory = JSON.parse(chatHistoryData || "[]");

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/chat`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              query: text,
                              history: chatHistory
                            }),
          });
        
        const resJson = await response.json();
        
        const matchedProperties = resJson.matched_properties || [];
        const timeSlots = resJson.time_slots || {};
        const aiResponse = (resJson.response  + (matchedProperties.length > 0? "**Found some properties matches for you. Have a look at the following properties:** ": "") || "")?.replace("##MATCHED_LISTING##", "");
            aiResponse.replace("##AVAILABLE_SLOTS##", "");
        
        let contentForHistory = aiResponse;

        if (matchedProperties.length){
            contentForHistory = matchedProperties? 
                                      (resJson.response || "")?.replace("##MATCHED_LISTING##", propertyJsonToDetail(matchedProperties))
                                      : aiResponse;
         }
         if (Object.keys(timeSlots).length){
            contentForHistory = timeSlots? 
                                      (resJson.response || "")?.replace("##AVAILABLE_SLOTS##", slotsJsonToDetail(timeSlots))
                                      : aiResponse;
         } 

         // save chat history
         const newChatHistory = [{role: "user", content: text},
                                 {role: "assistant", content: contentForHistory}].concat(chatHistory);
         localStorage.setItem('chatHistory', JSON.stringify(newChatHistory));

         console.log("saved chat history");
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const aiMessage = {
            id: Date.now() + 1,
            sender: "ai",
            text: aiResponse,
            matchedProperties: matchedProperties,
            timeSlots: timeSlots,
        };

        setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {
          console.log(error);
          setMessages((prev) => [
              ...prev,
              {
              id: Date.now() + 1,
              sender: "ai",
              text: "Sorry, something went wrong. Please try again.",
              },
          ]);
        } finally {
          setIsTyping(false);
        }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBotClick = () => {
    console.log("button click");
    setIsOpen(true);
  }

  const renderMarkdownBold = (text: string) => {
    text = text.replace("Short description:", "Check out following listing:");
    const markedText = (text.split('**').length > 1)? text.split('**'): (text.split('*').length > 1? text.split('*'): text.split("**"));
    return markedText.map((part, i) => {      
      return i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
    });
  };

  const renderAiResponse = (aiGeneratedText: string) => {

     return (
            aiGeneratedText.split("\n").map((lineText, i) => (
               <p key={i}>{renderMarkdownBold(lineText)}</p> 
            ))
     )
  }

  return (
    <>
      {/* Floating Chat Button */}
      
      {!isOpen && (
        <button
          className="realestate-chat-button"
          onClick={handleBotClick}
          aria-label="Open AI real estate assistant"
        >
          <span className="chat-icon">
          <img
                className="bot-icon"
                src={"/chatbot.png"}
                alt={"chatbot"}
                />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="realestate-chatbot">
          {/* Header */}
          <div className="chat-header">
            <div className="assistant-info">
              <div className="assistant-avatar">🏠</div>

              <div>
                <div className="assistant-name">
                  VertexLiving Property Assistant
                </div>

                <div className="assistant-status">
                  <span className="online-dot"></span>
                  AI Assistant
                </div>
              </div>
            </div>

            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender}`}
              >
                {message.sender === "ai" && (
                  <div className="small-avatar">🏠</div>
                )}

                <div className="message-content">
                  <div className="message-bubble">
                    {message.sender === "ai"? renderAiResponse(message.text): message.text}

                    {Object.keys(message.timeSlots || {}).length > 0 && (
                      <div className="property-results">                      
                        <TimeSlotsCard timeSlots={message.timeSlots} />
                      </div>
                    )}
                  </div>
                  
                  {/* Property Results */}
                  {(message.matchedProperties || []).length > 0 && (
                    <div className="property-results">
                      {(message.matchedProperties || []).map((property, i) => (
                        <PropertyCard property={property} key={i} />
                      ))}
                    </div>
                  )}
                                    
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="message-row ai">
                <div className="small-avatar">🏠</div>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="quick-questions">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about properties..."
              rows={1}
            />

            <button
              className="send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
            >
              ➤
            </button>
          </div>

          <div className="chat-footer">
            AI can make mistakes. Please verify property details.
          </div>
        </div>
      )}
    </>
  );
}

export default DentalChatbot;