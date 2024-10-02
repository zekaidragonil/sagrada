"use client";
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useTranslation } from 'next-i18next'
import { APP_NAME, ATTRACTION_ID, PUBLIC_ASSETS, STRIPE_API, STRIPE_NAME, STRIPE_PUBLISHABLE_KEY, STRIPE_SUCCESS_URL } from '@/config/common.config';
import { loadStripe, StripeElements } from '@stripe/stripe-js';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Modal } from 'react-bootstrap';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);


interface Person {
  firstname?: string;
  lastname?: string;
  email?: string;
  emailCheck?: string;
  checked?: boolean;
}
interface FormValues {
  fecha?: string;
  hora?: string;
  total?: number;
}
interface FormField {
  value: string;
}

interface RequestBody {
  rtime: string;
  rdate: string;
  qty_form: string;
  qty_a: string;
  qty_b: string;
  qty_c: string;
  total: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  redirect: string;
  description: string;
  aid: string | number;
  lang: string;
  currency: string;
}

export default function Purchase() {
  const { i18n, t } = useTranslation();
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [checked, setChecked] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [errors, setErrors] = useState<Person>({});
  const [loading, setLoading] = useState(false);
  const [paymentElement, setPaymentElement] = useState<StripeElements | null>(null);
  const [paymentIdentifier, setPaymentIdentifier] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const text_badge = t("form.text_1");
  const text_badge2 = t("form.text_2");
  const form_text3 = t("form.text_3");
  const form_text4 = t("form.text_4");
  const form_text7 = t("form.text_7");
  const form_total = t("form.total");
  const purchase_tax_notice = t("purchase.tax_notice");
  const purchase_form_text_1 = t("purchase.form.text_1");
  const purchase_form_text_2 = t("purchase.form.text_2");
  const purchase_form_text_3 = t("purchase.form.text_3");
  const purchase_form_text_4 = t("purchase.form.text_4");
  const purchase_form_text_5 = t("purchase.form.text_5")
  const purchase_form_text_6 = t("purchase.form.text_6");
  const purchase_form_text_7 = t("purchase.form.text_7");
  const footer_legal_1 = t("footer.legal_1");
  const purchase_form_button_1 = t("purchase.form.button_1");
  const error_first_name_required = t("error.first_name_required");
  const error_last_name_required = t("error.last_name_required");
  const error_email_required = t("error.email_required");
  const error_email_invalid = t("error.email_invalid");

  const onChangeChecked = () => {
    let newErrors: { [key: string]: string } = {};

    if (firstname.trim() === '') {
      newErrors = { ...newErrors, firstname: error_first_name_required };
    }

    if (lastname.trim() === '') {
      newErrors = { ...newErrors, lastname: error_last_name_required };
    }

    if (email.trim() === '') {
      newErrors = { ...newErrors, email: error_email_required };
    }

    if (email !== emailCheck) {
      newErrors = { ...newErrors, emailCheck: error_email_invalid };
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);

    }
    setErrors({});
    setChecked(!checked);


  }

  useEffect(() => {
    // Obtener los parámetros de la URL
    const localData = localStorage.getItem(`${APP_NAME.replace(/ /g, '_')}_formValues`);
    if (!localData || localData === null || localData === "") {
      return;
    }
    const formValues = JSON.parse(localData);
    setFormValues(formValues);
    console.log("🚀 ~ useEffect ~ formValues:", formValues)
    setFormFields(formValues?.formFields || []);
  }, []);

  const validateRequestBody = (requestBody: RequestBody) => {

    if (!requestBody.rtime || requestBody.rtime === "00:00") {
      throw new Error(t("error.purchase_rtime"));
    }
    const currentDate = new Date();
    const requestDate = new Date(requestBody.rdate + requestBody.rtime);

    if (!requestBody.rdate || requestDate < currentDate) {
      throw new Error(t("error.purchase_rdate"));
    }
    const qty_a = parseInt(requestBody.qty_a, 10);
    const qty_b = parseInt(requestBody.qty_b, 10);
    const total = parseFloat(requestBody.total);
    if (isNaN(qty_a) || isNaN(qty_b) || isNaN(total) || qty_a === 0 || total === 0) {
      throw new Error(t("error.purchase_qty"));
    }

    if (!requestBody.currency) {
      throw new Error(t("error.purchase_currency"));
    }
  }


  const prepareCheckout = async () => {
    try {
      setLoading(true);
      setShowModal(true)
      const currentLocale = i18n.language;
      const localData = localStorage.getItem(`${APP_NAME.replace(/ /g, '_')}_formValues`);

      if (!localData || localData === null || localData === "") {
        return;
      }
      const formValues = JSON.parse(localData);

      const requestBody = {
        rtime: formValues.hora,
        rdate: formValues.fecha.split('/').reverse().join('-'),
        qty_form: formValues.qty_form,
        qty_a: formValues.qty_a,
        qty_b: formValues.qty_b,
        qty_c: formValues.qty_c,
        total: formValues.total.replace(/\D/g, ''),
        firstname,
        lastname,
        email,
        phone: "123456789",
        redirect: STRIPE_SUCCESS_URL,
        description: APP_NAME,
        aid: ATTRACTION_ID,
        lang: currentLocale,
        currency: "EUR"
      };

      validateRequestBody(requestBody);

      const response = await fetch(`${STRIPE_API}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error en la compra");
      }

      const { clientSecret, orderId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js has not been loaded correctly.");
      }

      const elements = stripe.elements({ clientSecret });
      const paymentElementInstance = elements.create('payment', {
        layout: {
          type: 'accordion',
          defaultCollapsed: false,
          radios: false,
          spacedAccordionItems: true
        },
        fields: {
          billingDetails: {
            name: 'never',
            email: 'never',
          }
        }
      });
      paymentElementInstance.mount("#payment-element");

      setPaymentElement(elements);
      setPaymentIdentifier(orderId);

      setLoading(false);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("🚀 ~ prepareCheckout ~ error:", error.message)
        setPaymentMessage(error.message);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    const localData = localStorage.getItem(`${APP_NAME.replace(/ /g, '_')}_formValues`);
    if (!localData || localData === null || localData === "") {
      return;
    }
    const formValues = JSON.parse(localData);
    const stripe = await stripePromise;
    if (stripe) {
      if (paymentElement) {
        const { error } = await stripe.confirmPayment({
          elements: paymentElement,
          confirmParams: {
            return_url: `${STRIPE_SUCCESS_URL}?oid=${paymentIdentifier}&total=${formValues.total}&currency=EUR`,
            payment_method_data: {
              billing_details: {
                name: `${STRIPE_NAME}: ${firstname} | ${lastname}`,
                email,
              },
            },
          },
        });

        if (error) {
          if (error.type === "card_error" || error.type === "validation_error") {
            setPaymentMessage(error.message || null)
          } else {
            setPaymentMessage("Error en el proceso de pago");
          }
        }
      }
    }

    setLoading(false);
  };



  return (
    <Layout>
      <section className="purse-area  overflow-hidden" id="ticket">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero__title " data-aos="fade-right" >
                <h3 className='form_title_1' dangerouslySetInnerHTML={{ __html: t("form.title_1") }} />
                <h1 >
                  <span dangerouslySetInnerHTML={{ __html: t("form.title_2") }} className='form_title_2' />{" "}
                  <span dangerouslySetInnerHTML={{ __html: t("form.title_3") }} className='form_title_3' />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='purchase' className='row d-flex justify-content-center py-5'>
        <div className="col-lg-5 col-12 mt-3 ps-lg-5 ps-4">
          <div className="card shadow my-5 bg-transparent rounded-4 p-4 contact__content" >
            <div className='text-center'>
              {text_badge2 !== "" && <p className="badge-info form.text_2 d-inline-flex jsutify-item-center px-3" >
                <Image src={PUBLIC_ASSETS?.infoIcon} alt="icon"
                  width={19} height={19}
                />
                {text_badge}
              </p>
              }
            </div>
            <div className="date__icon mt-4 pb-5" >
              <span className="mt-1"><Image src={PUBLIC_ASSETS.purchaseIconCalendar} alt=""
                width={40} height={40}
              /> <span id="Ticket__schedule">{formValues?.fecha}</span></span>
              <span className="mt-1"><Image src={PUBLIC_ASSETS.purchaseIconClock} alt=""
                width={40} height={40}
              /> <span id="Ticket__datetime">{formValues?.hora}</span></span>
            </div>
            <ul>
              <li className="mt-1"><Image src={PUBLIC_ASSETS.purchaseIconAudio} alt=""
                width={24} height={24}
              />
                <span id="Ticket__qty_a">{formFields[0]?.value}</span> {form_text3 !== "fomr.text_3" && <span>{form_text3}</span>}</li>
              <li className="mt-1"><Image src={PUBLIC_ASSETS.purchaseIconCalco} alt=""
                width={24} height={24}
              />
                <span id="Ticket__qty_b">{formFields[1]?.value}</span> {form_text4 !== "fomr.text_4" && <span>{form_text4}</span>}</li>
              {formFields[2]?.value !== undefined &&
                <li className="mt_10"><Image src={PUBLIC_ASSETS.purchaseIconCredit} alt=""
                  width={24} height={24}
                />
                  <span id="Ticket__qty_c">{formFields[2]?.value}</span> {form_text7 !== "fomr.text_5" && <span>{form_text7}</span>}
                </li>}
            </ul>
            <div className="text-end mx-4" >
              <h1 className="mb-0">{`${form_total !== "form.total" && form_total}:`} <span id="Ticket__total">{formValues?.total}€</span></h1>
              <small className="tax-notice">{`${purchase_tax_notice !== "purchase.tax_notice" && purchase_tax_notice}`}</small>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-12 mt-3 ps-lg-5 ps-4">
          <div className="contact__form" >
            <h3>
              <span>{`${purchase_form_text_1 !== "purchase.form.text_1" && purchase_form_text_1}`}</span>
              {`${purchase_form_text_2 !== "purchase.form.text_2" && purchase_form_text_2}`}
            </h3>
            <form
              name='form'
            >
              <div className="input__blk" >
                <label htmlFor="contact_firstname">{`${purchase_form_text_3 !== "purchase.form.text_3" && purchase_form_text_3}`} <span className="text-danger">*</span></label>
                <input id="contact_firstname" type="text" placeholder="" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                {errors.firstname && <p className="text-danger" id="contact_firstname_error">{errors.firstname}</p>}
              </div>
              <div className="input__blk" >
                <label htmlFor="contact_lastname">{`${purchase_form_text_4 !== "purchase.form.text_4" && purchase_form_text_4}`} <span className="text-danger">*</span></label>
                <input id="contact_lastname" type="text" placeholder="" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                {errors.lastname && <p className="text-danger" id="contact_lastname_error">{errors.lastname}</p>}
              </div>
              <div className="input__blk" >
                <label htmlFor="contact_email">{`${purchase_form_text_5 !== "purchase.form.text_5" && purchase_form_text_5}`} <span className="text-danger">*</span></label>
                <input id="contact_email" type="text" placeholder="" list="email_options_contact_email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <datalist id="email_options_contact_email"></datalist>
                {errors.email && <p className="text-danger" id="contact_email_error">{errors.email}</p>}
              </div>
              <div className="input__blk" >
                <label htmlFor="contact_email_check">{`${purchase_form_text_6 !== "purchase.form.text_6" && purchase_form_text_6}`} <span className="text-danger">*</span></label>
                <input id="contact_email_check" type="email" placeholder="" onPaste={(e) => e.preventDefault()} value={emailCheck} onChange={(e) => setEmailCheck(e.target.value)} />
                {errors.emailCheck && <p className="text-danger" id="contact_email_check_error">{errors.emailCheck}</p>}
              </div>
              <div className={!checked ? "check__blk" : "check__blk active"} >
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checked} 
                  onChange={onChangeChecked}
                />
                <div className="d-block">
                  <label htmlFor="checkbox" dangerouslySetInnerHTML={{ __html: purchase_form_text_7 !== "purchase.form.text_7" && purchase_form_text_7 }} />
                  <br />
                  <a className="check__blk_a d-inline" href="https://ticket-sagradafamilia.com/conditions.php" target="_blank">
                    {`${footer_legal_1 !== "footer.legal_1" && footer_legal_1}`}
                  </a>
                </div>
                {errors.checked && <p className="text-danger small" id="checkbox_error">{errors.checked}</p>}
                <p className="text-danger small" id="checkbox_error"></p>
              </div>
            </form>
          </div>
          <Button
            banner
            className="thm_btn Ticket_purchase hero__form__blkButton"
            onClick={() => prepareCheckout()}
            text={
              purchase_form_button_1 !== "purchase.form.button_1" && purchase_form_button_1
                ? purchase_form_button_1
                : undefined
            }
            disabled={!checked}
          />
        </div>
      </section>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>

          {
            loading && <div className="spinner-grow spinner-grow-sm" id="payment-method-loader">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
          <div id="payment-element" className="w-100"></div>

        </Modal.Header>
        <Modal.Body>
          <footer className='flex flex-column gap-2 px-6 py-4 justify-end'>
            {typeof paymentMessage === 'string' && paymentMessage.length > 0 && <h6 className='text-danger mx-auto'>{paymentMessage}</h6>}
            <Button
              type='submit'
              text={t("purchase.form.button_1")}
              banner={true}
              active
              onClick={handleSubmit}
              style={{
                width: "50%",
                alignSelf: "flex-end",
                padding: ".375rem .75rem"
              }}
            />
          </footer>
        </Modal.Body>
      </Modal>
    </Layout>

  )
}

