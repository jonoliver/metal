//         _____
//       /       \
//      / /\   /\ \
//     ( /__\ /__\ )
//      \   /\    /
//        )     (
//        \|||||/


const captions = [
  "slow heavy metal music playing",
  "fast thrash metal music playing",
  "hard synth music playing"
];

const captionEl = document.querySelector('#caption');
captions.forEach(caption => {
  const option = document.createElement('option');
  option.value = caption;
  option.innerText = caption;
  captionEl.appendChild(option);
})

const dumbExifFix = (data, context, width) => {
  try {
    const orientation = data.exif.get('Orientation');
    if (orientation === 6) {
      // https://stackoverflow.com/a/40867559
      // this is actually the transform for orientation 8 in the above answer
      // not sure why there is a discrepancy
      // whatever, "works on my machine"
      context.transform(0, -1, 1, 0, 0, width);
    }
  } catch (error) {
    console.log(error);
  }
}

const makeItMetalAF = (canvas, data) => {
  const context = canvas.getContext('2d');
  const { width, height } = canvas;
  dumbExifFix(data, context, width);
  const captionText = `(${captionEl.value})`;
  const fontSize = width / 16;
  const posX = width / 2;
  const posY = height - height / 20;
  context.font = `${fontSize}px sans-serif`;
  context.textBaseline = "bottom";
  context.textAlign = 'center';
  context.fillStyle = 'black';
  context.fillText(captionText, posX + 1, posY + 1);
  context.fillStyle = 'yellow';
  context.fillText(captionText, Math.round(posX), Math.round(posY));
  const result = document.querySelector('#result');
  result.innerHTML = '';
  result.appendChild(canvas);
}

const handleFile = ({ target }) => {
  const file = target.files[0];
  if (!file.type.match('image.*')) return alert("this ain't no image!");
  loadImage(target.files[0], makeItMetalAF, { orientation: true });
}

captionEl.addEventListener('change', makeItMetalAF);
document.querySelector('#file').addEventListener('change', handleFile);

loadImage('kitten.jpg', makeItMetalAF, { orientation: true });
