Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

const epub = require('epub-gen');
const path = require('path');
const fs = require('fs');
const argv = require('yargs')
  .demandOption(['content', 'cover', 'output'])
  .argv;

const contentFiles = fs.readdirSync(argv.content) //.filter(f => fs.statSync(f).isFile());
const coverFiles = fs.readdirSync(argv.cover) //.filter(f => fs.statSync(f).isFile());

function randomCover() {
  return `${argv.cover}/${coverFiles.sample()}`
}

contentFiles.forEach(f => {
  const jsonPath = `${argv.content}/${f}`
  const data = fs.readFileSync(jsonPath, 'utf8');
  const chaps = JSON.parse(data);
  let outputContent = Array()
  chaps.forEach(c => {
    outputContent.push({
      data: c.content
    })
  })

  const book = {
    title: chaps[0].title,
    // author: 'John Doe',
    cover: randomCover(),
    content: outputContent
  };

  const otuputPath = path.join(__dirname, argv.output, `${chaps[0].title}.epub`)
  // const options = {
  //   epubVersion: 3,
  //   filename: `${chaps[0].title}.epub`,
  //   outputDir: otuputPath // Thư mục lưu file EPUB mới tạo
  // };
  new epub(book, otuputPath);

  console.log(`OUTPUT: ${otuputPath}`)
})