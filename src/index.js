import { API_URL, URL_STUDENTS, URL_HOUSE } from "./constants/api";
import { getApiData } from "./utils/getApiData";

(async () => {
  const data = await getApiData.getData(API_URL);
})();

// getApiData.getData(API_URL)
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));