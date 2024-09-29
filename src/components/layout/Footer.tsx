
import Link from '@/components/ui/Link';
import { PUBLIC_ASSETS } from '@/config/common.config';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Footer() {
    const { t } = useTranslation('translation');
    const title2 = t("footer.title_2");
    const title3 = t("footer.title_3");
    const title4 = t("footer.title_4");
    const link = t("footer.link_1");
    const link2 = t("footer.link_2");
    const copyright = t("footer.copyright");
    const legal = t("footer.legal_1");
    const legal2 = t("footer.legal_2");
    const legal3 = t("footer.legal_3");
    const legal4 = t("footer.legal_4");



    return (
        <footer className="footer-area f__home overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12" data-aos="fade-up" >
                        <div className="footer__nav">
                            <ul>
                                <li>
                                    <div className="visacard__content">
                                        {title2 !== "footer.title_2" && <p className="mr-1 footer_title_2" dangerouslySetInnerHTML={{ __html: title2 }} />}
                                        <LazyLoadImage
                                            src={PUBLIC_ASSETS.payment}
                                            alt=""
                                            width={180} height={28}
                                        />
                                    </div>
                                </li>
                            </ul>
                            <ul className="d-button">
                                {link !== "footer.link_1" &&
                                    <li>
                                        <Link href={'#'} className="mr-1 footer_link" dangerouslySetInnerHTML={{ __html: link }} />
                                    </li>}
                                {link2 !== "footer.link_2" &&
                                    <li>
                                        <Link href={'#'} className="mr-1 footer_link" dangerouslySetInnerHTML={{ __html: link2 }} />
                                    </li>}
                            </ul>
                        </div>  
                    </div>

                    <div className="col-lg-12">
                        <div className="footer__content" data-aos="zoom-in" >
                            {title3 !== "footer.title_3" && <h2 className="section_heading_title_big footer_title_3" dangerouslySetInnerHTML={{ __html: title3 }} />}
                            <LazyLoadImage
                                src={PUBLIC_ASSETS.ticket}
                                className='center'
                                width={180} height={28}
                            />
                            <a href="#" className="mt-3 thm_btn">{title4}</a>
                        </div>
                        <div className="btn-mobile d-md-none d-block">
                            <ul>
                                <li><a href="https://ticket-sagradafamilia.com/contact.php">Contacto</a></li>
                                <li><a href="https://ticket-sagradafamilia.com/blog">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="footer__btn">
                            {copyright !== "footer.copyright" && <li> <b className="footer_copyright_li" dangerouslySetInnerHTML={{ __html: `${copyright} © TicketGo ` }} /></li>}

                            <ul>
                                {legal !== "footer.legal_1" && <li><b><Link href="/conditions" className="footer_link" dangerouslySetInnerHTML={{ __html: legal }} /></b></li>}
                                {legal2 !== "footer.legal_2" && <li><b><span>|</span></b></li>}
                                {legal3 !== "footer.legal_3" && <li><b><Link href="/cookies" className="footer_link" dangerouslySetInnerHTML={{ __html: legal2 }} /></b></li>}
                                {legal4 !== "footer.legal_4" && <li><b><span>|</span></b></li>}
                                {legal3 !== "footer.legal_3" && <li><b><Link href="/privacy" className="footer_link" dangerouslySetInnerHTML={{ __html: legal3 }} /></b></li>}
                                {legal4 !== "footer.legal_4" && <li><b><span>|</span></b></li>}
                                {legal3 !== "footer.legal_3" && <li><b><Link href="/legal" className="footer_link" dangerouslySetInnerHTML={{ __html: legal4 }} /></b></li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
}
