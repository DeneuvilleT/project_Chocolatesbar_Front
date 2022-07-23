import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { notification, URL_LOCAL } from "../../utilities";
import { useState } from "react";

import styles from '../../components/CheckOut/checkout.module.css';

const Checkout = () => {

   const stripe   = useStripe();
   const elements = useElements();

   const [message,     setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);


   const handleSubmit = async (e) => {
      e.preventDefault();

      notification(setMessage, "Transaction encours ...")
      if (!stripe || !elements) { return };

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${URL_LOCAL}/cart`,
         }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
         setMessage(error.message);
      } else {
         setMessage("Un problême est survenu.");
      };
      setIsLoading(false);
   };


   return (
      <>
      <form className={styles.checkout} id="payment-form" onSubmit={(e) => handleSubmit(e)}>

         <PaymentElement id="payment-element" />

         <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
               {isLoading ? <div className="spinner" id="spinner"></div> : "Payer"}
            </span>
         </button>

         {message && <p id="payment-message">{message}</p>}
      </form>

      <aside>
         <p>Ne rentrez pas vos véritables coordonnées bancaires.</p>
         <p>Vous pouvez utiliser le numéro de carte suivant 4242 4242 4242 4242.</p>
         <p>En cliqaunt sur le bouton "Payer" vous allez effectuer une fausse transaction.</p>
         <p>Vous êtes libre de choisir la date d'expiration et le code de sécurité de la carte.</p>
         <p>Aucune de vos données bancaires ne seront enregistrées.</p>
         <p>Une trace de la transaction sera tout de même conservée.</p><br />
         <h2>Merci pour votre participation.</h2>
      </aside>
   </>
   );
};

export default Checkout;
