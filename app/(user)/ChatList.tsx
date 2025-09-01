import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Search, MessageCircle, User, Settings } = Lucide || {};

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    unreadCount: number;
    timestamp: string;
    isOnline: boolean;
}

export default function ChatListScreen() {
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data for chat conversations
    const chats: Chat[] = [
        {
            id: "1",
            name: "Haley James",
            lastMessage: "Stand up for what you believe in",
            unreadCount: 9,
            timestamp: "2m",
            isOnline: true,
        },
        {
            id: "2",
            name: "Nathan Scott",
            lastMessage: "One day you're seventeen and planning for someday. And then quietly and without...",
            unreadCount: 0,
            timestamp: "5m",
            isOnline: false,
        },
        {
            id: "3",
            name: "Brooke Davis",
            lastMessage: "I am who I am. No excuses.",
            unreadCount: 2,
            timestamp: "1h",
            isOnline: true,
        },
        {
            id: "4",
            name: "Jamie Scott",
            lastMessage: "Some people are a little different. I think that's cool.",
            unreadCount: 0,
            timestamp: "2h",
            isOnline: false,
        },
        {
            id: "5",
            name: "Marvin McFadden",
            lastMessage: "Last night in the NBA the Charlotte Bobcats quietly made a move that most sports fans...",
            unreadCount: 0,
            timestamp: "3h",
            isOnline: false,
        },
        {
            id: "6",
            name: "Antwon Taylor",
            lastMessage: "Meet me at the Rivercourt",
            unreadCount: 0,
            timestamp: "5h",
            isOnline: true,
        },
        {
            id: "7",
            name: "Jake Jagielski",
            lastMessage: "In your life, you're gonna go to some great places, and do some wonderful things.",
            unreadCount: 0,
            timestamp: "1d",
            isOnline: false,
        },
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChat = ({ item }: { item: Chat }) => (
        <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => router.push("/(user)/Chat")}
        >
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    {Ionicons.glyphMap['person'] ? (
                        <Ionicons name="person" size={24} color={Colors.tint} />
                    ) : User ? (
                        <User size={24} color={Colors.tint} />
                    ) : (
                        <Ionicons name="person-outline" size={24} color={Colors.tint} />
                    )}
                </View>
                {item.isOnline && <View style={styles.onlineIndicator} />}
            </View>

            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newChatButton}>
                        {Ionicons.glyphMap['create'] ? (
                            <Ionicons name="create" size={20} color="#fff" />
                        ) : (
                            <Ionicons name="add" size={20} color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    {Ionicons.glyphMap['search'] ? (
                        <Ionicons name="search" size={20} color="#999" />
                    ) : Search ? (
                        <Search size={20} color="#999" />
                    ) : (
                        <Ionicons name="search-outline" size={20} color="#999" />
                    )}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Chat List */}
            <FlatList
                data={filteredChats}
                renderItem={renderChat}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatList}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    {Ionicons.glyphMap['chatbubble'] ? (
                        <Ionicons name="chatbubble" size={24} color={Colors.tint} />
                    ) : MessageCircle ? (
                        <MessageCircle size={24} color={Colors.tint} />
                    ) : (
                        <Ionicons name="chatbubble-outline" size={24} color={Colors.tint} />
                    )}
                    <Text style={styles.navItemText}>Chats</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    {Ionicons.glyphMap['people'] ? (
                        <Ionicons name="people" size={24} color="#999" />
                    ) : User ? (
                        <User size={24} color="#999" />
                    ) : (
                        <Ionicons name="people-outline" size={24} color="#999" />
                    )}
                    <Text style={[styles.navItemText, { color: "#999" }]}>Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    {Ionicons.glyphMap['settings'] ? (
                        <Ionicons name="settings" size={24} color="#999" />
                    ) : Settings ? (
                        <Settings size={24} color="#999" />
                    ) : (
                        <Ionicons name="settings-outline" size={24} color="#999" />
                    )}
                    <Text style={[styles.navItemText, { color: "#999" }]}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#2c2c2c",
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    headerButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    headerButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.tint,
    },
    newChatButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.tint,
        alignItems: "center",
        justifyContent: "center",
    },

    // Search styles
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: "#000",
    },

    // Chat list styles
    chatList: {
        paddingBottom: 100,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    avatarContainer: {
        position: "relative",
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.tint,
        borderWidth: 2,
        borderColor: "#fff",
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2c2c2c",
    },
    timestamp: {
        fontSize: 12,
        color: "#999",
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        color: "#666",
        marginRight: 8,
    },
    unreadBadge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.tint,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
    },
    unreadCount: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },

    // Bottom navigation styles
    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 8,
    },
    navItemText: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.tint,
        marginTop: 4,
    },
});
