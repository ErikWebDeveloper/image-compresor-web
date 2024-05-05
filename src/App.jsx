import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [files, setFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [filesCompressed, setFilesCompressed] = useState([]);
  const [imageFilesCompressed, setImageFilesCompressed] = useState([]);

  const [amountCompress, setAmountCompress] = useState(50);
  const [maxWidth, setMaxWidth] = useState(500);


  const handleUploads = (event) => {
    const filesInput = event.target.files;
    const urlsImagenes = [];
    for (let i = 0; i < filesInput.length; i++) {
      const archivo = filesInput[i];
      const lector = new FileReader();

      lector.onload = (e) => {
        // Cuando se completa la lectura, almacenar la URL de datos de la imagen
        urlsImagenes.push(e.target.result);

        // Si es el último archivo, actualiza el estado
        if (urlsImagenes.length === filesInput.length) {
          setImageFiles(urlsImagenes);
        }
      };

      // Leer el archivo como una URL de datos
      lector.readAsDataURL(archivo);
    }
    setFiles(Array.from(filesInput));
  };

  const handleCompress = async () => {
    compressImages();
  };

  const compressImages = async () => {
    // Crea un array para almacenar las imágenes comprimidas
    const nuevasImagenesComprimidas = [];

    // Procesa cada imagen original
    for (const base64Imagen of imageFiles) {
      // Crea una promesa para comprimir la imagen
      const imagenComprimida = await new Promise((resolve, reject) => {
        // Crea un elemento de imagen
        const img = new Image();

        img.onload = function () {
          // Crea un lienzo para comprimir la imagen
          const canvas = document.createElement("canvas");
          const contexto = canvas.getContext("2d");

          // Determina el nuevo tamaño de la imagen
          const maxAncho = maxWidth;
          let ancho = img.width;
          let alto = img.height;

          if (ancho > maxAncho) {
            const factorEscalado = maxAncho / ancho;
            ancho = maxAncho;
            alto *= factorEscalado;
          }

          // Configura el tamaño del lienzo
          canvas.width = ancho;
          canvas.height = alto;

          // Dibuja la imagen comprimida en el lienzo
          contexto.drawImage(img, 0, 0, ancho, alto);

          // Exporta la imagen comprimida como una URL de datos
          const imagenComprimida = canvas.toDataURL("image/jpeg", amountCompress);

          // Devuelve la imagen comprimida
          resolve(imagenComprimida);
        };

        // Configura la fuente de la imagen como la base64 original
        img.src = base64Imagen;
      });

      // Agrega la imagen comprimida al array
      nuevasImagenesComprimidas.push(imagenComprimida);
    }

    // Actualiza el estado `imagenesComprimidas` con las imágenes comprimidas
    setImageFilesCompressed(nuevasImagenesComprimidas);
  };

  const calculateBytesOfCompression = (compressedImage) => {
    const bytes = Math.round((compressedImage.length * 3) / 4);
    return bytesToKBytes(bytes);
  };

  const handleItemOperation = (event) => {
    const operation = event.target.getAttribute("operation");
    const itemIndex = parseInt(event.target.getAttribute("state-index"));
    //console.log({ operation: operation, item: itemIndex });

    switch (operation) {
      case "delete":
        deleteItem(itemIndex);
        break;
      case "download":
        break;
    }
  };

  const deleteItem = (itemIndex) => {
    const updatedItemsList = files.filter((_, i) => i !== itemIndex);
    const updatedImagesList = imageFiles.filter((_, i) => i !== itemIndex);

    setFiles(updatedItemsList);
    setImageFiles(updatedImagesList);
  };

  const bytesToKBytes = (bytesValue) =>{
    return parseFloat(bytesValue / 1000).toFixed(2);
  }

  const handleRefresh = () =>{
    const defaultValue = [];
    setFiles(defaultValue);
    setImageFiles(defaultValue);
    setFilesCompressed(defaultValue);
    setImageFilesCompressed(defaultValue);
  }

  useEffect(() => {
    //console.log(files);
    //console.log(imageFiles);
    //console.log(imageFilesCompressed);
  }, [files, imageFiles, imageFiles]);

  return (
    <>
      <div className="container m-auto mt-5">
        <div className="mb-3 text-center">
          <h5 className="form-label fs-3 p-1">👇 Upload your images 👇</h5>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleUploads}
            multiple
          />
        </div>
        <div className="my-5">
          <h5 className="fs-3 text-center">🤯 Set compression 🤯</h5>
          <div className="row mb-2  m-auto">
            <div className="col">
              <label htmlFor="">Amount</label>
            </div>
            <div className="col-3">
              <label htmlFor="">Max Width</label>
            </div>
          </div>
          <div className="row m-auto">
            <div className="col d-flex align-items-center border rounded m-0">
              <input
                className="col-10"
                type="range"
                id="slider"
                min="0"
                max="100"
                step="10"
                value={amountCompress}
                onChange={() => setAmountCompress(event.target.value)}
              />
              <span className="col-2 text-center">{amountCompress} %</span>
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="..."
                aria-label="..."
                value={maxWidth}
                onChange={() => setMaxWidth(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="border rounded"
          style={{ height: "30vh", overflow: "scroll" }}
        >
          {files.length > 0 &&
            files.map((file, index) => (
              <ImageItem
                key={`item-${index}`}
                name={file.name}
                size={bytesToKBytes(file.size)}
                src={imageFiles[index]}
                operator={"🗑️"}
                operation="delete"
                itemIndex={index}
                clickOperationHandler={handleItemOperation}
              />
            ))}
        </div>
        <div className="container m-auto p-3 text-center">
          <button
            className="btn btn-outline-warning w-50"
            onClick={handleCompress}
          >
            ⚡ Compress
          </button>
        </div>
        <div
          className="border rounded"
          style={{ height: "30vh", overflow: "scroll" }}
        >
          {imageFilesCompressed.length > 0 &&
            imageFilesCompressed.map((file, index) => (
              <ImageItem
                key={`itemCompressed-${index}`}
                name={files[index].name}
                size={calculateBytesOfCompression(imageFilesCompressed[index])}
                src={imageFilesCompressed[index]}
                operator={"☁️"}
                operation="download"
                clickOperationHandler={handleItemOperation}
              />
            ))}
        </div>
        <div className="d-flex gap-3 py-3">
          <button className="btn btn-outline-primary flex-fill">
            ☁️ Download All
          </button>
          <button
            className="btn btn-outline-danger flex-fill"
            onClick={handleRefresh}
          >
            ↻ Refresh
          </button>
        </div>
      </div>
    </>
  );
}

function ImageItem({
  name,
  size,
  src,
  operator,
  operation,
  itemIndex,
  clickOperationHandler,
}) {
  return (
    <>
      <div className="row p-3 border m-auto rounded">
        <img className="col col-1 img-fluid" src={src} />
        <p className="col col-7 m-0 p-0">{name}</p>
        <p className="col col-3 m-0 p-0">{size} KBs</p>
        <p
          className="col col-1 m-0 p-0"
          style={{ cursor: "pointer" }}
          operation={operation}
          state-index={itemIndex}
          onClick={() => clickOperationHandler(event)}
        >
          {operator}
        </p>
      </div>
    </>
  );
}

export default App;
