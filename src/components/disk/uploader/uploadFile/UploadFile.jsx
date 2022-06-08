import React from 'react';
import { useDispatch } from 'react-redux';
import './UploadFile.sass';
import { removeUploadFile } from '../../../../reducers/uploadReducer';

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <button
          className="upload-file__close"
          onClick={() => dispatch(removeUploadFile(file.id))}
        >
          &times;
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: `${file.progress}%` }}
        ></div>
        <div className="upload-file__percent">{Math.trunc(file.progress)}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
