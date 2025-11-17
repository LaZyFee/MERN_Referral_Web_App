import Swal from "sweetalert2";

/**
 * Shows a toast notification using SweetAlert2
 *
 * @param {Object} options - Toast options
 * @param {string} options.title - Title text
 * @param {string} [options.text] - Optional subtitle text
 * @param {"success" | "error" | "warning" | "info" | "question"} options.icon - Icon type
 * @param {number} [options.timer=1500] - How long the toast shows
 */
const showToast = ({ title, text = "", icon, timer = 1500 }) => {
  Swal.fire({
    title,
    text,
    icon,
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
  });
};

export default showToast;
