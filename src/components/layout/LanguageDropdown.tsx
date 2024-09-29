import React, { useState } from 'react';
import i18nConfig from '@/config/i18n.config';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: 'es', name: 'Español', flag: 'https://flagsapi.com/ES/shiny/64.png' },
    { code: 'en', name: 'English', flag: 'https://flagsapi.com/GB/shiny/64.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagsapi.com/FR/shiny/64.png' },
    { code: 'it', name: 'Italiano', flag: 'https://flagsapi.com/IT/shiny/64.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagsapi.com/DE/shiny/64.png' },
    { code: 'jp', name: '日本語', flag: 'https://flagsapi.com/JP/shiny/64.png' },
    { code: 'nl', name: 'Nederlands', flag: 'https://flagsapi.com/NL/shiny/64.png' },
    { code: 'pt', name: 'Português', flag: 'https://flagsapi.com/PT/shiny/64.png' }
];

const LanguageDropdown: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        languages.find(lang => lang.code === currentLocale) || languages[0]
    );

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleLocaleChange = (locale: string) => {
        const currentPathname = window.location.pathname;
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${locale};expires=${expires};path=/`;

        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            window.location.href = ('/' + locale + currentPathname);
        } else {
            window.location.href = (
                currentPathname.replace(`/${currentLocale}`, `/${locale}`)
            );
        }

        const newLanguage = languages.find(lang => lang.code === locale);
        if (newLanguage) {
            setSelectedLanguage(newLanguage);
        }
        toggleDropdown();





    };

    return (
        <div className="header-link-btn">
            <button onClick={toggleDropdown} className='btn-header-language'>
                <span className='lenguage'>{selectedLanguage.name}</span>
                <span className={`arrow-down`}></span>
                <LazyLoadImage src={selectedLanguage.flag} alt={`flag_${selectedLanguage.code}`} width={24} height={24} />
            </button>
            {isOpen && (
                <ul className="dropdown-content show">
                    {languages.map(({ code, name, flag }) => (
                        <li
                            key={code}
                            onClick={() => handleLocaleChange(code)}
                            className={`dropdown-item ${selectedLanguage.code === code ? 'selected' : ''}`}
                        >
                            {name}
                            <LazyLoadImage src={flag} alt={`flag_${code}`} width={24} height={14} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageDropdown;
