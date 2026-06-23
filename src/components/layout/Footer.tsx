'use client';

import { useLanguage } from '@/hooks';

/**
 * Premium footer with minimal treatment.
 * Features contact info, social links, and legal details.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const conciergeLabel = language === 'uk' ? 'Консьєрж-сервіс' : language === 'en' ? 'Concierge Service' : 'Консьерж-сервис';

  return (
    <footer className="bg-[var(--color-charcoal)] text-white">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 text-center">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <h3 className="text-3xl font-serif mb-6 tracking-tight">RELAX PARK</h3>
              <p className="text-white/60 max-w-md leading-relaxed">
                {t('footer.desc')}
              </p>

              {/* Decorative line */}
              <div className="w-16 h-px bg-[var(--color-gold)]/50 mt-8 mx-auto" />
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs uppercase tracking-widest mb-6 text-[var(--color-gold)]">
                {t('footer.contacts')}
              </h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href={`tel:${t('contacts.phoneDetail').replace(/[^+\d]/g, '')}`} className="hover:text-white transition-colors text-lg">
                    {t('contacts.phoneDetail')}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${t('contacts.emailDetail')}`} className="hover:text-white transition-colors">
                    {t('contacts.emailDetail')}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {conciergeLabel}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs uppercase tracking-widest mb-6 text-[var(--color-gold)]">
                {t('footer.social')}
              </h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.461-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.344-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c.237.643.237 2.057 0 3.192-.237 1.135-1.38 2.216-2.215 2.216-.835 0-1.675-.237-2.51-.474-.835-.237-1.67-.474-2.216 0-.546.474-1.09 1.19-1.783 1.19-.693 0-2.057-.835-3.073-2.058C4.026 10.026 2.75 7.368 3.23 6.221c.237-.546.835-.835 1.528-.835.474 0 .948.059 1.303.059.355 0 .71.059.835.643.118.586.474 2.057.474 2.193 0 .136-.237.355-.474.592-.237.237-.592.532-.474.888.118.355.592.835 1.25 1.427 2.038 1.816 2.38 1.45 2.794 1.036.414-.414.888-1.25 1.065-1.664.177-.414.474-.474.83-.355.355.118 2.265 1.065 2.65 1.25.385.177.643.296.71.532.06.237.06 1.012-.237 2.058z"/>
                    </svg>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10">
          <div className="py-8">
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Legal */}
              <div className="text-white/40 text-xs text-center flex flex-col items-center">
                <p>© {currentYear} Relax Park. {t('footer.copyright')}</p>
                <div className="flex flex-wrap justify-center gap-6 mt-3">
                  <a href="#" className="hover:text-white/60 transition-colors">
                    {t('footer.privacy')}
                  </a>
                  <a href="#" className="hover:text-white/60 transition-colors">
                    {t('footer.terms')}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="text-white/40 text-xs text-center">
                <p>{t('footer.brandSub')}</p>
                <p>{t('footer.brandAddr')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}