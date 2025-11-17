import {
  CheckCircle,
  Package,
  Calendar,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const SuccessPage = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const [orderNumber] = useState(
    () => "ORD-" + Math.floor(Math.random() * 1000000)
  );
  const [date] = useState(() => new Date().toLocaleDateString());

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <p className="text-slate-600">No order details found.</p>
      </div>
    );
  }

  const { items, total } = orderDetails;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 pt-24">
      <div className="max-w-3xl w-full">
        {/* Success Animation Container */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full mb-6 shadow-lg animate-bounce-once">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Order Confirmed!
          </h1>
          <p className="text-slate-600 text-lg">
            Your order is on its way. We've sent a confirmation to your email.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Order Summary Header */}
          <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6" />
                <span className="font-semibold text-lg">Order Summary</span>
              </div>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                    Order Number
                  </p>
                  <p className="text-slate-900 font-bold text-lg">
                    {orderNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                    Order Date
                  </p>
                  <p className="text-slate-900 font-bold text-lg">{date}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-8">
              <h3 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                Items Ordered
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-linear-to-r from-slate-50 to-transparent rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">
                          {item.quantity}x
                        </span>
                      </div>
                      <span className="text-slate-900 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="flex-1 group bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="flex-1 bg-white border-2 border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue Shopping
                <FaCartPlus className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          Questions about your order? Contact our support team anytime.
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
