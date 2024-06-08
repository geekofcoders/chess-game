import React, { FC } from 'react';
import './Files.css';
import { getCharacter } from '../../../helper';

interface FilesProps {
  files: number[];
}

const Files: FC<FilesProps> = ({ files }) => (
  <div className="files">
    {files.map((file) => (
      <span key={file}>{getCharacter(file)}</span>
    ))}
  </div>
);

export default Files;