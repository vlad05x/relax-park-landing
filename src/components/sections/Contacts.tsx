'use client';

import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks';

/**
 * Contacts Section Component
 * Features location info, map, and direct contact options.
 */
export function ContactsSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section bg-[var(--color-off-white)]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-overline text-[var(--color-gold)] mb-4 block reveal-overline">
            {t('contacts.overline')}
          </span>
          <h2 className="text-h2 reveal-title">{t('contacts.title')}</h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mx-auto mt-6 reveal-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-10 reveal-fade">
            {/* Address */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-charcoal)]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-charcoal)]/10 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-charcoal)]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-2 text-[var(--color-charcoal)]">
                    {t('contacts.addressTitle')}
                  </h3>
                  <p className="text-[var(--color-charcoal)]/70 leading-relaxed">
                    {t('contacts.addressDetail')}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-charcoal)]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-charcoal)]/10 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-charcoal)]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-2 text-[var(--color-charcoal)]">
                    {t('contacts.phoneTitle')}
                  </h3>
                  <p className="text-[var(--color-charcoal)]/70">
                    <a href={`tel:${t('contacts.phoneDetail').replace(/[^+\d]/g, '')}`} className="hover:text-[var(--color-charcoal)] transition-colors text-lg">
                      {t('contacts.phoneDetail')}
                    </a>
                  </p>
                  <p className="text-sm text-[var(--color-charcoal)]/50 mt-1">
                    {t('contacts.phoneSubtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-charcoal)]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-charcoal)]/10 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-charcoal)]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-2 text-[var(--color-charcoal)]">
                    {t('contacts.emailTitle')}
                  </h3>
                  <p className="text-[var(--color-charcoal)]/70">
                    <a href={`mailto:${t('contacts.emailDetail')}`} className="hover:text-[var(--color-charcoal)] transition-colors">
                      {t('contacts.emailDetail')}
                    </a>
                  </p>
                  <p className="text-sm text-[var(--color-charcoal)]/50 mt-1">
                    {t('contacts.emailSubtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Messengers */}
            <div>
              <h3 className="text-lg font-serif mb-4 text-[var(--color-charcoal)]">
                {t('contacts.messengersTitle')}
              </h3>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="group">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 group-hover:scale-110 transition-transform">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c.237.643.237 2.057 0 3.192-.237 1.135-1.38 2.216-2.215 2.216-.835 0-1.675-.237-2.51-.474-.835-.237-1.67-.474-2.216 0-.546.474-1.09 1.19-1.783 1.19-.693 0-2.057-.835-3.073-2.058C4.026 10.026 2.75 7.368 3.23 6.221c.237-.546.835-.835 1.528-.835.474 0 .948.059 1.303.059.355 0 .71.059.835.643.118.586.474 2.057.474 2.193 0 .136-.237.355-.474.592-.237.237-.592.532-.474.888.118.355.592.835 1.25 1.427 2.038 1.816 2.38 1.45 2.794 1.036.414-.414.888-1.25 1.065-1.664.177-.414.474-.474.83-.355.355.118 2.265 1.065 2.65 1.25.385.177.643.296.71.532.06.237.06 1.012-.237 2.058z"/>
                  </svg>
                  WhatsApp
                </Button>
                <Button variant="secondary" size="sm" className="group">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 group-hover:scale-110 transition-transform">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.461-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.344-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </Button>
              </div>
            </div>

            {/* Working Hours */}
            <div className="pt-8 border-t border-[var(--color-stone)]/50">
              <h3 className="text-lg font-serif mb-4 text-[var(--color-charcoal)]">
                {t('contacts.hoursTitle')}
              </h3>
              <div className="space-y-2 text-[var(--color-charcoal)]/70">
                <p><span className="font-medium">{t('contacts.checkIn')}:</span> 15:00</p>
                <p><span className="font-medium">{t('contacts.checkOut')}:</span> 12:00</p>
                <p className="text-[var(--color-gold)] font-medium">{t('contacts.reception')}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[400px] lg:h-[500px] bg-[var(--color-stone)]/30 rounded-sm overflow-hidden shadow-xl reveal-fade">
            {/* Google Maps Embed - Kozyn region */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20387.873539744476!2d30.638531766627725!3d50.25150826955078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4f3b6c7a760c3%3A0x8085d5360980c98f!2sKozyn%2C%20Kyiv%20Oblast%2C%20Ukraine!5e0!3m2!1sen!2sua!4v1719000000000!5m2!1sen!2sua"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title={t('contacts.mapBtn')}
            />
 
            {/* Map overlay with brand styling */}
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-white)]/98 backdrop-blur-sm p-5 rounded-sm shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-charcoal)]">
                    {t('contacts.mapCoords')}
                  </p>
                  <p className="text-xs text-[var(--color-charcoal)]/60">
                    {t('contacts.mapLocation')}
                  </p>
                </div>
              </div>
              <Button variant="primary" size="sm" className="w-full mt-4">
                <a href="https://www.google.com/maps/dir/?api=1&destination=50.2515,30.6385" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {t('contacts.mapBtn')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}