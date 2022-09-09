import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo"
import AuthContext from "../contexts/Authentication";

const SignupScreen = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const { setUserId } = useContext(AuthContext)

    const { client } = useChatContext()

    const connectUser = async (username: string, fullName: string) => {
        await client.connectUser(
            {
                id: username,
                name: fullName,
            },
            client.devToken(username)
        );

        const channel = client.channel("messaging", "zchat", {
            name: "zchat",
        });
        await channel.create();

        setUserId(username)
    };

    const signUp = () => {
        connectUser(username, fullName)
    };
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name" 
                style={styles.input}
                />
            </View>

            <Pressable onPress={signUp} style={styles.button}>
                <Text>Sign Up</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        margin: 10,
    },
    inputContainer: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 10,
    },
    input: {},
    button: {
        backgroundColor: "#A6E1FA",
        padding: 15,
        alignItems: "center",
        marginVertical: 10,
    },
});

export default SignupScreen;
