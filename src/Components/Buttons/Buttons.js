import React from 'react';
 
const Buttons = ({ onReset, onDownloadPDF, onDownloadExcel }) => {
  return (
    <div className="buttons">
      <button className="reset" onClick={onReset}>Sıfırla</button>
      <button className="pdf" onClick={onDownloadPDF}>PDF yüklə</button>
      <button className="excel" onClick={onDownloadExcel}>Excel kimi yüklə</button>
    </div>
  );
};

export default Buttons;
