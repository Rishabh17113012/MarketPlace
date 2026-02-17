import { useState } from "react";
import { useProducts } from "@/hooks/useMarketplace";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 6;

export default function Index() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProducts(search, page, PAGE_SIZE);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <main className="container mx-auto px-4 py-10 md:py-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Discover Amazing
          <br />
          <span className="text-accent">Products</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground leading-relaxed">
          Explore our curated collection of handpicked items, crafted with quality and care.
        </p>
      </motion.section>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-10 max-w-lg"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-12 rounded-2xl border-border/60 bg-muted/50 pl-11 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-accent/30 transition-all"
          />
        </div>
      </motion.div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-1/3 rounded-full bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : data?.products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-muted-foreground">No products found.</p>
          <p className="mt-1 text-sm text-muted-foreground/70">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data?.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full h-9 px-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Prev
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "h-9 w-9 rounded-full text-sm font-medium transition-all duration-200",
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full h-9 px-4"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </main>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
