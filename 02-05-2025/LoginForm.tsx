import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { base_url } from "../utils/helper";
import CustomButton from "../components/CustomButton";
import styles from "../assets/Style";
import { showToast } from "../utils/ToastHelper";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//  Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleEyePress = () => setSecureText(!secureText);

  const onSubmit = async (formData: { email: string; password: string }) => {
    if (loading) return;
    setLoading(true);

    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const response = await axios.post(`${base_url}/users/login/`, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        showToast("success", "Login Successful");
        const { access, refresh, user_id } = response.data;

        await SecureStore.setItemAsync("access_token", access);
        await SecureStore.setItemAsync("refresh_token", refresh);
        await SecureStore.setItemAsync("user_id", user_id.toString());

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "DashBoard" }],
          })
        );
      }
    } catch (error) {
      showToast("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text variant="headlineMedium" style={styles.heading}>
        Login
      </Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              right={<TextInput.Icon icon="account" />}
              style={{ marginTop: 70 }}
              autoComplete="email"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email.message}
              </Text>
            )}
          </>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <TextInput
              label="Password"
              secureTextEntry={secureText}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              right={
                <TextInput.Icon
                  icon={secureText ? "eye" : "eye-off"}
                  onPress={handleEyePress}
                />
              }
              autoComplete="password"
              style={{}}
            />
            {errors.password && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      {/* Login Button */}
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        customStyle={{ marginBottom: 0 }}
      >
        {loading ? "Logging in ..." : "Login"}
      </CustomButton>

      {/* Register Button */}
      <CustomButton
        onPress={() => navigation.navigate("Register")}
        customStyle={{ marginTop: 10 }}
      >
        Register
      </CustomButton>
    </View>
  );
};

export default LoginForm;
