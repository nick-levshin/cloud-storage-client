import React from 'react';
import './Uploader.sass';
import UploadFile from './uploadFile/UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();

  return (
    isVisible &&
    files.length && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Loading</div>
          <button
            className="uploader__close"
            onClick={() => dispatch(hideUploader())}
          >
            &times;
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
