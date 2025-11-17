import { useEffect, useState, useMemo } from "react";
import {
  ShoppingCart,
  Loader2,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import { ShowError } from "../shared/ShowError";
import { Loader } from "../shared/Loader";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useCartStore";

const Products = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const { cart, addToCart, removeFromCart } = useCartStore();

  const [addingId, setAddingId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCartAction = (product) => {
    setAddingId(product._id);
    const inCart = cart.some((item) => item._id === product._id);
    inCart ? removeFromCart(product._id) : addToCart(product);
    setTimeout(() => setAddingId(null), 500);
  };

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter((p) => (p.category || "Uncategorized") === category);
    }

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-600 flex items-center justify-center gap-3">
            <ShoppingCart className="w-12 h-12 text-blue-600" />
            Discover Products
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore curated items with smart filters and instant cart actions.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-12">
          <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl shadow-lg p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>

              {/* Category Select */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Select */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  <option value="none">Sort by Price</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && <Loader name="products" />}
        {error && <ShowError error={error} />}

        {/* Empty State */}
        {!isLoading && !error && filtered.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-16 text-center shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Filter className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              No Products Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const inCart = cart.some((item) => item._id === product._id);

              return (
                <div
                  key={product._id}
                  className="group relative bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-extrabold text-blue-600">
                      ${product.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleCartAction(product)}
                    disabled={addingId === product._id}
                    className={`w-full font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-95
                      ${
                        inCart
                          ? "bg-linear-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-red-500/25"
                          : "bg-blue-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25"
                      }
                      disabled:opacity-70 disabled:cursor-not-allowed
                    `}
                  >
                    {addingId === product._id ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Updating...
                      </>
                    ) : inCart ? (
                      <>
                        <ShoppingCart size={18} />
                        Remove
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
