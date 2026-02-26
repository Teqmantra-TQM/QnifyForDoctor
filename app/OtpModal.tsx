import React, { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface OtpModalProps {
  visible: boolean;
  phoneNumber: string;
  onVerify: (code: string) => void;
  onClose: () => void;
}

export default function OtpModal({ visible, phoneNumber, onVerify, onClose }: OtpModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(20);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
  
    let interval: ReturnType<typeof setInterval>;
    
    if (visible && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous box on backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
        >
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>Sent to {phoneNumber}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                // FIXED: Explicit ref callback function
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                style={[
                  styles.otpBox,
                  { 
                    borderColor: digit ? "#000" : "#E5E5E5", 
                    borderWidth: digit ? 2 : 1 
                  }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                // Help Android understand this is a single digit field
                textContentType="oneTimeCode"
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.verifyButton} 
            onPress={() => onVerify(otp.join(""))}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            disabled={timer > 0} 
            onPress={() => {
                setOtp(["", "", "", "", "", ""]);
                setTimer(20);
            }}
          >
            <Text style={styles.resendText}>
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContent: { 
    backgroundColor: "#fff", 
    width: "90%", 
    borderRadius: 20, 
    padding: 25, 
    alignItems: "center" 
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 25 },
  otpContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    marginBottom: 30 
  },
  otpBox: { 
    width: 45, 
    height: 55, 
    borderRadius: 10, 
    textAlign: "center", 
    fontSize: 20, 
    fontWeight: "bold", 
    backgroundColor: "#fff",
    borderWidth: 1 
  },
  verifyButton: { 
    backgroundColor: "#000", 
    width: "100%", 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: "center", 
    marginBottom: 20 
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  resendText: { color: "#666", fontSize: 14 },
});