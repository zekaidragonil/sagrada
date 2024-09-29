'use client'
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PUBLIC_ASSETS } from "@/config/common.config";
import dynamic from "next/dynamic";

const Galeria = dynamic(() => import('../elements/Galeria'));

export default function Horarios() {
    const { t } = useTranslation('translation');
    const title = t("schedule.title_1");
    const text = t("schedule.title_2");
    const text2 = t("schedule.title_3");
    const text3 = t("schedule.title_4");
    const text4 = t("schedule.title_5");
    const title2 = t("schedule.title_6");
    const text6 = t("schedule.title_7");
    const galery_title = t("gallery.title_1");
    const galery_title2 = t("gallery.title_2");
    const galery_text = t("gallery.text_1");
    const galery_text2 = t("gallery.text_2");
    const galery_text3 = t("gallery.text_3");
    const galery_text4 = t("gallery.text_4");
    const galery_button = t("gallery.button_1");

    return (
        <>
            <section>
                <div className="hoarios-area" id='schedules'>
                    <div className="container">
                        <div className="row">
                            <div className="future__blk__wrapper">
                                <div className="row mt_100">

                                    <div className="col-lg-6">
                                        <div className="future__blk" data-aos="zoom-in" >
                                            <h2><i><LazyLoadImage src={PUBLIC_ASSETS.scheduleIcon1} alt="acropolis_ais"
                                                width={40} height={40}
                                            /></i>
                                                {title && <span className='schedules_title_1' dangerouslySetInnerHTML={{ __html: title }} />}
                                            </h2>
                                            <hr />
                                            {text && <p className='schedules_title_2' dangerouslySetInnerHTML={{ __html: text }} />}
                                            {text2 && <p className='schedules_title_3' dangerouslySetInnerHTML={{ __html: text2 }} />}
                                            {text3 && <p className='schedules_title_4' dangerouslySetInnerHTML={{ __html: text3 }} />}
                                            {text4 && <p className='schedules_title_5' dangerouslySetInnerHTML={{ __html: text4 }} />}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 ">
                                        <div className="future__blk" data-aos="zoom-in" >
                                            <h2><i><LazyLoadImage src={PUBLIC_ASSETS.scheduleIcon2} alt="icon"
                                                width={40} height={40}
                                            /></i>
                                                {title2 && <span className="schedules_title_6" dangerouslySetInnerHTML={{ __html: title2 }} />}
                                            </h2>
                                            <hr />
                                            {text6 && (
                                                <p
                                                    className='schedules_title_7'
                                                    dangerouslySetInnerHTML={{ __html: text6 }}
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '23px',
                                                        fontWeight: 100,
                                                        marginTop: '4rem',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="asombro-area overflow-hidden a lazy-bg"   style={{ background: `url(${PUBLIC_ASSETS.bg_extra})` }}>
                <div className="opacity no-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div>
                                    {galery_title !== "schedule.title_1" && <h2 data-aos="fade-up" className=" gallery_title_1" dangerouslySetInnerHTML={{ __html: galery_title }} />}
                                    {galery_title2 !== "schedule.title_2" && <span data-aos="fade-up" className=" gallery_title_2" dangerouslySetInnerHTML={{ __html: galery_title2 }} />}
                                    {galery_text !== "schedule.title_3" && <p data-aos="fade-up" dangerouslySetInnerHTML={{ __html: galery_text }} className="gallery_text" />}
                                    {galery_text2 !== "schedule.title_4" && <p data-aos="fade-up" dangerouslySetInnerHTML={{ __html: galery_text2 }} className="gallery_text" />}
                                    {galery_text3 !== "schedule.title_5" && <p data-aos="fade-up" dangerouslySetInnerHTML={{ __html: galery_text3 }} className="gallery_text" />}
                                    {galery_text4 !== "schedule.title_6" && <p data-aos="fade-up" dangerouslySetInnerHTML={{ __html: galery_text4 }} className="gallery_text" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallery-area overflow-hidden">
                <div className="gallery__btn d-md-none">
                    <a href="#" className="thm_btn">{galery_button} <LazyLoadImage className="lazy" src={'/images/icons/arrow-right.png'} alt="" /></a>
                </div>
                
                <Galeria />

            </section>

        </>
    )

}