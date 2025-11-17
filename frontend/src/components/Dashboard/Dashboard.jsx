import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Wallet,
  Package,
  Calendar,
} from "lucide-react";
import axiosInstance from "../../utils/axios";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
import { formatDate } from "../../utils/ForamteDate";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await axiosInstance("/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setError("");
      } catch (err) {
        setError("Error fetching dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader name="dashboard" />;
  }
  if (error) {
    return <ShowError error={error} />;
  }

  const totalSpent =
    data?.purchases?.reduce((sum, purchase) => sum + purchase.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-pink-50 py-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {data?.user?.username}!
              </p>
            </div>
            <Link
              to="/products"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet Balance Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Wallet Balance
                </p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  ${data?.user?.walletBalance}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Wallet className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Total Purchases Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Purchases
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {data?.purchases?.length || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Spent Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">
                  ${totalSpent}
                </p>
              </div>
              <div className="bg-pink-100 p-3 rounded-full">
                <ShoppingBag className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Purchases
            </h2>
            <p className="text-gray-600 mt-1">Your latest transactions</p>
          </div>

          {data?.purchases && data.purchases.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {data.purchases.map((purchase) => (
                <div
                  key={purchase._id}
                  className="p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-linear-to-br from-indigo-100 to-blue-100 p-3 rounded-lg">
                        <Package className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {purchase.product.name}{" "}
                          {purchase.quantity > 1 && `* ${purchase.quantity}`}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          {formatDate(purchase.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">
                        ${purchase.amount}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Unit Price: ${purchase.product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No purchases yet</p>
              <p className="text-gray-500 mt-2">
                Start shopping to see your purchase history here
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
