export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
};

export type ProductApiResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
};

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Login = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | string; // extendable if other values exist
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type Categories = {
  slug: string;
  name: string;
  url: string;
};

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
};

export type Cart = {
  id: number;
  userId: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
};

export type CartResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};

export type UserAdvanced = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
};
