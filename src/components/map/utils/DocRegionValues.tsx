export function getRegionName(regionId: string) {
  switch (regionId) {
    case 'NZ-NTL':
      return 'Northland';
    case 'NZ-AUK':
      return 'Auckland';
    case 'NZ-WKO':
      return 'Waikato + Coromandel';
    case 'DOC-COR':
      return 'Coromandel';
    case 'NZ-BOP':
      return 'Bay of Plenty';
    case 'NZ-GIS':
      return 'East Coast';
    case 'NZ-TKI':
      return 'Taranaki';
    case 'NZ-MWT':
      return 'Manawatu/Whanganui + Central North Island';
    case 'DOC-CNI':
      return 'Central North Island';
    case 'NZ-HKB':
      return "Hawke's Bay";
    case 'NZ-WGN':
      return 'Wellington/Kapiti';
    case 'DOC-WPA':
      return 'Wairarapa';
    case 'NZ-CIT':
      return 'Chatham Islands **';
    case 'NZ-NSN':
      return 'Nelson/Tasman';
    case 'NZ-MBH':
      return 'Marlborough';
    case 'NZ-WTC':
      return 'West Coast';
    case 'NZ-CAN':
      return 'Canterbury';
    case 'NZ-OTA':
      return 'Otago';
    case 'NZ-STL':
      return 'Southland + Fiordland';
    case 'DOC-FIL':
      return 'Fiordland';
    default:
      return '';
  }
}
