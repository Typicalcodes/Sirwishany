import React, { useState } from "react";
const Categoryadd = () => {
  const [image, setImage] = useState(null);
  const [imgsrc, setImgsrc] = useState(null);
  
  const [name, setName] = useState("Carpenter");
  const [choices,setChoices]=useState(["AC","WashingMachine"])
  const [includes, setIncludes] = useState(["Fiting of Bulbs,Switches,Fans and Other common electric appliances.","Fixing of Bulbs, Swithes, Fans etc", "Fiting of TV, Coolar etc"]);
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
    for (let i =0; i < choices.length; i++){
      formData.append('choices[]', choices[i]);
    }
    formData.append("image", image, "image.jpg");
    //console.log(name, Includes);
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



const [svg, setSvg] = useState(null);
const [cname, setCName] = useState("Washing Machine");
const [svgu,setSvgu] = useState(null);
const handlesvg = async ()=>{
  setSvgu(await URL.createObjectURL(svg))
  setSvg(await dataURLtoBlob(svgu))
}

const handleUpload = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('svg', svg);
  formData.append('name', cname);

  const response = await fetch('http://localhost:3000/choice/svg', {
    method: 'POST', 
    applicationType: JSON,
    body: formData,
  });
  //console.log(svg)
  if (!response.ok) {
    throw new Error(`Error uploading SVG file: ${response.status}`);
  }

  const result = await response.text();
  //console.log(result); // "SVG file saved to database"
};

const handleSvgChange = (event) => {
  const file = event.target.files[0];
  setSvg(file)
};
const setprofile = async () => {
  const response = await fetch("http://localhost:3000/user/login",{
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  const json = await response.json();
  //console.log(json)
  
  // //console.log(user);
};
  return (
    <>
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
      <img src={imgsrc} alt="o not" />
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
    <div>
    <form >
        <input type="file" name="svg" accept="image/*" onChange={handleSvgChange} />
        <button type="submit" onClick={handleUpload}>Upload</button>
      </form>
    
    <button style={{
          background: "black",
          color: "white",
          fontSize: "19px",
          borderStyle: "solid",
          border: "3px dotted #5E899E",
          padding: "3px",
          borderRadius: "10px",
        }} onClick={handlesvg}>Click Me</button>
    </div>
    <button  onClick={()=>{setprofile()}}>Second Request</button>
    </>
  );
};

export default Categoryadd;
