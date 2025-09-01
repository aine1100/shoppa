import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Send, ArrowLeft } = Lucide || {};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey Lucas!",
      isUser: false,
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "Hi Brooke!",
      isUser: true,
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      text: "How's your project going?",
      isUser: false,
      timestamp: "10:33 AM",
    },
    {
      id: "4",
      text: "It's going well. Thanks for asking!",
      isUser: true,
      timestamp: "10:35 AM",
    },
    {
      id: "5",
      text: "No worries. Let me know if you need any help 😊",
      isUser: false,
      timestamp: "10:36 AM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          {Ionicons.glyphMap['arrow-back'] ? (
            <Ionicons name="arrow-back" size={24} color={Colors.tint} />
          ) : ArrowLeft ? (
            <ArrowLeft size={24} color={Colors.tint} />
          ) : (
            <Ionicons name="arrow-back-outline" size={24} color={Colors.tint} />
          )}
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Brooke Davis</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <View style={styles.avatar}>
            {Ionicons.glyphMap['person'] ? (
              <Ionicons name="person" size={20} color={Colors.tint} />
            ) : (
              <Ionicons name="person-outline" size={20} color={Colors.tint} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.isUser ? styles.userMessage : styles.shopMessage,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.isUser ? styles.userBubble : styles.shopBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.isUser ? styles.userText : styles.shopText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  msg.isUser ? styles.userTimestamp : styles.shopTimestamp,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add" size={20} color={Colors.tint} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            {Ionicons.glyphMap['send'] ? (
              <Ionicons 
                name="send" 
                size={20} 
                color={message.trim() ? "#fff" : "#ccc"} 
              />
            ) : Send ? (
              <Send 
                size={20} 
                color={message.trim() ? "#fff" : "#ccc"} 
              />
            ) : (
              <Ionicons 
                name="send-outline" 
                size={20} 
                color={message.trim() ? "#fff" : "#ccc"} 
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },

  // Messages styles
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  shopMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: Colors.tint,
    borderBottomRightRadius: 4,
  },
  shopBubble: {
    backgroundColor: "#f5f5f5",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#fff",
  },
  shopText: {
    color: "#2c2c2c",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  shopTimestamp: {
    color: "#999",
  },

  // Input styles
  inputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#2c2c2c",
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.tint,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
