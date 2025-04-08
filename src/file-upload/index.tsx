import { Button, Flex, Form, message, Progress, Typography, Upload, UploadProps } from "antd";
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { FileUploadConfig } from "./types";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile, UploadFile } from "antd/lib/upload";
import { v4 as uuidV4 } from "uuid";
import { last } from "lodash";
import Dragger from "antd/es/upload/Dragger";
import { UploadIconModal } from "./icons";

interface FileUploadProps {
  oldFileInfoList?: UploadFile[];
  setNewFileInfoList: React.Dispatch<React.SetStateAction<UploadFile[]>>;

  storage: FirebaseStorage;
  fileConfig: FileUploadConfig;
}

const FileUpload: React.FC<FileUploadProps> = ({
  oldFileInfoList,
  setNewFileInfoList,

  storage,
  fileConfig,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>(
    {}
  );

  const initialFilesUpload = useRef(false);
  const imageFormats = fileConfig?.fileAcceptTypes;
  const maxCount = fileConfig?.fileLimit || 5;
  const folderName = fileConfig?.folderName;

  useEffect(() => {
    if (initialFilesUpload.current) return;
    initialFilesUpload.current = true; // Mark as loaded

    const loadFiles = async () => {
      const getFilesWithUrl: UploadFile[] = await Promise.all(
          (oldFileInfoList ?? []).map(async (fileInfo) => {
          const storageRef = ref(storage, fileInfo?.fileName || '');
          return {
            ...fileInfo,
            url: await getDownloadURL(storageRef),
          };
        })
      );
      setFileList(getFilesWithUrl);
    };

    loadFiles();
  }, [oldFileInfoList, storage]);

  useEffect(() => {
    setNewFileInfoList(fileList);
  }, [fileList, setNewFileInfoList]);

  const onUpload: UploadProps["customRequest"] = (
    options: UploadRequestOption
  ) => {
    const file = options.file as RcFile;
    const ext = last(file.name.split("."));
    const uid = uuidV4();
    const filePath = `CRMM/${folderName}/${uid}/${ext}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prev) => ({ ...prev, [uid]: progress }));
      },
      options.onError,
      async () => {
        options.onSuccess?.(null);
        const url = await getDownloadURL(storageRef);
        setFileList((prev) => [
          ...prev,
          {
            uid: uid,
            name: file.name,
            fileName: filePath,
            url: url,
            type: file.type,
            size: file.size,
          },
        ]);
        setUploadingFiles((prev) => ({ ...prev, [uid]: false }));
      }
    );
  };

  const beforeUpload = (file: RcFile, newFiles: RcFile[]) => {
    const totalFiles = fileList.length + newFiles.length;

    const ext = last(file.name.split("."));
    if (!imageFormats?.includes("." + ext)) {
      message.error(`Invalid format. Only ${imageFormats} allowed`);
      return false;
    }

    if (totalFiles > (maxCount || 0)) {
      message.destroy();
      message.error("You can upload only upto 5 files");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const isUploading = Object.values(uploadingFiles).some(
    (uploading) => uploading
  );

  const onRemoveFile = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };
  return (
    <>

    <Upload
      customRequest={onUpload}
      fileList={fileList}
      listType="picture-card"
      onRemove={(file) => {
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
      }}
      beforeUpload={beforeUpload}
      showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
    >
      {!isUploading && fileList.length < maxCount ? (
        <div>+ Upload</div>
      ) : null}
    </Upload>
  </>
);
};

export { FileUpload };
