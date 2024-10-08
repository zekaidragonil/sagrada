'use client'
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const Formulario = dynamic(() => import('../elements/Formulario'),{
    ssr: false
});

export default function Banner() {
    const { t } = useTranslation('translation');
    return (
        <section className="hero-area overflow-hidden" id="ticket">
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
                        <div className="form-placeholder">
                            <Formulario />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}