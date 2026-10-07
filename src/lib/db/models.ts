// src/lib/db/models.ts

export interface Quote {
  // @auto
  id?: number;

  // @not null;length:50
  origin: string;

  // @not null;length:50
  destination: string;

  // @not null;length:100
  shipmentType: string;

  // @not null
  weight: number;

  // @not null;length:100
  dimensions: string;

  // @not null;float
  quantity: number;

// @not null;default:0;float
  price: number;

  // @nullable
  description?: string;

  // @nullable;length:100
  preferredMethod?: string;

  // @not null;length:150
  fullName: string;

  // @not null;length:255
  email: string;

  // @not null;length:50
  phone: string;

  // @nullable;length:150
  companyName?: string;

  // @nullable
  notes?: string;

  // @not null;unique;length:20
  reference: string;

  // @not null;secret;length:64
  accessTokenHash: string;

  // @not null;length:30
  status: string;

  // @not null
  createdAt: string;

  // @not null
  updatedAt: string;
}

export interface Admin {
  // @auto
  id?: number;

  // @not null;unique;length:255
  email: string;

  // @not null
  passwordHash: string;

  // @not null;length:30
  role: string;

  // @not null
  isActive: boolean;

  // @not null
  createdAt: string;

  // @not null
  updatedAt: string;
}