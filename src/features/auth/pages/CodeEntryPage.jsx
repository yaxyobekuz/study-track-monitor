// React
import { useState } from "react";

// Router
import { useNavigate, Navigate } from "react-router-dom";

// Toast
import { toast } from "sonner";

// Assets
import { logoIcon } from "@/shared/assets/icons";

// API
import { monitorAuthAPI } from "@/features/auth/api/monitor-auth.api";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputOtp from "@/shared/components/ui/input/InputOtp";

const CodeEntryPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Agar kod allaqachon saqlangan bo'lsa, dashboardga yo'naltirish
  if (localStorage.getItem("monitorCode")) {
    return <Navigate to="/schedules-today" replace />;
  }

  const verifyCode = async (verifyValue) => {
    setIsLoading(true);
    try {
      const res = await monitorAuthAPI.verify(verifyValue);

      if (res.data?.success) {
        localStorage.setItem("monitorCode", verifyValue);
        navigate("/schedules-today");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Kod noto'g'ri");
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (code.length !== 6) {
      return toast.error("6 xonali kodni to'liq kiriting");
    }
    verifyCode(code);
  };

  const handleCodeChange = (value) => {
    setCode(value);
    if (value.length === 6) {
      setTimeout(() => verifyCode(value), 150);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={logoIcon}
            alt="MBSI School logo"
            className="size-20"
          />
          <h1 className="text-3xl font-bold text-gray-900">MBSI School</h1>
        </div>

        {/* Sarlavha */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Monitor tizimiga kirish
          </h2>
          <p className="text-gray-500 mt-2">
            6 xonali monitor kodini kiriting
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center">
          <InputOtp
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
          />
        </div>

        {/* Kirish tugmasi */}
        <Button
          size="lg"
          className="w-full max-w-xs"
          onClick={handleSubmit}
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? "Tekshirilmoqda..." : "Kirish"}
        </Button>
      </div>
    </div>
  );
};

export default CodeEntryPage;
