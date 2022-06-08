import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, searchFiles } from '../../actions/file';
import FileList from './fileList/FileList';
import './Disk.sass';
import Popup from './Popup';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import { uploadFile } from '../../actions/file';
import backLogo from '../../assets/images/back.svg';
import selectIcon from '../../assets/images/select.svg';
import Uploader from './uploader/Uploader';
import MyLoader from '../UI/loader/MyLoader';
import { showLoader, setView } from '../../reducers/appReducer';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const diskStack = useSelector((state) => state.files.diskStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'));
  };

  const backClickHandler = () => {
    const backDir = diskStack.pop();
    dispatch(setCurrentDir(backDir));
  };

  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    setDragEnter(false);
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const searchHandler = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    dispatch(showLoader());
    if (e.target.value) {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      <div className="disk__btns">
        <div className="disk__left">
          {currentDir && (
            <button
              className="btn"
              onClick={() => backClickHandler()}
              disabled={loader}
            >
              <img src={backLogo} alt="back" />
            </button>
          )}
          <button
            className="disk__create"
            onClick={() => showPopupHandler()}
            disabled={loader}
          >
            Create folder
          </button>
          <div className="disk__upload">
            <label htmlFor="disk__upload-input" className="disk__upload-label">
              Upload File
            </label>
            <input
              type="file"
              id="disk__upload-input"
              className="disk__upload-input"
              onChange={(e) => fileUploadHandler(e)}
              multiple={true}
              disabled={loader}
            />
          </div>
        </div>
        <div className="disk__right">
          <img src={selectIcon} alt="select" className="disk__right-icon" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="disk__select"
            disabled={loader}
          >
            <option value="name">By name</option>
            <option value="type">By type</option>
            <option value="date">By date</option>
            <option value="size">By size</option>
          </select>
          <input
            value={searchName}
            onChange={searchHandler}
            type="text"
            className="disk__search"
            placeholder="File name"
          />
          <div
            className="disk__plate"
            onClick={() => dispatch(setView('plate'))}
          ></div>
          <div
            className="disk__list"
            onClick={() => dispatch(setView('list'))}
          ></div>
        </div>
      </div>
      {loader ? (
        <MyLoader />
      ) : (
        <>
          <FileList />
          <Popup />
          <Uploader />
        </>
      )}
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      Drop files here
    </div>
  );
};

export default Disk;
