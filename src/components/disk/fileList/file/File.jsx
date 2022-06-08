import React from 'react';
import './File.sass';
import dirLogo from '../../../../assets/images/folder.svg';
import fileLogo from '../../../../assets/images/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import downloadLogo from '../../../../assets/images/download.svg';
import deleteLogo from '../../../../assets/images/delete.svg';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.app.view);

  const openDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteFileHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  if (fileView === 'list') {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt="file"
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        {file.type !== 'dir' && (
          <button className="btn download__btn" onClick={downloadClickHandler}>
            <img src={downloadLogo} alt="download" />
          </button>
        )}
        <button className="btn delete__btn" onClick={deleteFileHandler}>
          <img src={deleteLogo} alt="delete" />
        </button>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt="file"
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button
              className="btn download__btn"
              onClick={downloadClickHandler}
            >
              <img src={downloadLogo} alt="download" />
            </button>
          )}
          <button className="btn delete__btn" onClick={deleteFileHandler}>
            <img src={deleteLogo} alt="delete" />
          </button>
        </div>
      </div>
    );
  }
};

export default File;
