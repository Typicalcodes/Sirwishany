import React, { useState } from "react";
const Categoryadd = () => {
  const [image, setImage] = useState(null);
  const [imgsrc, setImgsrc] = useState(null);
  const [name, setName] = useState("Electrician");
  const [includes, setIncludes] = useState([]);
  const handleImageSelect = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  const handleimgsubmit = async () => {
    setImgsrc(await URL.createObjectURL(image));
    setImage(await dataURLtoBlob(imgsrc));
    setIncludes(["Fiting of Bulbs,Switches,Fans and Other common electric appliances.","Fixing of Bulbs, Swithes, Fans etc", "Fiting of TV, Coolar etc"])
  };
  const handleCreateUser = async (name, image, Includes) => {
    const formData = new FormData();
   
    formData.append("name", name);
    for (let i = 0; i < Includes.length; i++) {
      formData.append('Includes[]', Includes[i]);
    }

    formData.append("image", image, "image.jpg");
    console.log(name, Includes);
    await fetch(`http://localhost:3000/cat/categoryAdd`, {
      method: "POST",
      applicationType: JSON,
      body: formData,
    });
  };
const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
};
  return (
    <div className="flex flex-col text-left content-start items-start">
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      <button
        style={{
          background: "black",
          color: "white",
          fontSize: "19px",
          borderStyle: "solid",
          border: "3px dotted #5E899E",
          padding: "3px",
          borderRadius: "10px",
        }}
        onClick={handleimgsubmit}
      >
        Select Image
      </button>
      <img src={imgsrc} />
      <button
        style={{
          background: "black",
          color: "white",
          fontSize: "19px",
          borderStyle: "solid",
          border: "3px dotted #5E899E",
          padding: "3px",
          borderRadius: "10px",
        }}
        onClick={()=>{handleCreateUser(name,image,includes)}}
        alt="No Image Selected"
      >
        Select Data
      </button>
    </div>
  );
};

export default Categoryadd;
