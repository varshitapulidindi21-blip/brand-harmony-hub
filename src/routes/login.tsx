import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Mail, ArrowRight, Lock } from "lucide-react";
import loginBg from "@/assets/login-bg.png";
import logo from "@/assets/resolven-logo.png";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Resolven" },
      { name: "description", content: "Sign in to your Resolven workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    signIn();
    setTimeout(() => navigate({ to: "/", replace: true }), 450);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#2b1654]">
      {/* Background image */}
      <img
        src={loginBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Atmospheric purple overlay covering reference UI area on the left */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(43,22,84,0.96) 0%, rgba(60,30,120,0.85) 32%, rgba(90,55,160,0.55) 55%, rgba(120,80,180,0.25) 78%, rgba(120,80,180,0.10) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 5% 30%, rgba(80,40,160,0.55), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(40,200,120,0.18), transparent 70%)",
        }}
      />

      {/* Green corner accent (top right) */}
      <div
        aria-hidden
        className="absolute right-6 top-6 sm:right-10 sm:top-10 flex flex-col gap-1.5"
      >
        <span className="block h-2.5 w-20 sm:w-28 -skew-x-[28deg] bg-[#21c45d] shadow-[0_0_30px_rgba(33,196,93,0.6)]" />
        <span className="block h-2.5 w-20 sm:w-28 -skew-x-[28deg] bg-[#21c45d] shadow-[0_0_30px_rgba(33,196,93,0.6)]" />
        <span className="block h-2.5 w-20 sm:w-28 -skew-x-[28deg] bg-[#21c45d] shadow-[0_0_30px_rgba(33,196,93,0.6)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center sm:items-stretch">
        <div className="w-full sm:max-w-[640px] sm:pt-[12vh] px-4 sm:px-0">
          {/* Logo bar — slanted white */}
          <div
            className="animate-rise relative flex h-[88px] sm:h-[120px] items-center bg-white pl-6 sm:pl-16 pr-10 sm:pr-20"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 48px) 100%, 0 100%)" }}
          >
            <img src={logo} alt="Resolven" className="h-10 sm:h-16 w-auto" />
          </div>

          {/* Spacer */}
          <div className="h-10 sm:h-16" />

          {/* Sign in with Resolven ID — green slanted */}
          <button
            onClick={handleLogin}
            disabled={submitting}
            className="animate-rise group relative flex h-[58px] sm:h-[68px] w-full items-center bg-[#21c45d] pl-6 sm:pl-16 pr-14 sm:pr-20 text-white shadow-[0_10px_40px_-10px_rgba(33,196,93,0.55)] transition-all duration-300 hover:brightness-110 active:scale-[0.995] disabled:opacity-80"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
          >
            <LogIn className="mr-3 h-5 w-5" strokeWidth={1.8} />
            <span
              className="text-[15px] sm:text-[17px] font-medium tracking-wide"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
            >
              Sign in with Resolven ID
            </span>
            <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </button>

          {/* Spacer */}
          <div className="h-5 sm:h-8" />

          {/* Sign in with Email — translucent slanted */}
          {!showEmailForm && (
            <button
              onClick={() => setShowEmailForm(true)}
              className="animate-rise group relative flex h-[58px] sm:h-[68px] w-full items-center bg-white/25 pl-6 sm:pl-16 pr-14 sm:pr-20 text-white backdrop-blur-md ring-1 ring-inset ring-white/20 transition-all duration-300 hover:bg-white/35"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
            >
              <Mail className="mr-3 h-5 w-5 text-white" strokeWidth={1.7} />
              <span
                className="text-[15px] sm:text-[17px] font-medium tracking-wide"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
              >
                Sign in with Email
              </span>
              <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </button>
          )}

          {/* Email form — slanted */}
          {showEmailForm && (
            <form
              onSubmit={handleLogin}
              className="relative animate-in fade-in slide-in-from-top-2 duration-500"
            >
              <div
                className="relative flex h-[58px] sm:h-[68px] w-full items-center bg-white/25 pl-6 sm:pl-16 pr-14 sm:pr-20 text-white backdrop-blur-md ring-1 ring-inset ring-white/20"
                style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
              >
                <Mail className="mr-3 h-5 w-5 text-white/90" strokeWidth={1.7} />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 bg-transparent text-[15px] sm:text-[16px] font-light tracking-wide text-white placeholder:text-white/70 focus:outline-none"
                  style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
                />
              </div>

              <div className="h-3 sm:h-4" />

              <div
                className="relative flex h-[58px] sm:h-[68px] w-full items-center bg-white/25 pl-6 sm:pl-16 pr-14 sm:pr-20 text-white backdrop-blur-md ring-1 ring-inset ring-white/20"
                style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
              >
                <Lock className="mr-3 h-5 w-5 text-white/90" strokeWidth={1.7} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="flex-1 bg-transparent text-[15px] sm:text-[16px] font-light tracking-wide text-white placeholder:text-white/70 focus:outline-none"
                  style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
                />
              </div>

              <div className="h-5 sm:h-6" />

              <button
                type="submit"
                disabled={submitting}
                className="group relative flex h-[58px] sm:h-[68px] w-full items-center justify-center bg-white pl-6 sm:pl-16 pr-14 sm:pr-20 text-[#3b1d8a] shadow-[0_12px_40px_-12px_rgba(255,255,255,0.45)] transition-all duration-300 hover:brightness-105 active:scale-[0.995] disabled:opacity-80"
                style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" }}
              >
                <span
                  className="text-[15px] sm:text-[17px] font-semibold tracking-wide"
                  style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
                >
                  {submitting ? "Signing in…" : "Login"}
                </span>
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}

          {/* Spacer */}
          <div className="h-6 sm:h-10" />

          <button
            type="button"
            className="ml-6 sm:ml-16 text-[13px] sm:text-[14px] font-medium tracking-wide text-white/95 transition-opacity hover:opacity-80"
            style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
