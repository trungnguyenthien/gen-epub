Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

const epub = require('epub-gen');
const path = require('path');
const fs = require('fs');
const argv = require('yargs').demandOption([
  'content',
  'cover',
  'output',
  'single'
]).argv;

let contentFiles = Array()
let coverFiles = Array()
if (argv.single == 1) {
  contentFiles.push(argv.content)
  if (argv.cover) {
    coverFiles.push(argv.cover)
  }
} else {
  contentFiles = fs.readdirSync(argv.content)
  if (argv.cover) {
    coverFiles = fs.readdirSync(argv.cover)
  }
}

function randomCover() {
  if (!argv.cover) {
    return null;
  }
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
    cover: randomCover(),
    content: outputContent
  };

  const otuputPath = path.join(__dirname, argv.output, `${chaps[0].title}.epub`)
  new epub(book, otuputPath);

  console.log(`OUTPUT: ${otuputPath}`)
})