import fetch from "node-fetch";
const API_USER_ID = process.env.API_USER_ID;
const API_APP_ID = process.env.API_APP_ID;
const API_AUTH_KEY = process.env.API_AUTH_KEY;
const API_URL = process.env.API_URL;

const faceDetection = async (req, res) => {
  const { image: img } = req.body;
  const regions = await getRegions(img);
  res.json(regions);
};

const getRegions = async (img) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: API_USER_ID,
      app_id: API_APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: img.url,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Key ${API_AUTH_KEY}`,
    },
    body: raw,
  };

  try {
    const response = await fetch(`${API_URL}`, requestOptions);
    const result = await response.text();
    const data = await JSON.parse(result, null, 2).outputs[0].data;
    const regions = calculateRegions(data, img);
    return regions;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const calculateRegions = (data, faceImg) => {
  const imgWidth = Number(faceImg.width);
  const imgHeight = Number(faceImg.height);
  return data.regions.map((region) => {
    const { top_row, bottom_row, right_col, left_col } =
      region.region_info.bounding_box;
    return {
      top_boundry: imgHeight * top_row,
      bottom_boundry: imgHeight - imgHeight * bottom_row,
      right_boundry: imgWidth - imgWidth * right_col,
      left_boundry: imgWidth * left_col,
    };
  });
};

export default faceDetection;
