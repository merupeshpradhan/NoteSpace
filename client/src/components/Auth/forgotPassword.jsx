import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../Api/api.js";

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/otp/send-otp", {
        email,
      });

      toast.success(response.data.message);

      // Show OTP input after OTP is successfully sent
      setShowOtp(true);
    } catch (error) {
      console.error("Send OTP error:", error);

      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/otp/verify-otp", {
        email,
        otp,
      });

      toast.success(response.data.message);

      // OTP verified successfully
      setOtp("");
      setShowOtp(false);
    } catch (error) {
      console.error("Verify OTP error:", error);

      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {/* Email */}
      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>

      {/* OTP */}
      {showOtp && (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
