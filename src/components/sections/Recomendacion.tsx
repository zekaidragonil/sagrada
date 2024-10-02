'use client'

import React from "react";
import { useTranslation } from "react-i18next";
import { PUBLIC_ASSETS } from "@/config/common.config";
import { LazyLoadImage } from "react-lazy-load-image-component"
export default function Recomendacion() {
    const { t } = useTranslation('translation');
    const title = t("explore.title_1");
    const title2 = t("explore.title_2");
    const text = t("explore.text_1");
    const text2 = t("explore.text_2");
    const text3 = t("explore.text_3");
    const text4 = t("explore.text_4");
    const text5 = t("explore.text_5");
    const text6 = t("explore.text_6");
    const text7 = t("explore.text_7");

    return (
        <>
          <section className="Explora-area overflow-hidden a">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                  <div className="Explora__img" data-aos="zoom-in" >
                    <LazyLoadImage src={PUBLIC_ASSETS.explorerBanner} className="about_img" alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-6" data-aos="fade-right" >
                  <div className="Explora__content">
                    {title !== "explore.title_1" && <h1 className=" content_main_title_1" dangerouslySetInnerHTML={{ __html: title }} />}
                    {title2 !== "explore.title_2" && <p className="content_main_title_2" dangerouslySetInnerHTML={{ __html: title2 }} />}
                    <ul>
                      <li>
                        {text !== "explore.text_1" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text }} />}
                      </li>
                      <li>
                        {text2 !== "explore.text_2" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text2 }} />}
                      </li>
                      <li>
                        {text3 !== "explore.text_3" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text3 }} />}
                      </li>
                      <li>
                        {text4 !== "explore.text_4" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text4 }} />}
                      </li>
                      <li>
                        {text5 !== "explore.text_5" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text5 }} />}
                      </li>
                      <li>
                        {text6 !== "explore.text_6" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text6 }} />}
                      </li>
                    </ul>
                    {text7 !== "explore.text_7" && <p className="content_main_text_7" dangerouslySetInnerHTML={{ __html: text7 }} />}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="Explora-area overflow-hidden b">
           <LazyLoadImage src={PUBLIC_ASSETS.imageRecomedacion} className="about_img" alt=""
                      width={616} height={419}
                    />
            <div className="container">
              <div className="row">
                <div className="col-lg-6"  >
                  <div className="Explora__content">
                  {title !== "explore.title_1" && <h1 className=" content_main_title_1" dangerouslySetInnerHTML={{ __html: title }} />}
                  <ul>
                      <li>
                        {text !== "explore.text_1" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text }} />}
                      </li>
                      <li>
                        {text2 !== "explore.text_2" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text2 }} />}
                      </li>
                      <li>
                        {text3 !== "explore.text_3" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text3 }} />}
                      </li>
                      <li>
                        {text4 !== "explore.text_4" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text4 }} />}
                      </li>
                      <li>
                        {text5 !== "explore.text_5" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text5 }} />}
                      </li>
                      <li>
                        {text6 !== "explore.text_6" && <p className="content_main_text_li" dangerouslySetInnerHTML={{ __html: text6 }} />}
                      </li>
                    </ul>
    
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )
}