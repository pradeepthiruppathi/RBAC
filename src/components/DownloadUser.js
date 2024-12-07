import React from 'react';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Import the XLSX library

const DownloadUser = ({ users }) => {
  const handleDownload = () => {
    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(users); // Convert users data to sheet format
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Create a file and trigger the download
    XLSX.writeFile(wb, 'user_data.xlsx');
  };

  return (
    <button className="download-btn" onClick={handleDownload}>
      <FaDownload /> Download Data
    </button>
  );
};

export default DownloadUser;
