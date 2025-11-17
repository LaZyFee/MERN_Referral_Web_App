import { useEffect, useState } from "react";
import { User, Copy, Check, Wallet, Users, ShoppingBag } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { formatDate } from "../../utils/ForamteDate";
import { Loader } from "../shared/Loader";

export const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await axiosInstance("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setError("");
      } catch (err) {
        setError("Error fetching profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const copyReferralCode = () => {
    if (data?.user?.referralCode) {
      navigator.clipboard.writeText(data.user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <Loader name="profile" />;
  }

  if (error) {
    return <ShowError error={error} />;
  }

  if (!data?.user) return null;

  const { user, referrals = [] } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.username}
              </h1>
              <p className="text-gray-600">Member Profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet Balance */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600 font-medium">
                  Wallet Balance
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                ${user.walletBalance.toFixed(2)}
              </p>
            </div>

            {/* Referral Code */}
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Your Referral Code
              </p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  {user.referralCode}
                </p>
                <button
                  onClick={copyReferralCode}
                  className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Referred By */}
          {user.referredBy && (
            <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 font-medium mb-2">
                You were referred by
              </p>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">
                  {user.referredBy.username}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 font-mono text-sm">
                  {user.referredBy.referralCode}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Referrals Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Your Referrals ({referrals.length})
              </h2>
            </div>
          </div>

          <div className="p-6">
            {referrals.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No referrals yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Share your referral code to start earning bonuses
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {referrals.map((referral, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Referral Info */}
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {referral.username}
                          </p>
                          <p className="text-sm text-gray-600 font-mono">
                            {referral.referralCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Their Balance</p>
                        <p className="font-bold text-gray-900">
                          ${referral.walletBalance.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Purchases */}
                    {referral.purchases && referral.purchases.length > 0 ? (
                      <div className="p-4 bg-white">
                        <div className="flex items-center space-x-2 mb-3">
                          <ShoppingBag className="w-4 h-4 text-gray-600" />
                          <p className="font-semibold text-gray-700 text-sm">
                            Purchases ({referral.purchases.length})
                          </p>
                        </div>
                        <div className="space-y-2">
                          {referral.purchases.map((purchase) => (
                            <div
                              key={purchase._id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                            >
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {purchase.product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(purchase.date)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">
                                  ${purchase.amount.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center bg-white">
                        <p className="text-gray-500 text-sm">
                          No purchases yet
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
