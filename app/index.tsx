import EmployeeForm from "@/app/(tabs)/EmployeeForm";
import SignInForm from "@/app/(tabs)/SignInForm";
import SignUpForm from "@/app/(tabs)/SignUpForm";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Screen = "signIn" | "signUp" | "employee";

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<Screen>("signIn");

  if(activeScreen === "employee") {
    return <EmployeeForm/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>

        <Pressable style={[styles.tab, activeScreen === "signIn" && styles.activeScreen]} onPress={() => setActiveScreen("signIn")}>
          <Text style={[styles.tabText, activeScreen === "signIn" && styles.activeScreenText]}>
            Sign In
          </Text>
        </Pressable>

        <Pressable style={[styles.tab, activeScreen === "signUp" && styles.activeScreen]} onPress={() => setActiveScreen("signUp")}>
          <Text style={[styles.tabText, activeScreen === "signUp" && styles.activeScreenText]}>
            Sign Up
          </Text>
        </Pressable>

      </View>

      <View style={styles.formContainer}>
        {activeScreen === "signIn" && <SignInForm onSuccess={() => setActiveScreen("employee")} />}
        {activeScreen === "signUp" && <SignUpForm onSuccess={() => setActiveScreen("employee")} />}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  activeScreen: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.mute,
  },
  activeScreenText: {
    color: theme.colors.primary,
  },
  formContainer: {
    flex: 1,
  },
})
