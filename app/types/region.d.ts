export interface Province {
    code?: string;
    name: string;
}

export interface City {
    code?: string;
    name: string;
    province: string;
    provinceCode: string;
}

export interface District {
    code?: string;
    name: string;
    city: string;
    cityCode: string;
    province: string;
    provinceCode: string;
}

export interface Village {
    code?: string;
    name: string;
    district: string;
    districtCode: string;
    city: string;
    cityCode: string;
    province: string;
    provinceCode: string;
}

export interface SearchRegion {
    searching?: string
    kel_id?: string
    kel_code?: string
    kel_text?: string
    kec_id?: string
    kec_code?: string
    kec_text?: string
    kab_id?: string
    kab_code?: string
    kab_text?: string
    prov_id?: string
    prov_code?: string
    prov_text?: string
}
