'use client'
import { useTranslation } from 'next-i18next'
import Button from "@/components/ui/Button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PUBLIC_ASSETS } from '@/config/common.config';

export default function About() {
    const { t } = useTranslation('translation');

    const title1 = t("content.main.title_1");
    const title2 = t("content.main.title_2");
    const title3 = t("content.main.title_3");
    const text1 = t("content.main.text_1");
    const text2 = t("content.main.text_2");
    const text3 = t("content.main.text_3");
    const button1 = t("content.main.button_1");

    return (
        <section className="future-area overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center order-first">
                        <div className="sec__title" data-aos="fade-down" >
                            <h1>{title1}</h1>
                            <p>{title2}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 order-last order-lg-0">
                        <div className="future__text" data-aos="fade-up" >
                            {title3 !== "content.main.title_3" && <h1 className="" dangerouslySetInnerHTML={{ __html: title3 }} />}
                            {text1 !== "content.main.text_1" && <p className="content_main_text_1" dangerouslySetInnerHTML={{ __html: text1 }} />}
                            {text2 !== "content.main.text_2" && <p className="content_main_text_2" dangerouslySetInnerHTML={{ __html: text2 }} />}
                            {text3 !== "content.main.text_3" && <p className="content_main_text_3" dangerouslySetInnerHTML={{ __html: text3 }} />}
                            <div className='margintop'>
                            <Button
                                 link={true}
                                className='thm_btn '
                                text={button1}
                            />

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-md-0">
                        <div className="" data-parallax='{"y": -50}'></div>
                    
                            <LazyLoadImage
                                src={PUBLIC_ASSETS.aboutBanner}
                                alt="about-banner"
                                className='responsive-img'
                            />
                         
                    </div>
                </div>
            </div>
        </section>

    )
}