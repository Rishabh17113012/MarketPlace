import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useFavorites, useToggleFavorite } from "@/hooks/useMarketplace";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: product, isLoading } = useProduct(id!);
  const { data: favorites } = useFavorites(user?.id);
  const toggleFavorite = useToggleFavorite();

  const isFavorited = favorites?.some((f) => f.product_id === id) ?? false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="aspect-[16/10] rounded-2xl bg-muted" />
          <div className="mt-6 h-8 w-1/2 rounded-full bg-muted" />
          <div className="mt-4 h-4 w-full rounded-full bg-muted" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Product not found.</p>
          <Button variant="ghost" onClick={() => navigate("/")} className="mt-4 rounded-full">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12"
      >
        <div className="overflow-hidden rounded-2xl bg-muted">
          <motion.img
            layoutId={`product-image-${product.id}`}
            src={product.image_url || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center py-4">
          {product.category && (
            <span className="inline-block w-fit rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {product.category}
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-3xl font-semibold tracking-tight">
            ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                onClick={() =>
                  toggleFavorite.mutate({ userId: user.id, productId: product.id, isFavorited })
                }
                variant={isFavorited ? "default" : "outline"}
                className="rounded-full h-11 px-6"
              >
                <Heart
                  className={cn(
                    "mr-2 h-4 w-4 transition-all duration-300",
                    isFavorited && "fill-current animate-heart-pop"
                  )}
                />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
