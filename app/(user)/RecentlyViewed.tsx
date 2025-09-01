import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Calendar, ArrowLeft } = Lucide || {};

interface Product {
    id: string;
    name: string;
    price: string;
    image: any;
    date: string;
}

export default function RecentlyViewedScreen() {
    const [selectedDate, setSelectedDate] = useState("Today");
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState("18");

    // Mock data for recently viewed products
    const products: Product[] = [
        {
            id: "1",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "Today",
        },
        {
            id: "2",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "Today",
        },
        {
            id: "3",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "Yesterday",
        },
        {
            id: "4",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "Yesterday",
        },
        {
            id: "5",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "April, 18",
        },
        {
            id: "6",
            name: "Lorem ipsum dolor sit amet consectetur",
            price: "$17,00",
            image: require("../../assets/images/shoe.png"),
            date: "April, 18",
        },
    ];

    const filteredProducts = products.filter(product => {
        if (selectedDate === "Today") return product.date === "Today";
        if (selectedDate === "Yesterday") return product.date === "Yesterday";
        if (selectedDate === "April, 18") return product.date === "April, 18";
        return true;
    });

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        if (date !== "Today" && date !== "Yesterday") {
            setShowCalendar(false);
        }
    };

    const handleCalendarDateSelect = (date: string) => {
        setSelectedCalendarDate(date);
        setSelectedDate(`April, ${date}`);
        setShowCalendar(false);
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity 
            style={styles.productCard}
            onPress={() => router.push("/(user)/ProductDetail")}
        >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    const renderCalendarDay = (day: number) => {
        const dayString = day.toString().padStart(2, '0');
        const isSelected = selectedCalendarDate === dayString;
        
        return (
            <TouchableOpacity
                key={day}
                style={[
                    styles.calendarDay,
                    isSelected && styles.selectedCalendarDay
                ]}
                onPress={() => handleCalendarDateSelect(dayString)}
            >
                <Text style={[
                    styles.calendarDayText,
                    isSelected && styles.selectedCalendarDayText
                ]}>
                    {dayString}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    {Ionicons.glyphMap['arrow-back'] ? (
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    ) : ArrowLeft ? (
                        <ArrowLeft size={24} color="#000" />
                    ) : (
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                    )}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recently viewed</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Date Filter */}
            <View style={styles.dateFilterContainer}>
                <TouchableOpacity
                    style={[
                        styles.dateButton,
                        selectedDate === "Today" && styles.selectedDateButton
                    ]}
                    onPress={() => handleDateSelect("Today")}
                >
                    <Text style={[
                        styles.dateButtonText,
                        selectedDate === "Today" && styles.selectedDateButtonText
                    ]}>
                        Today
                    </Text>
                    {selectedDate === "Today" && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.dateButton,
                        selectedDate === "Yesterday" && styles.selectedDateButton
                    ]}
                    onPress={() => handleDateSelect("Yesterday")}
                >
                    <Text style={[
                        styles.dateButtonText,
                        selectedDate === "Yesterday" && styles.selectedDateButtonText
                    ]}>
                        Yesterday
                    </Text>
                    {selectedDate === "Yesterday" && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.dateButton,
                        selectedDate.includes("April") && styles.selectedDateButton
                    ]}
                    onPress={() => setShowCalendar(true)}
                >
                    <Text style={[
                        styles.dateButtonText,
                        selectedDate.includes("April") && styles.selectedDateButtonText
                    ]}>
                        {selectedDate.includes("April") ? selectedDate : "Select Date"}
                    </Text>
                    {selectedDate.includes("April") && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>

            {/* Products Grid */}
            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.productsGrid}
                showsVerticalScrollIndicator={false}
            />

            {/* Calendar Modal */}
            <Modal
                visible={showCalendar}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.calendarModal}>
                        <View style={styles.calendarHeader}>
                            <TouchableOpacity style={styles.calendarNavButton}>
                                <Ionicons name="chevron-back" size={20} color={Colors.tint} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.monthButton}>
                                <Text style={styles.monthText}>April</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendarNavButton}>
                                <Ionicons name="chevron-forward" size={20} color={Colors.tint} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.calendarGrid}>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(renderCalendarDay)}
                        </View>

                        <TouchableOpacity 
                            style={styles.collapseButton}
                            onPress={() => setShowCalendar(false)}
                        >
                            <Ionicons name="chevron-up" size={20} color={Colors.tint} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2c2c2c",
        flex: 1,
        textAlign: "center",
    },
    placeholder: {
        width: 40,
    },

    // Date filter styles
    dateFilterContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        gap: 8,
    },
    selectedDateButton: {
        backgroundColor: Colors.tint,
    },
    dateButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
    },
    selectedDateButtonText: {
        color: "#fff",
    },

    // Products grid styles
    productsGrid: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    productCard: {
        flex: 1,
        marginHorizontal: 4,
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
        resizeMode: "cover",
    },
    productName: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
        lineHeight: 16,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.tint,
    },

    // Calendar modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    calendarModal: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 32,
        minWidth: 300,
    },
    calendarHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    calendarNavButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    monthButton: {
        backgroundColor: Colors.tint,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    monthText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    calendarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    calendarDay: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        borderRadius: 20,
    },
    selectedCalendarDay: {
        backgroundColor: Colors.tint,
    },
    calendarDayText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2c2c2c",
    },
    selectedCalendarDayText: {
        color: "#fff",
    },
    collapseButton: {
        alignItems: "center",
        paddingVertical: 8,
    },
});
