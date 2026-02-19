import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(
    searchParams.get("tab") === "register"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsRegister(searchParams.get("tab") === "register");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await signUp(email, password, fullName);
        toast.success(
          "Account created! Please verify your email before signing in."
        );
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
      }
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100 via-indigo-100 to-white" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-2xl border border-white/40"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
            <span className="text-white text-lg font-semibold">M</span>
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {isRegister
              ? "Start exploring the marketplace"
              : "Sign in to continue"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Label
                  htmlFor="fullName"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="mt-2 h-11 rounded-xl bg-white/70 backdrop-blur-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <Label
              htmlFor="email"
              className="text-xs font-medium text-muted-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-2 h-11 rounded-xl bg-white/70 backdrop-blur-sm"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-xs font-medium text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-2 h-11 rounded-xl bg-white/70 backdrop-blur-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg"
          >
            {loading
              ? "Loading..."
              : isRegister
              ? "Create Account"
              : "Sign In"}
          </Button>
        </form>

        {/* Switch Mode */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
