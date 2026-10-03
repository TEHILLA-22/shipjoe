
// AUTO-GENERATED SCHEMA - DO NOT EDIT
// Schema Hash: 26c04f659804d8c1
// Source Hash: 9d6e6d8c3cd85d2c

export interface Quote {
  id?: number;
  origin: string;
  destination: string;
  shipmentType: string;
  weight: number;
  dimensions: string;
  quantity: number;
  description?: string;
  preferredMethod?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  notes?: string;
  reference: string;
  accessTokenHash: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id?: number;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ModelMap = {
  Quote: Quote;
  Admin: Admin;
};

export const schema = {
  "Quote": {
    "primaryKey": "id",
    "fields": {
      "id": {
        "type": "number | undefined",
        "originalType": "number",
        "optional": true,
        "meta": {
          "@auto": true
        }
      },
      "origin": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "50"
        }
      },
      "destination": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "50"
        }
      },
      "shipmentType": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "100"
        }
      },
      "weight": {
        "type": "number",
        "originalType": "number",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "dimensions": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "100"
        }
      },
      "quantity": {
        "type": "number",
        "originalType": "number",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "description": {
        "type": "string | undefined",
        "originalType": "string",
        "optional": true,
        "meta": {
          "@nullable": true
        }
      },
      "preferredMethod": {
        "type": "string | undefined",
        "originalType": "string",
        "optional": true,
        "meta": {
          "@nullable": true,
          "length": "100"
        }
      },
      "fullName": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "150"
        }
      },
      "email": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "255"
        }
      },
      "phone": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "50"
        }
      },
      "companyName": {
        "type": "string | undefined",
        "originalType": "string",
        "optional": true,
        "meta": {
          "@nullable": true,
          "length": "150"
        }
      },
      "notes": {
        "type": "string | undefined",
        "originalType": "string",
        "optional": true,
        "meta": {
          "@nullable": true
        }
      },
      "reference": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "unique": true,
          "length": "20"
        }
      },
      "accessTokenHash": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "secret": true,
          "length": "64"
        }
      },
      "status": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "30"
        }
      },
      "createdAt": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "updatedAt": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true
        }
      }
    },
    "relations": [],
    "table": "quotes"
  },
  "Admin": {
    "primaryKey": "id",
    "fields": {
      "id": {
        "type": "number | undefined",
        "originalType": "number",
        "optional": true,
        "meta": {
          "@auto": true
        }
      },
      "email": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "unique": true,
          "length": "255"
        }
      },
      "passwordHash": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "role": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true,
          "length": "30"
        }
      },
      "isActive": {
        "type": "boolean",
        "originalType": "boolean",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "createdAt": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true
        }
      },
      "updatedAt": {
        "type": "string",
        "originalType": "string",
        "optional": false,
        "meta": {
          "@not null": true
        }
      }
    },
    "relations": [],
    "table": "admins"
  }
} as const;

export type Schema = typeof schema;
export type ModelName = keyof ModelMap;
