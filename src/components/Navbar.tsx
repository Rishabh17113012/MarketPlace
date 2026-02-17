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
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 glass border-b border-border/60"
      >
        <div className="container mx-auto flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-primary-foreground text-xs font-bold">M</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Marketplace</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              Products
            </Link>

            {user ? (
              <>
                <Link
                  to="/favorites"
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                    isActive("/favorites")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Heart className="h-3.5 w-3.5" />
                  Favorites
                </Link>
                <div className="mx-2 h-5 w-px bg-border" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <div className="mx-2 h-5 w-px bg-border" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="rounded-full text-muted-foreground"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/auth?tab=register")}
                  className="rounded-full"
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-muted transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-14 z-40 glass border-b border-border/60 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
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
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2",
                      isActive("/favorites") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Link>
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-left hover:bg-muted flex items-center gap-2 text-muted-foreground"
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
                    className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?tab=register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium bg-primary text-primary-foreground text-center"
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
