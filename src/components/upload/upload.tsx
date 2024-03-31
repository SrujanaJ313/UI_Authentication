import { useState } from "react";
// import { contentData } from "../utils/mockApiData";
import Button from "@mui/material/Button";

// const content = JSON.parse(JSON.stringify(contentData));
// console.log("content::", content);

function Upload() {
  const [files, setFiles]: any = useState({});
  const onClickSaveToLaterNewHire = (event: any) => {
    const selectedFiles = { ...event.target.files };
    const uploadedFiles: any = {};
    for (const file in selectedFiles) {
      uploadedFiles[selectedFiles[file].name] = selectedFiles[file];
    }
    setFiles((prevState: any) => ({ ...prevState, ...uploadedFiles }));
  };

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        Upload
        <input
          type="file"
          multiple
          hidden
          onChange={onClickSaveToLaterNewHire}
        />
      </Button>
      {!!Object.keys(files).length &&
        Object.values(files)?.map((file: any) => (
          <div key={file.name}>
            {file.name} {Math.round(file.size / 1024)} KB
          </div>
        ))}
    </div>
  );
}

export default Upload;
