import SettingServices from "@services/SettingServices";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = async () => {
  const storeSetting = await SettingServices.getStoreSetting();
  if (!stripePromise) {
    // stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}` || null);
    stripePromise = loadStripe(storeSetting?.stripe_key || null);
  }
  console.log("stripePromise", stripePromise);

  return stripePromise;
};

export default getStripe;
