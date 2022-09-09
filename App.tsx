import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { StreamChat } from "stream-chat";
import Navigation from "./navigation";
import AuthContext from "./contexts/Authentication";

import {
    OverlayProvider,
    Chat,
} from "stream-chat-expo";

// const API_KEY = "3gha5rcb8stt";
// const client = StreamChat.getInstance(API_KEY);
const client = StreamChat.getInstance("3gha5rcb8stt", { 
    timeout: 6000,
})

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [userId, setUserId] =useState("")

    const [selectedChannel, setSelectedChannel] = useState<any>(null)
    useEffect(() => {
        return () => client.disconnectUser();
    }, []);



    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AuthContext.Provider value={{ userId, setUserId }}>
                <OverlayProvider>
                    <Chat client={client}>
                    <Navigation colorScheme="light" />
                    </Chat>
                </OverlayProvider>
                <StatusBar />
                </AuthContext.Provider>
            </SafeAreaProvider>
        );
    }
}
