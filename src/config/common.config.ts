export const APP_NAME = "React Template";
export const APP_ICON = "https://ticket-sagradafamilia.com/assets/img/Layer_1.svg";

export const ATTRACTION_ID = 2;
export const DAYS_PERIOD_DISABLED = 90;

export const API_URL = 'https://dev.ticketgotourism.com/api';

export const BOOKING_API = `${API_URL}/attraction/forms/list?attraction=${ATTRACTION_ID}`;
export const BOOKING_API_PRICES = `${API_URL}/attraction/prices?attraction=${ATTRACTION_ID}`;

export const STRIPE_API = `${API_URL}/stripe`;
export const STRIPE_SUCCESS_URL = "https://react.dev.ticketgotourism.com/payout";
export const STRIPE_NAME = "Sagrada Familia";

export const STRIPE_PUBLISHABLE_KEY = "pk_test_51OXScsAiwwsMv47vfECpGsIOylEEucheKtYkQfarI1CG3E3UDuvsclL3Ux7EuqgC2E9pQj4gOVDbKseIeLd0J2Yt00FER9XG3c"

export const THEME_CONFIG = {
    mainColor: "#FF7D34",
    headerColor: "#2e2d2d",
};

// image urls
export const PUBLIC_ASSETS = {
    logo: "/images/logo.svg",
    featureBanner: "/images/resource/banner-bg.webp",
    featureBannerLowRes: "/images/resource/banner-bg-low-res.webp",
    aboutBanner: "/images/resource/about-2.webp",
    bg_extra: "/images/bg_extra.png",
    explorerBanner: "/images/resource/about-3.webp",
    rulesBanner: "/images/resource/about-2.webp",
    normativa: "/images/11.webp",
    gallery: [
      "/images/gallery/gallery-1.webp",
      "/images/gallery/gallery-2.webp",
      "/images/gallery/gallery-3.webp",
      "/images/gallery/gallery-4.webp",
      "/images/gallery/gallery-5.webp",
      "/images/gallery/gallery-6.webp",
    ],
    transportIcons: [
      '/images/resource/map-img-1.svg',
      '/images/resource/map-img-2.svg',
      '/images/resource/map-img-3.svg',
      '/images/resource/map-img-4.svg',
      '/images/resource/map-img-5.svg',
      '/images/resource/map-img-5.svg',
    ],
    infoIcon: '/images/icons/info_icon.svg',
    schedulesBg: "/images/resource/schedules-bg.webp",
    scheduleIcon1: '/images/resource/schedules-icon-left.svg',
    scheduleIcon2: '/images/resource/schedules-icon-right.svg',
    purchaseIconCalendar: '/images/resource/purchase-icon-calendar.svg',
    purchaseIconClock: '/images/resource/purchase-icon-clock.svg',
    purchaseIconAudio: '/images/resource/purchase-icon-audio.svg',
    purchaseIconCalco: '/images/resource/purchase-icon-calco.svg',
    purchaseIconCredit: '/images/resource/purchase-icon-credit.svg',
    payoutOk: '/images/resource/ok.png',
    payoutDenied: '/images/resource/warning.png',
    payoutFailed: '/images/resource/ko.webp',
    payment: '/images/payment-methods.svg',
    ticket: '/images/ticket-go.webp'
  };
  
export const SEO_CONFIG = {
    title: "Sagrada Familia",
    description: "React Template Description",
    keywords: "Sagrada, Familia, Barcelona, Hotel, Ticket, Go",
    analytics: {
        google: "",
    },
    tagManager: "",
}

export const GOOGLE_MAP_EMBED = "pb=!1m18!1m12!1m3!1d2992.6397222438122!2d2.1743558!3d41.4036299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2dcd83dfb93%3A0x9bd8aac21bc3c950!2sBas%C3%ADlica%20de%20la%20Sagrada%20Fam%C3%ADlia!5e0!3m2!1ses!2sve!4v1708609288993!5m2!1ses!2sve"