"use client";

import { useTranslation } from 'next-i18next'

import Layout from '@/components/layout/Layout';
export default function Privacy() {
  const { t } = useTranslation('translation');


  return (
    <Layout>
    <div className="privacy__area">
            <div className="container">
                <div className="privacy__wrapper mx-auto">
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.heading')}</h3>
                        <p className="mb-0">{t('privacy_policy.responsibility.heading')}</p>
                        <p className="responsibility">
                            {t('privacy_policy.responsible.name')} <br/>
                            {t('privacy_policy.responsible.cif')} <br/>
                            {t('privacy_policy.responsible.address')} <br/>
                            {t('privacy_policy.responsible.email')} <br/>
                        </p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.information_consent.heading')}</h3>
                        <p>{t('privacy_policy.information_consent.desc_1')}</p>
                        <p>{t('privacy_policy.information_consent.desc_2')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.data_obligation.heading')}</h3>
                        <p>{t('privacy_policy.data_obligation.desc')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.data_purpose.heading')}</h3>
                        <ol type="1">
                            <li>{t('privacy_policy.data_purpose.list.item_1')}</li>
                            <li>{t('privacy_policy.data_purpose.list.item_2')}</li>
                            <li>{t('privacy_policy.data_purpose.list.item_3')}</li>
                            <li>{t('privacy_policy.data_purpose.list.item_4')}</li>
                            <li>{t('privacy_policy.data_purpose.list.item_5')}</li>
                            <li>{t('privacy_policy.data_purpose.list.item_6')}</li>
                        </ol>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.data_retention.heading')}</h3>
                        <p>{t('privacy_policy.data_retention.desc')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3 className="mb-4">{t('privacy_policy.user_data.heading')}</h3>
                        <p>{t('privacy_policy.user_data.desc')}</p>
                        <ul>
                            <li>{t('privacy_policy.user_data.list.item_1')}</li>
                            <li>{t('privacy_policy.user_data.list.item_2')}</li>
                            <li>{t('privacy_policy.user_data.list.item_3')}</li>
                        </ul>
                        <p>{t('privacy_policy.user_data.desc_2')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.legal_basis.heading')}</h3>
                        <ul>
                            <li>{t('privacy_policy.legal_basis.list.item_1')}</li>
                            <li>{t('privacy_policy.legal_basis.list.item_2')}</li>
                            <li>{t('privacy_policy.legal_basis.list.item_3')}</li>
                        </ul>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.data_sharing.heading')}</h3>
                        <p>{t('privacy_policy.data_sharing.desc_1')}</p>
                        <ul>
                            <li>{t('privacy_policy.data_sharing.list.item_1')}</li>
                            <li>{t('privacy_policy.data_sharing.list.item_2')}</li>
                            <li>{t('privacy_policy.data_sharing.list.item_3')}</li>
                        </ul>
                        <p>{t('privacy_policy.data_sharing.desc_2')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.international_transfers.heading')}</h3>
                        <p>{t('privacy_policy.international_transfers.desc')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.rights_exercise.heading')}</h3>
                        <p>{t('privacy_policy.rights_exercise.desc_1')}</p>
                        <p>{t('privacy_policy.rights_exercise.desc_2')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.security_confidentiality.heading')}</h3>
                        <p>{t('privacy_policy.security_confidentiality.desc')}</p>
                    </div>
                    <div className="single__text__box">
                        <h3>{t('privacy_policy.policy_changes.heading')}</h3>
                        <p>{t('privacy_policy.policy_changes.desc_1')}</p>
                        <p>{t('privacy_policy.policy_changes.desc_2')}</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout >
  )
}

