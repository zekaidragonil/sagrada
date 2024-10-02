"use client";
import React, { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout"
import Button from '@/components/ui/Button';
import { useTranslation } from 'next-i18next'
import { CURRENCY, ENVIRONMENT, PUBLIC_ASSETS, STRIPE_PUBLISHABLE_KEY } from '@/config/common.config';
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Stack from "@/components/layout/Stack";
import Image from 'next/image';
import { sendGTMEvent } from '@next/third-parties/google'

const PAYMENT_STATUS = {
  SUCCESS: "succeeded",
  DENIED: "requires_payment_method",
  FAILED: "failed",
  PROCESSING: "processing"
}

export default function Payout() {
  const { t, i18n } = useTranslation('translation');
  const [redsysID, setRedsysID] = useState(""); 
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.PROCESSING);
  const userLanguage = i18n.language;
   const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, { locale: userLanguage as "auto" | "es" | "en" | "fr" | "de" | "it" });
  const [loading, setLoading] = useState(false);
  const [Total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const oid = new URLSearchParams(window.location.search).get("oid");
    setRedsysID(oid ?? "");

    setLoading(true);
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkStatus = async () => {
    try {
      const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
      if (!clientSecret) {
        setPaymentStatus(PAYMENT_STATUS.FAILED);
        setLoading(false);
        return;
      }
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Error al cargar Stripe.");
      }


      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
       if(paymentIntent){
        setTotal(paymentIntent.amount / 100)
       }
      if (!paymentIntent) {
        throw new Error("No se pudo recuperar el Payment Intent.");
      }
      if (Object.values(PAYMENT_STATUS).includes(paymentIntent.status)) {
        setPaymentStatus(paymentIntent.status);
      } else {
        setPaymentStatus(PAYMENT_STATUS.FAILED);
      }
      setLoading(false);
    } catch {
      setPaymentStatus(PAYMENT_STATUS.FAILED);
      setLoading(false);
    }
  }

  const goToHome = () => {
    router.push('/');
  }

  const goToPurchase = () => {
    router.push('/purchase');
  }

  useEffect(() => {
    if (ENVIRONMENT === true) {
      sendGTMEvent({
        event: 'purchase',
        ecommerce: {
          transaction_id: redsysID,
          value: Total,
          currency: CURRENCY,
        },
      });
    }
  }, [redsysID, Total]);

  return (
    <Layout >
      <div className="container text-center">
      <div className="my-4 mx-auto">
        {
          (loading || paymentStatus === PAYMENT_STATUS.PROCESSING) &&
          <Stack
            alignItems="center"
            justifyContent="center"
            style={{
              padding: 20,
            }}
          >
            <div className="spinner-grow spinner-grow-sm" >
              <span className="visually-hidden">Loading...</span>
            </div>
          </Stack>
        }
   

        {paymentStatus === PAYMENT_STATUS.SUCCESS &&
          <div className="container-ok" >
            <div className='d-flex justify-content-center'>
            <Image src={PUBLIC_ASSETS.payoutOk} alt="ok" className="result-icon"
              width={120} height={120}
            />
            </div>
            <h4 className='checkout-title'>{t("checkout.ok1")}</h4>
            <br/>
            <h4 className="text-center">{t("checkout.mail_notice")}</h4>
            <br/>

            <p className='checkout-ok3'><b>{t("checkout.ok3", { redsysID })}</b></p>
            <br/>
            <p>{t("checkout.ok4")}</p>

            <div className='d-flex justify-content-center mt-3 '>
              <Button
                banner
                active
                className="thm_btn btn-primary px-4 mt-2 text-uppercase"
                text={t("checkout.btn_continue")}
                onClick={goToHome}
              />
            </div>
          </div>
        }
        {paymentStatus === PAYMENT_STATUS.DENIED &&
          <div className="container-ok" >
             <div className='d-flex justify-content-center'>
             <Image src={PUBLIC_ASSETS.payoutDenied} alt="denied" className="result-icon"
              width={120} height={120}
            />
            </div>
            
            <h4>{t("checkout.denied1")}</h4>
            <br/>
            <p>{t("checkout.denied2")}</p>
            <p>{t("checkout.denied3")}</p>
            
            <div className='d-flex flex-column flex-md-row mt-2 justify-content-center gap-2'>       
            <div className='mr-2 d-flex justify-content-center  '>
              <Button
                banner
                active
                className="thm_btn btn-primary px-4 mt-2 text-uppercase"
                text={t("checkout.btn_retry")}
                onClick={goToPurchase}
              />
            </div>
            <div className=''>

              <Button
                banner
                active
                className="thm_btn btn-chat btn-primary px-4 mt-2 text-uppercase"
                text={t("checkout.btn_chat")}
                onClick={goToHome}
              />
            </div>
            </div>
          </div>
        }
        {paymentStatus === PAYMENT_STATUS.FAILED &&
          <div className="container-fail" >
               <div className='d-flex justify-content-center'>
            <Image src={PUBLIC_ASSETS.payoutFailed} alt="error" className="result-icon"
              width={120} height={120}
            />
            </div>
            <h4>{t('checkout.failed1')}</h4>
             <br />
            <p>{t('checkout.failed2')}</p>
            <p>{t('checkout.failed3')}</p>
            <div className='d-flex flex-column flex-md-row mt-2 justify-content-center gap-2'> 
            <div className='mr-2 d-flex justify-content-center '>
              <Button
                banner
                active
                className="thm_btn btn-primary px-4 mt-2 text-uppercase"
                text={t('checkout.btn_retry')}
                onClick={goToPurchase}
              />
            </div>
            <div className=''>
              <Button
                banner
                active
                className="thm_btn btn-primary px-4 mt-2 text-uppercase"
                text={t('checkout.btn_chat')}
                onClick={goToHome}
              />
            </div>
            </div>
          </div>
        }
        </div>
      </div>
    </Layout>
  )
}

