import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

function OrderStatus({ status, className = "" }) {
  const locale = useLocale();
  const t = useTranslations();

  const allStatus = { 
    pending: { ar: "قيد الانتظار", en: "Pending", color: '#fa8232' },
    payment_confirmed: { ar: "تم تأكيد الدفع", en: "Payment confirmed", color: '#2db224' },
    in_progress: { ar: " جاري التنفيذ", en: "In progress", color: '#2196F3' },
    delivered: { ar: "تم التسليم", en: "Delivered", color: '#2db224' },
    canceled: { ar: "تم الالغاء", en: "canceled", color: '#ff001f' },
  };

  return (
    <div 
      className={className} 
      style={{ color: allStatus[status]?.color || '#ff001f' }}
    >
      { allStatus[status]?.[locale] || t('general.wrong_status') }
    </div>
  );
}

export default OrderStatus;