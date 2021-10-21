export interface CreateStores {
  name: string;
  description?: string;
  photos?: string[];
  address: string;
  phoneNumber?: string;
  email: string;
  logo?: string;
  status?: string;
}

export interface CreateStoresService {
  data: CreateStores;
  user: any;
}
