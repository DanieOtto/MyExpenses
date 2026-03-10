import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../providers/AuthProvider";
import React, { useState } from "react";
import { TouchableOpacity, View, Modal, Text, StyleSheet, Pressable } from "react-native";

export default function TabsLayout() {
  const auth = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const handleLogout = async () => {
    closeDrawer();
    setTimeout(async () => {
      await auth.signOut();
    }, 200);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={openDrawer}
              style={{ marginLeft: 16 }}
              accessibilityLabel="Open menu"
            >
              <FontAwesome name="bars" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="expenses"
          options={{
            title: "Expenses",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="credit-card" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="income"
          options={{
            title: "Income",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="dollar" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="trends"
          options={{
            title: "Trends",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="line-chart" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent
        onRequestClose={closeDrawer}
      >
        <Pressable style={styles.overlay} onPress={closeDrawer} />
        <View style={styles.drawer}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="#333" style={{ marginRight: 12 }} />
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 16,
    zIndex: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
  },
});