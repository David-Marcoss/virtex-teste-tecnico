import * as path from 'path';
import * as fs from 'fs';

export const deleteFileOnServer = async (file: string) => {
  const filePath = path.resolve(__dirname, '../../../', file);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
        return;
      }
      console.log(`File deleted: ${filePath}`);
    });
  }
};
