import React from "react";

const SaveData = () => {
  const [file, setFile] = React.useState(null);
  const [text, setText] = React.useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const responce = await fetch("http://localhost:3000/pdf/upload-pdf", {
      method: "POST",
      body: formData,
    });
    if (!responce.ok) {
      alert("Failed to upload PDF");
      return;
    }
    const data = await responce.json();
    alert(data.message);
  };

  const handleSaveText = async () => {
    try {
      console.log("Sending text:", text);

      const response = await fetch("http://localhost:3000/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log("Response status:", response.status);

      const raw = await response.text();
      console.log("Raw response:", raw);

      const data = JSON.parse(raw);

      alert(data.message);
    } catch (err) {
      console.error("Frontend error:", err);
    }
    setText("");
  };

  return (
    <>
      <div className="w-full p-20 bg-mauve-900 flex items-center justify-center gap-20">
        <div className="w-1/3 h-fit bg-slate-900 p-10 rounded-lg shadow-lg ">
          <h1 className="text-white text-xl font-bold text-center">
            Upload your PDF.....
          </h1>
          <p className="text-gray-300 text-center mt-4">
            Please select a PDF file to upload
          </p>
          <div className="flex items-center justify-center mt-6"></div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
          >
            Choose File
          </label>
          {file && <p className="text-white mt-2 text-center">{file.name}</p>}
          <div
            className="mt-6 w-1/5 text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleUpload}
          >
            Upload
          </div>
        </div>
        <div className="w-1/3 h-fit bg-slate-900 p-10 rounded-lg shadow-lg ">
          <h2 className="text-white text-lg font-semibold text-center">
            Or write your own text
          </h2>

          <textarea
            className="w-full mt-4 p-3 rounded bg-gray-800 text-white outline-none"
            rows={4}
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleSaveText}
            className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Save Text
          </button>
        </div>
      </div>
    </>
  );
};

export default SaveData;
