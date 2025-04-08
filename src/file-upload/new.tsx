import React, { useEffect, useRef, useState } from 'react';
import type { FileUploadConfig } from './types';

interface FileUploadProps {
  config: FileUploadConfig;
  onUpload?: (files: File[]) => void;
}

const FileUploadd: React.FC<FileUploadProps> = ({ config, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileList = Array.from(files);

    // Limit files
    const limitedFiles = config.fileLimit
      ? fileList.slice(0, config.fileLimit)
      : fileList;

    // File type filtering
    const filteredFiles = config.fileAcceptTypes
      ? limitedFiles.filter((file) =>
          config.fileAcceptTypes?.some((type) =>
            file.name.toLowerCase().endsWith(type)
          )
        )
      : limitedFiles;

    setSelectedFiles(filteredFiles);
    if (onUpload) onUpload(filteredFiles);
  };

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept={config.fileAcceptTypes?.join(',')}
        multiple={config.allowMultipleSelection}
      />
      {previewUrls.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {previewUrls.map((url, index) => (
            <div key={index}>
              {config.isImage ? (
                <img src={url} alt={`preview-${index}`} width={100} />
              ) : (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  View File {index + 1}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadd;
