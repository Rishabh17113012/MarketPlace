import { useAuth } from "@/contexts/AuthContext";
import { useFavorites, useProducts } from "@/hooks/useMarketplace";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Favorites() {
  const { user, loading } = useAuth();
  const { data: favorites } = useFavorites(user?.id);
  const { data: allProducts } = useProducts("", 1, 100);

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const favoriteProducts = allProducts?.products.filter((p) =>
    favorites?.some((f) => f.product_id === p.id)
  ) ?? [];

  return (
    <main className="container mx-auto px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
            <Heart className="h-5 w-5 text-accent" />
          </div>
          Your Favorites
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Products you've loved.</p>
      </motion.div>

      {favoriteProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-muted-foreground">No favorites yet.</p>
          <p className="mt-1 text-sm text-muted-foreground/70">Browse products and tap the heart to save them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
