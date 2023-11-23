import { Get } from "../lib/Request"
import { City, District, Province, Village } from "../types/region";

const RegionService = {
    searchRegion(searchTerm:string="") {
        return Get("wilayah/region", {
            searchTerm,
        })
    },
    getProvince() {
        return fetch('/mock/province.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Province[]);
    },
    getCity() {
        return fetch('/mock/city.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as City[]);
    },
    getDistrict() {
        return fetch('/mock/district.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as District[]);
    },
    getVillage() {
        return fetch('/mock/village.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Village[]);
    }
}

export default RegionService