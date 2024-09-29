'use client'

import { Accordion } from 'react-bootstrap';
import { GOOGLE_MAP_EMBED, PUBLIC_ASSETS } from '@/config/common.config';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Map() {
    const { t } = useTranslation('translation');
    
    const title = t("location.title_1");
    const title_walk = t("location.walk.title");
    const text_walk = t("location.walk.text_1");
    const text_walk2 = t("location.walk.text_2");
    const text_walk3 = t("location.walk.text_3");
    const text_walk4 = t("location.walk.text_4");
    const text_walk5 = t("location.walk.text_5");
    const text_walk6 = t("location.walk.text_6");
    const title_metro = t("location.metro.title");
    const text_metro = t("location.metro.text_1");
    const text_metro2 = t("location.metro.text_2");
    const text_metro3 = t("location.metro.text_3");
    const title_taxi = t("location.taxi.title");
    const text_taxi = t("location.taxi.text_1");
    const text_taxi2 = t("location.taxi.text_2");
    const title_bus = t("location.bus.title");
    const text_bus = t("location.bus.text_1");
    const text_bus2 = t("location.bus.text_2");
    const text_bus3 = t("location.bus.text_3");
    const title_tour = t("location.tour.title");
    const text_tour = t("location.tour.text_1");
    const text_tour2 = t("location.tour.text_2");
    const title_bike = t("location.bicycle.title");
    const text_bike = t("location.bicycle.text_1");
    const text_bike2 = t("location.bicycle.text_2");

    const transportOptions = [
        {
            id: title_walk,
            title: title_walk !== "location.walk.title" ? title_walk : false,
            icon: 'assets/images/resource/map-img-1.svg',
            content: <div>
                {text_walk !== "location.walk.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_walk }} />}
                {text_walk2 !== "location.walk.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_walk2 }} />}
                {text_walk3 !== "location.walk.text_3" && <p className="content.main.text_3" dangerouslySetInnerHTML={{ __html: text_walk3 }} />}
                {text_walk4 !== "location.walk.text_4" && <p className="content.main.text_4" dangerouslySetInnerHTML={{ __html: text_walk4 }} />}
                {text_walk5 !== "location.walk.text_5" && <p className="content.main.text_5" dangerouslySetInnerHTML={{ __html: text_walk5 }} />}
                {text_walk6 !== "location.walk.text_6" && <p className="content.main.text_6" dangerouslySetInnerHTML={{ __html: text_walk6 }} />}
            </div>
        },
        {
            id: title_bike,
            title: title_bike !== "location.bicycle.title" ? title_bike : false,
            icon: 'assets/images/resource/map-img-2.svg',
            content: <div>
                {text_bike !== "location.bicycle.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_bike }} />}
                {text_bike2 !== "location.bicycle.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_bike2 }} />}
            </div>
        },
        {
            id: title_metro,
            title: title_metro !== "location.metro.title" ? title_metro : false,
            icon: 'assets/images/resource/map-img-3.svg',
            content: <div>
                {text_metro !== "location.metro.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_metro }} />}
                {text_metro2 !== "location.metro.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_metro2 }} />}
                {text_metro3 !== "location.metro.text_3" && <p className="content.main.text_3" dangerouslySetInnerHTML={{ __html: text_metro3 }} />}
            </div>
        },
        {
            id: title_taxi,
            title: title_taxi !== "location.taxi.title" ? title_taxi : false,
            icon: 'assets/images/resource/map-img-4.svg',
            content: <div>
                {text_taxi !== "location.taxi.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_taxi }} />}
                {text_taxi2 !== "location.taxi.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_taxi2 }} />}
            </div>
        },
        {
            id: title_bus,
            title: title_bus !== "location.bus.title" ? title_bus : false,
            icon: 'assets/images/resource/map-img-5.svg',
            content: <div>
                {text_bus !== "location.bus.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_bus }} />}
                {text_bus2 !== "location.bus.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_bus2 }} />}
                {text_bus3 !== "location.bus.text_3" && <p className="content.main.text_3" dangerouslySetInnerHTML={{ __html: text_bus3 }} />}
            </div>
        },
        {
            id: title_tour,
            title: title_tour !== "location.tour.title" ? title_tour : false,
            icon: 'assets/images/resource/map-img-5.svg',
            content: <div>
                {text_tour !== "location.tour.text_1" && <p className="content.main.text_1" dangerouslySetInnerHTML={{ __html: text_tour }} />}
                {text_tour2 !== "location.tour.text_2" && <p className="content.main.text_2" dangerouslySetInnerHTML={{ __html: text_tour2 }} />}
            </div>
        },
    ];

    return(
        <section id='map' className="formas-area overflow-hidden">
        <div className="container">
            <div className="text-center formas__area__top"  data-aos="fade-up" >
                <div className="sec__title">
                    {title !== "" && <h1 className="section_heading_title_big content.main.title_1" dangerouslySetInnerHTML={{ __html: title }} />}
                </div>
                <div className="formas__map" data-aos="zoom-in" >
                    <iframe width="100%" height="570" src={`https://www.google.com/maps/embed?${GOOGLE_MAP_EMBED}`}
                        title='map'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="formas__accordion section-content">
                        <div  id="accordionExample">
                            {transportOptions.map((option, index) => (
                                <Accordion key={option.id} defaultActiveKey="0">
                                    <Accordion.Item eventKey={option.id}>
                                        <Accordion.Header>
                    
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i style={{ marginRight: '10px' }}>
                                                    <LazyLoadImage
                                                        src={PUBLIC_ASSETS.transportIcons[index]}
                                                        alt=""
                                                        width={80}
                                                        height={80}
                                                    />
                                                </i>
                                                {option.title}
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                <li>{option.content}</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    )
}