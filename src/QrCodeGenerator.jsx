import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
import './style.css';
function QrCodeGenerator() {
    const [boxInfo, setBoxInfo] = useState({
        boxId: "",
        content: "",
        weight: ""
    });
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const [qrUrl, setQrUrl] = useState("");

    const qrCodeRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoxInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generateQRCode();
    };

    const generateQRCode = () => {
        const url = `https://example.com/box/${boxInfo.boxId}/content/${boxInfo.content}/weight/${boxInfo.weight}`;
        setQrUrl(url);
        setQrIsVisible(true);
    };

    const downloadQRCode = () => {
        htmlToImage
            .toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "qr-code.png";
                link.click();
            })
            .catch(function (error) {
                console.error("Error generating QR code:", error);
            });
    };


    return (

            <div className="card">
                <h2 className="title">QR Code Generator</h2>
                <div className="form-group">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="boxId">Box ID:</label>
                            <input type="text" id="boxId" name="boxId" value={boxInfo.boxId} onChange={handleChange} required placeholder="Enter Box ID" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="content">Content:</label>
                            <input type="text" id="content" name="content" value={boxInfo.content} onChange={handleChange} required placeholder="Enter Content" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="weight">Weight:</label>
                            <input type="text" id="weight" name="weight" value={boxInfo.weight} onChange={handleChange} required placeholder="Enter Weight" className="input-field" />
                        </div>
                        <button type="submit" className="submit-button">Generate QR Code</button>
                    </form>
                </div>

                {qrIsVisible && (
                    <div className="qr-section">
                        <h3>Generated QR Code</h3>
                        <div ref={qrCodeRef}>
                            <QRCode value={qrUrl} size={256}/>
                        </div>
                        <button onClick={downloadQRCode} className="qr-button">Download QR Code</button>

                    </div>
                )}
            </div>

    );

}

export default QrCodeGenerator;
