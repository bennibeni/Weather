export interface CityOption {
  name: string;
  lat: number;
  lon: number;
}

export const CITIES_BY_STATE: Record<string, CityOption[]> = {
  AL: [
    { name: "Birmingham", lat: 33.5207, lon: -86.8025 },
    { name: "Montgomery", lat: 32.3668, lon: -86.3000 },
    { name: "Mobile", lat: 30.6954, lon: -88.0399 },
  ],
  AK: [
    { name: "Anchorage", lat: 61.2181, lon: -149.9003 },
    { name: "Fairbanks", lat: 64.8378, lon: -147.7164 },
    { name: "Juneau", lat: 58.3019, lon: -134.4197 },
  ],
  AZ: [
    { name: "Phoenix", lat: 33.4484, lon: -112.0740 },
    { name: "Tucson", lat: 32.2226, lon: -110.9747 },
    { name: "Mesa", lat: 33.4152, lon: -111.8315 },
  ],
  AR: [
    { name: "Little Rock", lat: 34.7465, lon: -92.2896 },
    { name: "Fayetteville", lat: 36.0626, lon: -94.1574 },
    { name: "Fort Smith", lat: 35.3859, lon: -94.3985 },
  ],
  CA: [
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "San Diego", lat: 32.7157, lon: -117.1611 },
    { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
  ],
  CO: [
    { name: "Denver", lat: 39.7392, lon: -104.9903 },
    { name: "Colorado Springs", lat: 38.8339, lon: -104.8214 },
    { name: "Aurora", lat: 39.7294, lon: -104.8319 },
  ],
  CT: [
    { name: "Bridgeport", lat: 41.1865, lon: -73.1952 },
    { name: "Hartford", lat: 41.7658, lon: -72.6734 },
    { name: "New Haven", lat: 41.3083, lon: -72.9279 },
  ],
  DE: [
    { name: "Wilmington", lat: 39.7391, lon: -75.5398 },
    { name: "Dover", lat: 39.1582, lon: -75.5244 },
    { name: "Newark", lat: 39.6837, lon: -75.7497 },
  ],
  DC: [{ name: "Washington", lat: 38.9072, lon: -77.0369 }],
  FL: [
    { name: "Jacksonville", lat: 30.3322, lon: -81.6557 },
    { name: "Miami", lat: 25.7617, lon: -80.1918 },
    { name: "Tampa", lat: 27.9506, lon: -82.4572 },
  ],
  GA: [
    { name: "Atlanta", lat: 33.7490, lon: -84.3880 },
    { name: "Augusta", lat: 33.4735, lon: -82.0105 },
    { name: "Savannah", lat: 32.0809, lon: -81.0912 },
  ],
  HI: [
    { name: "Honolulu", lat: 21.3069, lon: -157.8583 },
    { name: "Hilo", lat: 19.7297, lon: -155.0900 },
  ],
  ID: [
    { name: "Boise", lat: 43.6150, lon: -116.2023 },
    { name: "Meridian", lat: 43.6121, lon: -116.3915 },
    { name: "Idaho Falls", lat: 43.4666, lon: -112.0362 },
  ],
  IL: [
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Springfield", lat: 39.7817, lon: -89.6501 },
    { name: "Rockford", lat: 42.2711, lon: -89.0940 },
  ],
  IN: [
    { name: "Indianapolis", lat: 39.7684, lon: -86.1581 },
    { name: "Fort Wayne", lat: 41.0793, lon: -85.1394 },
    { name: "Evansville", lat: 37.9716, lon: -87.5711 },
  ],
  IA: [
    { name: "Des Moines", lat: 41.5868, lon: -93.6250 },
    { name: "Cedar Rapids", lat: 41.9779, lon: -91.6656 },
    { name: "Davenport", lat: 41.5236, lon: -90.5776 },
  ],
  KS: [
    { name: "Wichita", lat: 37.6872, lon: -97.3301 },
    { name: "Topeka", lat: 39.0473, lon: -95.6752 },
    { name: "Kansas City", lat: 39.1155, lon: -94.6268 },
  ],
  KY: [
    { name: "Louisville", lat: 38.2527, lon: -85.7585 },
    { name: "Lexington", lat: 38.0406, lon: -84.5037 },
    { name: "Frankfort", lat: 38.2009, lon: -84.8733 },
  ],
  LA: [
    { name: "New Orleans", lat: 29.9511, lon: -90.0715 },
    { name: "Baton Rouge", lat: 30.4515, lon: -91.1871 },
    { name: "Shreveport", lat: 32.5252, lon: -93.7502 },
  ],
  ME: [
    { name: "Portland", lat: 43.6591, lon: -70.2568 },
    { name: "Augusta", lat: 44.3106, lon: -69.7795 },
    { name: "Bangor", lat: 44.8016, lon: -68.7712 },
  ],
  MD: [
    { name: "Baltimore", lat: 39.2904, lon: -76.6122 },
    { name: "Annapolis", lat: 38.9784, lon: -76.4922 },
    { name: "Rockville", lat: 39.0840, lon: -77.1528 },
  ],
  MA: [
    { name: "Boston", lat: 42.3601, lon: -71.0589 },
    { name: "Worcester", lat: 42.2626, lon: -71.8023 },
    { name: "Springfield", lat: 42.1015, lon: -72.5898 },
  ],
  MI: [
    { name: "Detroit", lat: 42.3314, lon: -83.0458 },
    { name: "Grand Rapids", lat: 42.9634, lon: -85.6681 },
    { name: "Lansing", lat: 42.7325, lon: -84.5555 },
  ],
  MN: [
    { name: "Minneapolis", lat: 44.9778, lon: -93.2650 },
    { name: "Saint Paul", lat: 44.9537, lon: -93.0900 },
    { name: "Duluth", lat: 46.7867, lon: -92.1005 },
  ],
  MS: [
    { name: "Jackson", lat: 32.2988, lon: -90.1848 },
    { name: "Gulfport", lat: 30.3674, lon: -89.0928 },
    { name: "Hattiesburg", lat: 31.3271, lon: -89.2903 },
  ],
  MO: [
    { name: "Kansas City", lat: 39.0997, lon: -94.5786 },
    { name: "St. Louis", lat: 38.6270, lon: -90.1994 },
    { name: "Springfield", lat: 37.2090, lon: -93.2923 },
  ],
  MT: [
    { name: "Billings", lat: 45.7833, lon: -108.5007 },
    { name: "Missoula", lat: 46.8721, lon: -113.9940 },
    { name: "Helena", lat: 46.5891, lon: -112.0391 },
  ],
  NE: [
    { name: "Omaha", lat: 41.2565, lon: -95.9345 },
    { name: "Lincoln", lat: 40.8136, lon: -96.7026 },
  ],
  NV: [
    { name: "Las Vegas", lat: 36.1699, lon: -115.1398 },
    { name: "Reno", lat: 39.5296, lon: -119.8138 },
    { name: "Carson City", lat: 39.1638, lon: -119.7674 },
  ],
  NH: [
    { name: "Manchester", lat: 42.9956, lon: -71.4548 },
    { name: "Concord", lat: 43.2081, lon: -71.5376 },
    { name: "Nashua", lat: 42.7654, lon: -71.4676 },
  ],
  NJ: [
    { name: "Newark", lat: 40.7357, lon: -74.1724 },
    { name: "Jersey City", lat: 40.7178, lon: -74.0431 },
    { name: "Trenton", lat: 40.2206, lon: -74.7597 },
  ],
  NM: [
    { name: "Albuquerque", lat: 35.0844, lon: -106.6504 },
    { name: "Santa Fe", lat: 35.6870, lon: -105.9378 },
    { name: "Las Cruces", lat: 32.3199, lon: -106.7637 },
  ],
  NY: [
    { name: "New York City", lat: 40.7128, lon: -74.0060 },
    { name: "Buffalo", lat: 42.8864, lon: -78.8784 },
    { name: "Albany", lat: 42.6526, lon: -73.7562 },
  ],
  NC: [
    { name: "Charlotte", lat: 35.2271, lon: -80.8431 },
    { name: "Raleigh", lat: 35.7796, lon: -78.6382 },
    { name: "Greensboro", lat: 36.0726, lon: -79.7920 },
  ],
  ND: [
    { name: "Fargo", lat: 46.8772, lon: -96.7898 },
    { name: "Bismarck", lat: 46.8083, lon: -100.7837 },
  ],
  OH: [
    { name: "Columbus", lat: 39.9612, lon: -82.9988 },
    { name: "Cleveland", lat: 41.4993, lon: -81.6944 },
    { name: "Cincinnati", lat: 39.1031, lon: -84.5120 },
  ],
  OK: [
    { name: "Oklahoma City", lat: 35.4676, lon: -97.5164 },
    { name: "Tulsa", lat: 36.1540, lon: -95.9928 },
  ],
  OR: [
    { name: "Portland", lat: 45.5152, lon: -122.6784 },
    { name: "Salem", lat: 44.9429, lon: -123.0351 },
    { name: "Eugene", lat: 44.0521, lon: -123.0868 },
  ],
  PA: [
    { name: "Philadelphia", lat: 39.9526, lon: -75.1652 },
    { name: "Pittsburgh", lat: 40.4406, lon: -79.9959 },
    { name: "Harrisburg", lat: 40.2732, lon: -76.8867 },
  ],
  RI: [
    { name: "Providence", lat: 41.8240, lon: -71.4128 },
    { name: "Warwick", lat: 41.7001, lon: -71.4162 },
  ],
  SC: [
    { name: "Columbia", lat: 34.0007, lon: -81.0348 },
    { name: "Charleston", lat: 32.7765, lon: -79.9311 },
    { name: "Greenville", lat: 34.8526, lon: -82.3940 },
  ],
  SD: [
    { name: "Sioux Falls", lat: 43.5460, lon: -96.7313 },
    { name: "Rapid City", lat: 44.0805, lon: -103.2310 },
    { name: "Pierre", lat: 44.3683, lon: -100.3510 },
  ],
  TN: [
    { name: "Nashville", lat: 36.1627, lon: -86.7816 },
    { name: "Memphis", lat: 35.1495, lon: -90.0490 },
    { name: "Knoxville", lat: 35.9606, lon: -83.9207 },
  ],
  TX: [
    { name: "Houston", lat: 29.7604, lon: -95.3698 },
    { name: "Dallas", lat: 32.7767, lon: -96.7970 },
    { name: "Austin", lat: 30.2672, lon: -97.7431 },
  ],
  UT: [
    { name: "Salt Lake City", lat: 40.7608, lon: -111.8910 },
    { name: "Provo", lat: 40.2338, lon: -111.6585 },
  ],
  VT: [
    { name: "Burlington", lat: 44.4759, lon: -73.2121 },
    { name: "Montpelier", lat: 44.2601, lon: -72.5754 },
  ],
  VA: [
    { name: "Virginia Beach", lat: 36.8529, lon: -75.9780 },
    { name: "Richmond", lat: 37.5407, lon: -77.4360 },
    { name: "Norfolk", lat: 36.8508, lon: -76.2859 },
  ],
  WA: [
    { name: "Seattle", lat: 47.6062, lon: -122.3321 },
    { name: "Spokane", lat: 47.6588, lon: -117.4260 },
    { name: "Olympia", lat: 47.0379, lon: -122.9007 },
  ],
  WV: [
    { name: "Charleston", lat: 38.3498, lon: -81.6326 },
    { name: "Huntington", lat: 38.4192, lon: -82.4452 },
  ],
  WI: [
    { name: "Milwaukee", lat: 43.0389, lon: -87.9065 },
    { name: "Madison", lat: 43.0731, lon: -89.4012 },
    { name: "Green Bay", lat: 44.5133, lon: -88.0133 },
  ],
  WY: [
    { name: "Cheyenne", lat: 41.1400, lon: -104.8202 },
    { name: "Casper", lat: 42.8501, lon: -106.3252 },
  ],
};
