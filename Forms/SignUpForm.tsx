import { theme } from '@/styles/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(50, "First name must be at most 50 characters"),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(50, "Last name must be at most 50 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

type Props = { onSuccess: () => void };

const SignUpForm = ({ onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const watchedValues = watch();
  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);

  const onSubmit = (data: SignUpForm) => {
    console.log("Sign Up: ", data);
    onSuccess();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="e.g. Dylan"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="e.g. Khuu"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
      <Pressable
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isFormFilled}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen
  },
  h1: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 15,
    color: theme.colors.mute,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error
  },
  error: {
    color: theme.colors.error,
    fontSize: 13,
    marginTop: 4
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: theme.radius.input,
    marginTop: 28,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
});