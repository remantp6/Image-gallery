import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_KEY } from "../config/Constant";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [tempImageList, setTempImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=28`
      )
      .then((response) => {
        setImageList(response.data);
        setTempImageList(response.data);
        setIsLoading(false); //set loading false after getting response
      });
  }, []);

  const searchImage = (query) => {
    if (query === "") {
      setImageList(tempImageList); //tempImageList contains initially fetched images used to display images when our query is empty or cleared
    } else {
      const filteredImageList = imageList.filter((image) => {
        image.alt_description =
          image.alt_description === null ? "react" : image.alt_description;
        return image.alt_description.includes(query); //if our query is found in image.alt_description, it returns true
      });
      setImageList(filteredImageList);
    }
  };
  return (
    <>
      <center style={{ padding: "20px 0px" }}>
        <input
          type="text"
          style={{
            height: "35px",
            width: "50%",
            paddingLeft: "5px",
            borderRadius: "10px",
          }}
          placeholder="Search Images.."
          onChange={(e) => searchImage(e.target.value)} //whenever the user types or deletes characters in the search input field, the onChange event is triggered, and it calls the searchImage function
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "15px 0px",
        }}
      >
        {imageList.length > 0
          ? imageList.map((image) => {
              return (
                <div
                  key={image.id}
                  style={{ padding: "10px", textAlign: "center" }}
                >
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    style={{
                      height: "250px",
                      width: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <br />
                  {image.alt_description
                    ? image.alt_description.substring(1, 20)
                    : "no alt_description"}
                </div>
              );
            })
          : isLoading
          ? "Loading..."
          : "No Images Found!!"}
      </div>
    </>
  );
};

export default App;
