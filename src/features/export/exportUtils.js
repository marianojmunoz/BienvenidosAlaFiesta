import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename, sheetName, transformData) => {
    if (!data || data.length === 0) {
        return;
    }

    const formattedData = transformData ? transformData(data) : data;

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');

    // Auto-size columns
    const objectMaxLength = Object.keys(formattedData[0] || {}).map(key => ({
        wch: Math.max(
            key.length,
            ...formattedData.map(g => (g[key] || '').toString().length)
        )
    }));
    worksheet['!cols'] = objectMaxLength;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
};