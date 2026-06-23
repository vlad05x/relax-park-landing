'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Input, Image } from '@/components/ui';
import { checkAvailability, type RoomRate, formatPrice } from '@/lib/pms-api';
import { useLanguage } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_IMAGES: Record<string, string> = {
  '1': '/images/rooms/villa-01.jpg',
  '2': '/images/rooms/suite-01.jpg',
  '3': '/images/rooms/estate-01.jpg',
};

/**
 * Premium Booking Widget with Framer Motion transitions and premium Quiet Luxury design.
 * Multi-step booking flow: Dates → Rooms → Guest Details → Confirmation.
 */
export function BookingWidget() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomRate[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomRate | null>(null);
  const { t } = useLanguage();

  // Form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Calculate nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Step 1: Check availability
  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;

    setIsLoading(true);
    try {
      const availableRooms = await checkAvailability({
        checkIn,
        checkOut,
        adults,
        children,
      });

      // Localize rooms returned from the PMS mock API
      const translatedRooms = availableRooms.map((room) => {
        const tr = t(`rooms.items.${room.id}`);
        return {
          ...room,
          name: tr.name || room.name,
          description: tr.description || room.description,
        };
      });

      setRooms(translatedRooms);
      setStep(2);
    } catch (error) {
      console.error('Failed to check availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Submit booking
  const handleSubmitBooking = async () => {
    if (!selectedRoom || !guestName || !guestEmail || !guestPhone) return;

    setIsLoading(true);
    try {
      // Send booking to PMS API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(4);
    } catch (error) {
      console.error('Failed to submit booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nights = getNights();

  const stepLabels = [
    t('booking.steps.dates'),
    t('booking.steps.room'),
    t('booking.steps.details'),
    t('booking.steps.confirmation'),
  ];

  return (
    <div className="bg-[var(--color-white)] rounded-sm shadow-2xl overflow-hidden border border-[var(--color-stone)]/20">
      {/* Progress Indicator */}
      <div className="booking-steps-container">
        {/* Connective progress line */}
        <div className="booking-steps-progress-line">
          <div
            className="booking-steps-progress-fill"
            style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
          />
        </div>

        {stepLabels.map((label, index) => {
          const isCompleted = step > index + 1;
          const isActive = step === index + 1;

          return (
            <div
              key={label}
              className={cn(
                'booking-step-item',
                isCompleted && 'completed',
                isActive && 'active'
              )}
            >
              <div className="booking-step-circle">
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="booking-step-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="p-6 md:p-8 min-h-[320px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-gold)]">
                    {t('booking.form.checkIn')}
                  </label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="font-sans border-[var(--color-stone)]/30 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-gold)]">
                    {t('booking.form.checkOut')}
                  </label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="font-sans border-[var(--color-stone)]/30 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-charcoal)]/60">
                    {t('booking.form.adults')}
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full h-[52px] px-4 rounded-sm border border-[var(--color-stone)]/30 bg-[var(--color-off-white)]/60 hover:bg-[var(--color-off-white)]/90 text-[var(--color-charcoal)] focus:outline-none focus:bg-[var(--color-white)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(184,159,122,0.12)] transition-all duration-300 font-sans font-medium"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="bg-[var(--color-white)]">
                          {n} {n === 1 ? t('booking.form.guestLabel') : n < 5 ? t('booking.form.guestLabel2To4') : t('booking.form.guestLabelMany')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-charcoal)]/60">
                    {t('booking.form.children')}
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full h-[52px] px-4 rounded-sm border border-[var(--color-stone)]/30 bg-[var(--color-off-white)]/60 hover:bg-[var(--color-off-white)]/90 text-[var(--color-charcoal)] focus:outline-none focus:bg-[var(--color-white)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(184,159,122,0.12)] transition-all duration-300 font-sans font-medium"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n} className="bg-[var(--color-white)]">
                          {n} {n === 0 ? `0 ${languageText(n)}` : `${n} ${languageText(n)}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-2 relative overflow-hidden group/btn"
                onClick={handleCheckAvailability}
                disabled={!checkIn || !checkOut || isLoading}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                  {isLoading ? t('booking.form.checking') : t('booking.form.findRooms')}
                </span>
                <div className="absolute inset-0 bg-[var(--color-forest)] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Room Selection */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-2">
                <div className="py-2 px-6 bg-[var(--color-beige)]/30 rounded-full border border-[var(--color-stone)]/20 shadow-sm">
                  <p className="text-xs text-[var(--color-charcoal)]/80 font-sans tracking-wide">
                    <span className="font-semibold">{checkIn}</span> — <span className="font-semibold">{checkOut}</span> ({nights} {nights === 1 ? t('booking.form.nightLabel') : nights < 5 ? t('booking.form.nightLabel2To4') : t('booking.form.nightLabelMany')})
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {rooms.map((room) => {
                  const isSelected = selectedRoom?.id === room.id;
                  const isPopular = room.id === '2'; // Highlight Lake Suite as recommended

                  return (
                    <div
                      key={room.id}
                      className={cn(
                        'border rounded-sm cursor-pointer transition-all duration-500 overflow-hidden bg-[var(--color-white)] relative',
                        isSelected
                          ? 'border-[var(--color-gold)] shadow-xl shadow-[var(--color-gold)]/10 bg-[var(--color-off-white)]/40 scale-[1.01]'
                          : 'border-[var(--color-stone)]/20 hover:border-[var(--color-gold)]/40 hover:shadow-lg hover:scale-[1.005]'
                      )}
                      onClick={() => setSelectedRoom(room)}
                    >
                      {/* Popular tag */}
                      {isPopular && (
                        <div className="absolute top-0 right-0 bg-[var(--color-gold)] text-white text-[9px] uppercase tracking-widest px-3 py-1 font-sans font-semibold rounded-bl-sm z-10">
                          Рекомендуем
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row gap-0 md:gap-6">
                        {/* Thumbnail Image with hover scale */}
                        <div className="relative w-full md:w-56 h-44 md:h-auto min-h-[160px] flex-shrink-0 bg-[var(--color-off-white)] overflow-hidden group">
                          <Image
                            src={ROOM_IMAGES[room.id] || ROOM_IMAGES['1']}
                            alt={room.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 224px"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-3 left-3 bg-[var(--color-gold)] text-white p-2 rounded-full shadow-lg z-10">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl md:text-2xl font-serif text-[var(--color-charcoal)] leading-tight">
                                {room.name}
                              </h3>
                            </div>
                            <p className="text-sm text-[var(--color-charcoal)]/70 mt-2 max-w-lg leading-relaxed font-light">
                              {room.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[var(--color-stone)]/10">
                            <div className="flex gap-4 text-[10px] text-[var(--color-charcoal)]/40 uppercase tracking-widest font-semibold font-sans">
                              <span className="flex items-center gap-1.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                </svg>
                                {room.maxOccupancy} {room.maxOccupancy === 1 ? t('booking.form.guestLabel') : room.maxOccupancy < 5 ? t('booking.form.guestLabel2To4') : t('booking.form.guestLabelMany')}
                              </span>
                              <span>•</span>
                              <span>{room.area} м²</span>
                              <span>•</span>
                              <span>{room.bedType}</span>
                            </div>
                            <div className="text-left sm:text-right flex items-baseline sm:flex-col sm:justify-center gap-2 sm:gap-0">
                              <p className="text-2xl font-serif text-[var(--color-gold)] font-medium">
                                {formatPrice(room.price)}
                              </p>
                              <p className="text-[10px] text-[var(--color-charcoal)]/45 uppercase tracking-widest font-sans font-bold">
                                {t('booking.form.forNight')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 border-[var(--color-stone)]/30 hover:bg-[var(--color-off-white)]"
                  onClick={() => setStep(1)}
                >
                  {t('booking.form.back')}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={!selectedRoom}
                >
                  {t('booking.form.continue')}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Guest Details */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6"
            >
              {selectedRoom && (
                <div className="p-5 bg-[var(--color-beige)]/20 rounded-sm border border-[var(--color-stone)]/20 mb-2 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-[var(--color-charcoal)]">{selectedRoom.name}</h3>
                    <p className="text-xs text-[var(--color-charcoal)]/60 font-sans mt-1">
                      {checkIn} — {checkOut} ({nights} {nights === 1 ? t('booking.form.nightLabel') : nights < 5 ? t('booking.form.nightLabel2To4') : t('booking.form.nightLabelMany')})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-serif text-[var(--color-gold)] font-semibold">
                      {formatPrice(selectedRoom.price * nights)}
                    </p>
                    <p className="text-[9px] text-[var(--color-charcoal)]/50 uppercase tracking-widest font-bold font-sans mt-1">
                      {t('booking.form.total')}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-charcoal)]/75">
                    {t('booking.form.fullName')}
                  </label>
                  <Input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t('booking.form.fullNamePlaceholder')}
                    className="border-[var(--color-stone)]/30 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-charcoal)]/75">
                    {t('booking.form.email')}
                  </label>
                  <Input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder={t('booking.form.emailPlaceholder')}
                    className="border-[var(--color-stone)]/30 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--color-charcoal)]/75">
                    {t('booking.form.phone')}
                  </label>
                  <Input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder={t('booking.form.phonePlaceholder')}
                    className="border-[var(--color-stone)]/30 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 border-[var(--color-stone)]/30 hover:bg-[var(--color-off-white)]"
                  onClick={() => setStep(2)}
                >
                  {t('booking.form.back')}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleSubmitBooking}
                  disabled={!guestName || !guestEmail || !guestPhone || isLoading}
                >
                  {isLoading ? t('booking.form.submitting') : t('booking.form.submitBtn')}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center py-12 px-4"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center mx-auto mb-6 shadow-sm border border-[var(--color-success)]/20">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-[var(--color-charcoal)] mb-3 leading-tight">
                {t('booking.confirm.title')}
              </h3>
              <p className="text-[var(--color-charcoal)]/70 mb-10 max-w-md mx-auto leading-relaxed font-light">
                {t('booking.confirm.text').replace('{email}', guestEmail)}
              </p>
              <Button variant="primary" size="lg" onClick={() => setStep(1)} className="px-10">
                {t('booking.confirm.newBooking')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Small helper to translate children counts properly
  function languageText(n: number) {
    if (n === 0) return '';
    return n === 1
      ? t('booking.form.childLabel')
      : n < 4
      ? t('booking.form.childLabel2To4')
      : t('booking.form.childLabelMany');
  }
}