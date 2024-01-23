import React from 'react';

interface FileProps {
    jsonUrl:string;
    fileName:string;
    classes:string;
}
const DownloadJsonButton = (props:FileProps) => {
    const { jsonUrl, fileName, classes } = props;
    const downloadJsonFile = async () => {
        try {
            const response = await fetch(jsonUrl);

            if (!response.ok) {
                throw new Error(`Failed to download JSON file: ${response.statusText}`);
            }

            const jsonData = await response.json();

            // Convert JSON object to string
            const jsonString = JSON.stringify(jsonData, null, 2);

            // Create a Blob with the JSON data
            const blob = new Blob([jsonString], { type: 'application/json' });

            // Create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName || 'content.json';

            // Append the link to the document and trigger the click event
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading JSON file:', error);
        }
    };

    return (
        <button className={`${classes}`} type="button" onClick={downloadJsonFile}>
            Download JSON
        </button>
    );
};

export default DownloadJsonButton;
