const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

function saveFile(content) {
  const saveOptions = {
    title: '저장할 위치를 지정하세요',
    defaultPath: path.join(__dirname, '../data/default.txt'),
    buttonLabel: '저장',
    filters: [
      {
        name: '텍스트',
        extensions: ['txt', 'docx'],
      }
    ],
    properties: []
  };

  dialog.showSaveDialog(saveOptions)
    .then(file => {
      if (!file.canceled) {
        console.log(`File is saved at: ${file.filePath.toString()}`);

        fs.writeFile(file.filePath.toString(), content, err => {
          if (err) throw err;
          console.log(`Content is successfully saved: ${content}`);
        })
      }
    })
    .catch(err => console.log(err));
}

exports.saveFile = saveFile;