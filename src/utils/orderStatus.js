function generateOrderStatus(clr = '', text = '') {
  return {
    clr,
    text,
  };
}
const orderStatus = {
  //keys must be in correct logic order
  pending: generateOrderStatus('#FA8232', 'Pending'),
  payment_confirmed: generateOrderStatus('#0084FF', 'Payment Confirmed'),
  canceled: generateOrderStatus('#FF001F', 'Canceled'),
  in_progress: generateOrderStatus('#FFA500', 'In Progress'),
  delivered: generateOrderStatus('#2DB224', 'Delivered'),
};

export default orderStatus;
