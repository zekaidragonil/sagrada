'use client'
import { PUBLIC_ASSETS } from "@/config/common.config";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Normativas() {
    const { t } = useTranslation('translation');
    const title = t("rules.title_1");
    const title2 = t("rules.title_2");
    const text = t("rules.text_1");
    const text2 = t("rules.text_2");
    const text3 = t("rules.text_3");
    const text4 = t("rules.text_4");
    const text5 = t("rules.text_5");
    const text6 = t("rules.text_6");
    const text7 = t("rules.text_7");
    const text8 = t("rules.text_8");
    const text9 = t("rules.text_9");
    const text10 = t("rules.text_10");
    const text11 = t("rules.text_11");
    const text12 = t("rules.text_12");
    const note = t("rules.note_1");

    return(
        <section className="nuestro-area section-content overflow-hidden" id='rules'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6" data-aos="fade-right" >
                    <div className="nuestro__content">
                        {title !== "rules.title_1" && <h3 className="" dangerouslySetInnerHTML={{ __html: title }} />}
                        {title2 !== "rules.title_2" && <span className="content_main_title_2" dangerouslySetInnerHTML={{ __html: title2 }} />}
                        <ul className="mt-3">
                            {text !== "rules.text_1" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text }} />
                            </li>}
                            {text2 !== "rules.text_2" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text2 }} />
                            </li>}
                            {text3 !== " rules.text_3" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text3 }} />
                            </li>}
                            {text4 !== "rules.text_4" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text4 }} />
                            </li>}
                            {text5 !== "rules.text_5" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text5 }} />
                            </li>}
                            {text6 !== "rules.text_6" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text6 }} />
                            </li>}
                            {text7 !== "rules.text_7" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text7 }} />
                            </li>}
                            {text8 !== "rules.text_8" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text8 }} />
                            </li>}
                            {text9 !== "rules.text_9" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text9 }} />
                            </li>}
                            {text10 !== "rules.text_10" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text10 }} />
                            </li>}
                            {text11 !== "rules.text_11" && <li>
                                <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text11 }} />
                            </li>}
                            {
                                text12 !== "rules.text_12" && <li>
                                    <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text12 }} />
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                <LazyLoadImage 
                        className="lazy about_img" src={PUBLIC_ASSETS.normativa} alt="" />
                    <div className="nuestro__img" data-aos="fade-up" >
                       
                        {note !== "rules.note_1" && <span className="" dangerouslySetInnerHTML={{ __html: note }} />}
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}