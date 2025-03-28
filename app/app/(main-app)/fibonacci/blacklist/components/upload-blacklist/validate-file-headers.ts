import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const REQUIRED_HEADERS = ['customer', 'device', 'sender', 'receiver'];
// type RequiredHeader = typeof REQUIRED_HEADERS[number];

interface ValidationResult {
    isValid: boolean;
    missingHeaders: typeof REQUIRED_HEADERS;
    recordCount: number;
    error?: string;
}

export const validateFileHeaders = async (file: File): Promise<ValidationResult> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    try {
        // Handle XLSX files
        if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, {
                type: 'array',
                cellDates: true,
                cellNF: true,
            });

            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert to JSON to easily process headers
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonData.length === 0) {
                return {
                    isValid: false,
                    missingHeaders: REQUIRED_HEADERS,
                    recordCount: 0,
                    error: 'File is empty'
                };
            }

            // Get headers from first row and normalize them
            const headers = (jsonData[0] as string[]).map(header =>
                header.toLowerCase().trim()
            );

            const missingHeaders = REQUIRED_HEADERS.filter(
                required => !headers.includes(required)
            );

            if (missingHeaders?.length) {
                return {
                    isValid: false,
                    missingHeaders: REQUIRED_HEADERS,
                    recordCount: 0,
                    error: `The following required headers are missing: ${missingHeaders.join(', ')}. Please ensure all headers are included and try again.`
                };
            }

            return {
                isValid: missingHeaders.length === 0,
                missingHeaders, // Cast to match expected type
                recordCount: Math.max(0, jsonData.length - 1) // Subtract 1 for header row
            };
        }
        // Handle CSV files
        if (fileExtension === 'csv') {
            return new Promise((resolve) => {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (results.errors && results.errors.length > 0) {
                            resolve({
                                isValid: false,
                                missingHeaders: REQUIRED_HEADERS,
                                recordCount: 0,
                                error: `Error parsing ${file.name}`
                            });
                            return;
                        }

                        if (results.data.length === 0) {
                            resolve({
                                isValid: false,
                                missingHeaders: REQUIRED_HEADERS,
                                recordCount: 0,
                                error: 'File is empty'
                            });
                            return;
                        }
                        // Get headers from the first row
                        const headers = Object.keys(results.data[0] as object).map(header =>
                            header.toLowerCase().trim()
                        );

                        const missingHeaders = REQUIRED_HEADERS.filter(
                            required => !headers.includes(required)
                        );

                        if (missingHeaders.length) {
                            resolve({
                                isValid: false,
                                missingHeaders,
                                recordCount: results.data.length,
                                error: `The following required headers are missing: ${missingHeaders.join(', ')}. Please ensure all headers are included and try again.`
                            });
                            return;
                        }

                        resolve({
                            isValid: missingHeaders.length === 0,
                            missingHeaders,
                            recordCount: results.data.length
                        });
                    },
                    error: (error) => {
                        resolve({
                            isValid: false,
                            missingHeaders: REQUIRED_HEADERS,
                            recordCount: 0,
                            error: error.message
                        });
                    }
                });
            });
        }

        return {
            isValid: false,
            missingHeaders: REQUIRED_HEADERS,
            recordCount: 0,
            error: 'File type not supported. Upload CSV/XLSX file format and download the template below as a guide.'
        };

    } catch {
        return {
            isValid: false,
            missingHeaders: REQUIRED_HEADERS,
            recordCount: 0,
            error: 'Error processing file'
        };
    }
};

