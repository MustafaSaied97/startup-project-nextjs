export function getReferralsPermission(role = '', isReferralEnabled = false) {
  const showReferrals = role != 'reseller' && isReferralEnabled;
  return showReferrals;
}
