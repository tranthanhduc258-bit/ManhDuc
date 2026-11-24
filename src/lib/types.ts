export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderRecord = {
  code: string;
  createdAt: string; // giờ Việt Nam, dạng "24/11/2026 14:05"
  submissionId: string;
  name: string;
  phone: string;
  province: string;
  address: string;
  note: string;
  payment: "COD" | "Chuyển khoản";
  items: OrderItem[];
  total: number;
  status: string;
};

export type DealerRecord = {
  code: string;
  createdAt: string;
  submissionId: string;
  name: string;
  phone: string;
  province: string;
  dealerType: string;
  business: string;
  address: string;
  note: string;
  status: string;
};

export type ContactRecord = {
  code: string;
  createdAt: string;
  submissionId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
};
