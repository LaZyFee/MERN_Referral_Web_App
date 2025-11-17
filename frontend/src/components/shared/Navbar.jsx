import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import showToast from "../../utils/ShowToast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const cartModalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        cartModalRef.current &&
        !cartModalRef.current.contains(event.target)
      ) {
        setCartModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/");
    showToast({
      title: "Success",
      text: "Logged out successfully",
      icon: "success",
    });
    clearCart();
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setCartModalOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <nav className="fixed z-50 w-full bg-white shadow font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-lg">
                  RSW
                </span>
              </div>
              <span className="text-base sm:text-xl lg:text-2xl font-bold whitespace-nowrap">
                Referral System Web
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `pb-1 transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Cart Icon */}
            <button
              onClick={() => setCartModalOpen(!cartModalOpen)}
              className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Desktop User Menu / Auth Buttons */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FaUserCircle size={28} />
                    <span className="max-w-[120px] xl:max-w-[150px] truncate">
                      {user?.username}
                    </span>
                    <svg
                      className={`h-4 w-4 transform transition-transform ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-60 border border-gray-100">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {user?.username}
                      </p>

                      <Link to="/profile" className="block mb-2">
                        <button className="w-full text-left text-sm font-medium text-gray-700 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md transition-colors bg-blue-500">
                          Profile
                        </button>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full text-left text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors bg-red-300"
                      >
                        <RiLogoutCircleRLine size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="border rounded-full px-6 py-2 text-sm text-white bg-blue-600 hover:bg-white hover:text-blue-900 border-blue-600 tracking-wider transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium py-3 px-4 rounded-md transition-colors ${
                      isActive
                        ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-800 border-l-4 border-blue-800"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* User Section */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {user?.username}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      <button className="w-full text-left text-sm font-medium text-gray-700 hover:bg-blue-50 px-4 py-3 rounded-md transition-colors">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full text-left text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white px-4 py-3 rounded-md transition-colors"
                    >
                      <RiLogoutCircleRLine size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    <button className="w-full border rounded-full px-6 py-3 text-sm bg-blue-600 hover:bg-blue-900 text-white tracking-wider transition-colors">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div
            ref={cartModalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 sm:my-0 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Shopping Cart ({cartItemsCount}{" "}
                {cartItemsCount === 1 ? "item" : "items"})
              </h2>
              <button
                onClick={() => setCartModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setCartModalOpen(false);
                      navigate("/products");
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-900 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Details */}
                      <div className="flex-1 w-full">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          ${item.price} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                          >
                            -
                          </button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex sm:flex-col items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
                        <p className="font-bold text-lg text-gray-800">
                          ${item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-lg sm:text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                  {/* Clear Cart Button */}
                  <button
                    onClick={() => {
                      clearCart();
                      setCartModalOpen(false);
                    }}
                    className="w-full sm:w-1/2 bg-red-500 text-white py-3 rounded-full 
               hover:bg-red-600 transition-colors font-semibold text-base"
                  >
                    Clear Cart
                  </button>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full sm:w-1/2 bg-blue-600 text-white py-3 rounded-full 
               hover:bg-blue-900 transition-colors font-semibold text-base"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
