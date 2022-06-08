import React from 'react';
import './FileList.sass';
import { useSelector } from 'react-redux';
import File from './file/File';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.app.view);

  if (!files.length) {
    return <div className="empty">Folder is empty</div>;
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames="file"
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  } else if (fileView === 'plate') {
    return (
      <div className="fileplate">
        {files.map((file) => (
          <File file={file} key={file._id} />
        ))}
      </div>
    );
  }
};

export default FileList;
