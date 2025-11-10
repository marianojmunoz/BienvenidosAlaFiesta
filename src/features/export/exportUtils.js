import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename, sheetName, transformData, title, summary) => {
    if (!data || data.length === 0) {
        return;
    }

    const formattedData = transformData ? transformData(data) : data;

    const finalData = [];

    // 1. Add Title
    if (title) {
        finalData.push([title]);
        finalData.push([]); // Add a blank row for spacing
    }

    // 2. Add Headers from formatted data
    const headers = Object.keys(formattedData[0] || {});
    finalData.push(headers);

    // 3. Add Data Rows
    formattedData.forEach(item => {
        finalData.push(headers.map(header => item[header]));
    });

    // 4. Add Summary
    if (summary) {
        finalData.push([]); // Add a blank row for spacing
        Object.entries(summary).forEach(([key, value]) => {
            finalData.push([key, value]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');

    XLSX.writeFile(workbook, `${filename}.xlsx`);
};