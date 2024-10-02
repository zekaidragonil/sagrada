import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PUBLIC_ASSETS } from '@/config/common.config';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const Galeria = () => {
  const { t } = useTranslation('translation');
  const galery_button = t("gallery.button_1");


  return (
    <div className="container d-none d-md-block">
      <div className="row">
        {PUBLIC_ASSETS.gallery.map((item) => (
          <div className="col-lg-4 col-md-6" key={item}>
            <div className="gallery__blk wrap alto" data-aos="zoom-in">
              <LazyLoadImage
                src={item}
                alt=""
                width={460}
                height={560}
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              />
            </div>
          </div>
        ))}

        <div className="col-lg-12" data-aos="fade-up" >
          <div className="gallery__btn d-flex justify-content-center pb-3">
            <Button
               link={true}
              className='thm_btn'
              text={galery_button}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Galeria;
