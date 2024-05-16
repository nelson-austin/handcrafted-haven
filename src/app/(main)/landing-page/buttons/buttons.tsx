import SellerLoginButton from "./seller-login-button";
import BuyerLoginButton from "./buyer-login-button";

export default function Buttons() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center md:flex-row">
      <SellerLoginButton />
      <BuyerLoginButton />
    </div>
  );
}
