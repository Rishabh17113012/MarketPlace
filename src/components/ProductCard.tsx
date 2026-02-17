import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product } from "@/hooks/useMarketplace";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites, useToggleFavorite } from "@/hooks/useMarketplace";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { user } = useAuth();
  const { data: favorites } = useFavorites(user?.id);
  const toggleFavorite = useToggleFavorite();

  const isFavorited = favorites?.some((f) => f.product_id === product.id) ?? false;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleFavorite.mutate({ userId: user.id, productId: product.id, isFavorited });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-card transition-all duration-500 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              loading="lazy"
            />
          </div>

          {user && (
            <motion.button
              onClick={handleFavorite}
              whileTap={{ scale: 0.85 }}
              className="absolute right-3 top-3 rounded-full bg-background/70 backdrop-blur-md p-2 transition-all duration-200 hover:bg-background shadow-sm"
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isFavorited
                    ? "fill-accent text-accent animate-heart-pop"
                    : "text-muted-foreground"
                )}
              />
            </motion.button>
          )}

          <div className="p-4">
            {product.category && (
              <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>
            )}
            <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-tight">
              {product.title}
            </h3>
            <p className="mt-1.5 text-base font-semibold text-foreground">
              ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
