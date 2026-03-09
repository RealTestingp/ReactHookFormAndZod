import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const employeeSchema = z.object({
  firstName: z
    .string().trim().min(3, "First name must be at least 3 characters"),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  studentId: z
    .string().trim().length(9, "Student ID must be exactly 9 characters"),
  phone: z
    .string().refine((val) => val.replace(/\D/g, "").length >= 10,"Phone number must have at least 10 digits",),
});

const employeeForm = () => {
  return (
    <View>
      <Text>employeeForm</Text>
    </View>
  )
}

export default employeeForm

const styles = StyleSheet.create({})