import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
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

const SignUpForm = () => {
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
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange,}})}
    </ScrollView>
  )



}

export default SignUpForm

const styles = StyleSheet.create({})