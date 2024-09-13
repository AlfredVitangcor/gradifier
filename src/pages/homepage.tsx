import { useRef, useState } from "react";

export default function Homepage() {
  const [loading, setLoading] = useState(false);
  const [qr, setQR] = useState("");
  const dataRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const url = "https://api.api-ninjas.com/v1/qrcode?format=png";

  async function handleSearch() {
    try {
      setLoading(true);

      if (!dataRef.current || !colorRef.current) {
        throw Error("invalid input");
      }

      if (dataRef.current.value === "") {
        throw Error("invalid input");
      }

      const apikey = import.meta.env.VITE_API_KEY;
      const input = dataRef.current.value;
      const color = colorRef.current.value.replace("#", "");

      const response = await fetch(`${url}&data=${input}&fg_color=${color}`, {
        method: "GET",
        headers: {
          "X-Api-Key": apikey,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = await response.blob();
      const blob = URL.createObjectURL(data);
      setQR(blob);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!qr) {
      alert("Generate QR first");
      return;
    }

    const link = document.createElement("a");
    link.href = qr;
    link.download = "QR Code";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="h-screen w-screen pattern grid items-center">
      <div className="mx-auto max-w-90 bg-white p-4 rounded-md">
        <div className="mb-4">
          {loading ? (
            <h2>loading...</h2>
          ) : (
            <>
              <img
                src={qr}
                alt="qr image"
                className="outline outline-1 mx-auto min-w-40 aspect-square bg-gray-300"
              />
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleDownload}
                  className="bg-blue-400 p-1 rounded-md"
                >
                  download
                </button>
              </div>
            </>
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex gap-4">
            <label htmlFor="data">data</label>
            <input
              type="text"
              id="data"
              className="outline outline-1 p-2 rounded-sm"
              ref={dataRef}
              placeholder="enter data for qr"
              autoFocus
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="color">Color</label>
            <input type="color" id="color" ref={colorRef} />
          </div>
        </div>

        <div className="my-2 flex justify-end">
          <button onClick={handleSearch} className="bg-blue-400 p-2 rounded-sm">
            Generate QR
          </button>
        </div>
      </div>
    </div>
  );
}
