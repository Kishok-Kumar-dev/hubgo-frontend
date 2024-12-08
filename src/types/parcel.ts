export interface ParcelDetails {
  productName: string;
  productWeight: number;
  productType: string;
  productSize: string;
}

export interface ContactDetails {
  receiverName: string;
  receiverMobile: string;
  senderMobile: string;
  deliveryAddress: string;
}

export interface Booking {
  id: string;
  parcelDetails: ParcelDetails;
  contactDetails: ContactDetails;
  waybillNo: string;
  paymentMethod: 'prepaid' | 'cod';
  status: 'pending' | 'at_terminal' | 'in_transit' | 'out_for_delivery' | 'delivered';
  createdAt: string;
}