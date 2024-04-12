import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
      variation="primary"
      size="small"
    >
      {isCheckingOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;