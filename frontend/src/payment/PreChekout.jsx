import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { decodeToken } from 'react-jwt';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

// Load Stripe once
const stripePromise = loadStripe('pk_test_51NSxugSCZn81mFB2wStinhtyHRJ8B8Vi20Nd8OepJisXhwSsFaX9J3s9VeDlyYGH6d3MIUhwBnGe5uZYCYyXbSuE0072fSRdEH');

export default function PreCheckout() {
  const location = useLocation();
  const [options, setOption] = useState({
    clientSecret: null,
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = sessionStorage.getItem('access-token');
        const decoded = decodeToken(token);
        if (!decoded?.email || !decoded?.name) return;

        const customer = await api.post('/api/payment/create-customer', {
          email: decoded.email,
          name: decoded.name,
        });

        if (!customer?.data?.customerId) return;

        const res = await api.post('/api/payment/create-subscriptions', {
          customerId: customer.data.customerId,
          priceId: location.state,
        });

        if (!res?.data?.clientSecret) return;

        setOption({ clientSecret: res.data.clientSecret });
      } catch (err) {
        console.error("Stripe setup error:", err);
      }
    };

    if (location.state) {
      fetchClient();
    }
  }, [location.state]); // ✅ Include location.state

  return (
    <>
      {options.clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </>
  );
}
