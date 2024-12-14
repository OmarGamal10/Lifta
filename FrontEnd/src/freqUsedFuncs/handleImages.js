import axios from "axios";
import React from "react";
async function handlesImage(filex) {
  const file = filex;
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dy0wq7wya/image/upload";
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Shady_images"); // Cloudinary upload preset
    data.append("cloud_name", "dy0wq7wya"); // Cloudinary cloud name

    const response = await axios.post(CLOUDINARY_URL, data);
    const urlimage = response.data;
    return urlimage.url;
  } else {
    return null;
  }
}

export default handlesImage;
