export enum FirebaseBucket {
    Bucket_1 = " "
}

export type FileUploadFoldername = "profile"|"contact"|"user"

export interface FileUploadConfig {
    bucketName?: FirebaseBucket;
    folderName: FileUploadFoldername;
    fileLimit?: number;
    fileAcceptTypes?: string[];
    allowMultipleSelection?: boolean; //not working now because of file crop
    imageCropRatio?: number;
    isImage?: boolean;
    isOtherFile?: boolean;
    isVideo?: boolean;
    fileSize?: number;
    errorMessage?: string;
  }

  export const fileUploadProfileConfig: FileUploadConfig = {
    fileLimit: 5,
    folderName: 'profile',
    fileAcceptTypes: [
      '.jpg',
      '.jpeg',
      '.png',
      '.pdf',
      '.docx',
      '.xls',
      '.csv',
      '.xlsx',
    ],
    imageCropRatio: 1 / 1,
    fileSize: 10,
    isImage: true,
  };
  
  export const fileUploadContactConfig: FileUploadConfig = {
    fileLimit: 5,
    folderName: 'contact',
    fileAcceptTypes: [
      '.jpg',
      '.jpeg',
      '.png',
      '.pdf',
      '.docx',
      '.xls',
      '.csv',
      '.xlsx',
    ],
    imageCropRatio: 1 / 1,
    fileSize: 10,
    isImage: true,
  };

  export const fileUploadUserConfig: FileUploadConfig = {
    fileLimit: 5,
    folderName: 'user',
    fileAcceptTypes: [
      '.jpg',
      '.jpeg',
      '.png',
      '.pdf',
      '.docx',
      '.xls',
      '.csv',
      '.xlsx',
    ],
    imageCropRatio: 1 / 1,
    fileSize: 10,
    isImage: true,
  };