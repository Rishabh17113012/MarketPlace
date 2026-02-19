import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Wrapper */}
      <div className="w-full flex justify-center pt-6 px-4">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl"
        >
          <div className="flex h-16 items-center justify-between rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/40 px-6">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-sm font-semibold">M</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                Marketplace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 md:flex">

              <Link
                to="/"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  isActive("/")
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                )}
              >
                Products
              </Link>

              {user ? (
                <>
                  <Link
                    to="/favorites"
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2",
                      isActive("/favorites")
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                    )}
                  >
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Link>

                  <div className="mx-2 h-6 w-px bg-white/40" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="rounded-full text-muted-foreground hover:text-foreground hover:bg-white/60"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <div className="mx-2 h-6 w-px bg-white/40" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/auth")}
                    className="rounded-full text-muted-foreground hover:text-foreground hover:bg-white/60"
                  >
                    Sign In
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => navigate("/auth?tab=register")}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/60 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

          </div>
        </motion.header>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-28 z-40 rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40 p-5 md:hidden"
          >
            <nav className="flex flex-col gap-3">

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive("/")
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "hover:bg-white/60"
                )}
              >
                Products
              </Link>

              {user ? (
                <>
                  <Link
                    to="/favorites"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center gap-2",
                      isActive("/favorites")
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        : "hover:bg-white/60"
                    )}
                  >
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-left hover:bg-white/60 flex items-center gap-2 text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/auth?tab=register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
