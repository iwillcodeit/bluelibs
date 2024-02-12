import * as React from "react";
import { Collection, use, useData } from "@redlibs/x-ui";
import { UploadProps, Upload, Button } from "antd";
import { ObjectId } from "@redlibs/ejson";
import { UploadOutlined } from "@ant-design/icons";
import { XUploader, AppFile } from "../uploads/XUploader";
import { useState, useEffect } from "react";
import { UploadFile } from "antd/lib/upload/interface";

export type AdminFileUploadProps = UploadProps<any> & {
  value?: ObjectId;
  field: string;
};

export function AdminFileUpload(props: AdminFileUploadProps) {
  let { field, onChange: onFieldChange, value, ...rest } = props;
  const [currentAppFile, setCurrentAppFile] = useState<UploadFile>(null);
  const uploader = use(XUploader);

  useEffect(() => {
    if (value) {
      uploader
        .getUploadFile(value)
        .then((uploadFile) => setCurrentAppFile(uploadFile));
    }
  }, []);

  const uploadProps: UploadProps = {
    ...rest,
    name: field,
    maxCount: 1,
    async onChange({ file }) {
      const { status } = file;

      if (status === "uploading") {
        setCurrentAppFile(file);
      }

      if (status === "done") {
        setCurrentAppFile(file);
      }

      if (status === "removed") {
        setCurrentAppFile(null);
      }
    },

    async customRequest(options) {
      // const { originFileObj: file } = currentFile;

      const appFile = await uploader.uploadFile(options.file as File);
      const uploadFile = uploader.transformToUploadFile(appFile);

      setCurrentAppFile(uploadFile);
      // @ts-ignore
      onFieldChange(appFile._id);

      options.onSuccess("ok", null);
    },

    async onRemove(file) {
      await uploader.appFilesCollection.deleteOne(file.uid);
      setCurrentAppFile(null);
    },

    fileList: currentAppFile ? [currentAppFile] : [],
  };

  return (
    <Upload {...uploadProps}>
      {!currentAppFile && (
        <Button icon={<UploadOutlined />}>Click to upload file</Button>
      )}
    </Upload>
  );
}
