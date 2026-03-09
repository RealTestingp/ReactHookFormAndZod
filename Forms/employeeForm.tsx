import { theme } from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { z } from "zod";

const employeeSchema = z.object({
  firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(50, "First name must be at most 50 characters"),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(50, "Last name must be at most 50 characters"),
  email: z.string().trim().email("Invalid email address"),
  employeeId: z.string().trim().length(9, "Employee ID must be exactly 9 characters"),
  phone: z.string().refine((val) => val.replace(/\D/g, "").length >= 10, "Phone number must have at least 10 digits"),
});

type EmployeeForm = z.infer<typeof employeeSchema>;

const EmployeeForm = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [hasSavedData, setHasSavedData] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const watchedValues = watch();
  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);

  const onSubmit = (data: EmployeeForm) => {
    setHasSavedData(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  // View
  if (!isEditing) {
    const values = watch();
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.h1}>My Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>First Name</Text>
            <Text style={styles.infoValues}>{values.firstName}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Name</Text>
            <Text style={styles.infoValues}>{values.lastName}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValues}>{values.email}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Employee ID</Text>
            <Text style={styles.infoValues}>{values.employeeId}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValues}>{values.phone}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit Information</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // Edit
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Employee Information Form</Text>

      {/* First Name */}
      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="e.g Jane"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

      {/* Last Name */}
      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="e.g Smith"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="e.g example@example.com"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="e.g 123-456-7890"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      {/* Employee ID */}
      <Text style={styles.label}>Employee ID</Text>
      <Controller
        control={control}
        name="employeeId"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.employeeId && styles.inputError]}
            placeholder="e.g A00123456"
            placeholderTextColor={theme.colors.mute}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
          />
        )}
      />
      {errors.employeeId && <Text style={styles.error}>{errors.employeeId.message}</Text>}

      {/* Buttons */}
      {hasSavedData ? (
        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.savedButton, !isFormFilled && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isFormFilled}
          >
            <Text style={styles.buttonText}>Save Information</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={[styles.button, !isFormFilled && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormFilled}
        >
          <Text style={styles.buttonText}>Save Information</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen,
  },
  h1: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    color: theme.colors.text,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
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
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: theme.radius.input,
    marginTop: 28,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    marginBottom: 12,
  },
  infoRow: {
    padding: 16,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.mute,
    marginBottom: 4,
  },
  infoValues: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: "500",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.bg,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
  },
  cancelButton: {
    flex: 1,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  cancelButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  savedButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
  },
});