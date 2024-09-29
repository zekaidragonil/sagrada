"use client";

import { useTranslation } from 'next-i18next'
import Layout from "@/components/layout/Layout";
export default function Privacy() {
  const { t } = useTranslation('translation');
  return (
       <Layout>
      <div className="legal__area">
        <div className="container">
          <div className="legal__wrapper mx-auto">
            <div className="single__text__box">
              <h3 className="text-uppercase">{t('legal.heading')}</h3>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.information_legal.title')}</h3>
                <p>{t('legal.information_legal.content_1')}</p>
                <p>{t('legal.information_legal.content_2')}</p>
                <p>{t('legal.information_legal.content_3')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.object_of_site.title')}</h3>
                <p>{t('legal.object_of_site.content')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.use_of_site.title')}</h3>
                <p>{t('legal.use_of_site.content_1')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.use_of_site.content_2')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.use_of_site.content_3')}</p>
                <p>{t('legal.use_of_site.content_4')}</p>
                <p>{t('legal.use_of_site.content_5')}</p>
                <p>{t('legal.use_of_site.content_6')}</p>
                <p>{t('legal.use_of_site.content_7')}</p>
                <p>{t('legal.use_of_site.content_8')}</p>
                <p>{t('legal.use_of_site.content_9')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.use_of_site.content_10')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.intellectual_property.title')}</h3>
                <p>{t('legal.intellectual_property.content_1')}</p>
                <p>{t('legal.intellectual_property.content_2')}</p>
                <p>{t('legal.intellectual_property.content_3')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.responsibility.title')}</h3>
                <p>{t('legal.responsibility.content_1')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.responsibility.content_2')}</p>
                <p>{t('legal.responsibility.content_3')}</p>
                <p>{t('legal.responsibility.content_4')}</p>
                <p>{t('legal.responsibility.content_5')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.responsibility.content_6')}</p>
                <p>{t('legal.responsibility.content_7')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.links.title')}</h3>
                <p>{t('legal.links.content_1')}</p>
                <p>{t('legal.links.content_2')}</p>
                <p>{t('legal.links.content_3')}</p>
              </div>
              <div className="single__text__box">
                <p>{t('legal.links.content_4')}</p>
                <p>{t('legal.links.content_5')}</p>
                <p>{t('legal.links.content_6')}</p>
                <p>{t('legal.links.content_7')}</p>
              </div>
            </div>
            <div className="condition">
              <div className="single__text__box">
                <h3 className="condition__title">{t('legal.duration_modifications.title')}</h3>
                <p>{t('legal.duration_modifications.content_1')}</p>
                <p>{t('legal.duration_modifications.content_2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>

  )
}

