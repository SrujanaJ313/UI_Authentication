import { useState, useRef } from "react";
import Button from "@mui/material/Button";

function Upload({ button }: any) {
  const [files, setFiles]: any = useState([]);
  const [errors, setErrors]: any = useState("");
  let fileInput: any = useRef(null);

  const getCurrentDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  console.log(getCurrentDate());

  const getCurrentEasternTime = () => {
    const options: any = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    };
    const easternTime = new Date().toLocaleString("en-US", options);
    return easternTime;
  };
  console.log(getCurrentEasternTime());

  const validateSelectedFile = (selectedFile: any) => {
    console.log("selectedFile::::", selectedFile);

    if (!selectedFile) {
      setErrors("No File chosen");
      return;
    }
    const fileExtensions: string[] = ["pdf", "xlsx", "txt"];
    const fileSize: number = Math.round(selectedFile.size / 1024);
    const fileType: string = selectedFile.name.split(".");

    //check the type extension of File and throw Error if it not in expected extension
    if (!fileExtensions.includes(fileType[1])) {
      setErrors("unsupported file format");
      return false;
    }

    //check the size of File and throw Error if exceeds 5MB
    if (fileSize > 5000) {
      setErrors("File Size is more than 5MB");
      return false;
    }
    return true;
  };

  const onClickSaveToLaterNewHire = (event: any) => {
    const selectedFile: any = event.target.files[0];
    // console.log("onClickSaveToLaterNewHire:::", selectedFile);
    const isValidFile: boolean = validateSelectedFile(selectedFile);
    // console.log("isValid:::", isValidFile);

    if (!isValidFile) {
      return;
    }

    setErrors("");
    const uploadedFiles: any = [...files];
    uploadedFiles.push(selectedFile);
    setFiles(uploadedFiles);
  };

  const deleteFile = (fileName: string) => {
    const tempFiles: any = [...files];
    const filteredFiles: any = tempFiles?.filter(
      (tFile: any) => tFile.name !== fileName
    );
    setFiles(filteredFiles);
  };
  const callbak = {
    onClickSaveToLaterNewHire,
  };

  return (
    <div>
      <input
        type="file"
        hidden
        onChange={callbak[button.onClickCallback]}
        ref={(fp: any) => {
          fileInput = fp;
        }}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={() => fileInput.click()}
        disabled={files.length === 2}
      >
        {button.text}
      </Button>
      {!!files?.length &&
        files?.map((file: any) => (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            key={file.name}
          >
            <div>
              {file.name} {Math.round(file.size / 1024)} KB
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => deleteFile(file.name)}
            >
              delete
            </div>
          </div>
        ))}
      {errors && <p>{errors}</p>}
      <hr />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // onClick={}
      >
        Submit
      </Button>
      <h1>
        {getCurrentDate()} at {getCurrentEasternTime()}
      </h1>
    </div>
  );
}

export default Upload;
