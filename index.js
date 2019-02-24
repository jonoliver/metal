//         _____
//       /       \
//      / /\   /\ \
//     ( /__\ /__\ )
//      \   /\    /
//        )     (
//        \|||||/

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const image = document.createElement('img');
image.crossOrigin = 'anonymous';

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

const makeItMetalAF = () => {
  const captionText = `(${captionEl.value})`;
  const fontSize = image.width / 16;
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);
  context.font = `${fontSize}px sans-serif`;
  context.textBaseline = "bottom";
  context.textAlign = 'center';
  const posX = image.width / 2;
  const posY = image.height - image.height / 20;
  context.fillStyle = 'black';
  context.fillText(captionText, posX + 1, posY + 1);
  context.fillStyle = 'yellow';
  context.fillText(captionText, posX, posY);
}

const handleFile = ({ target }) => {
  const file = target.files[0];
  if (!file.type.match('image.*')) return alert("this ain't no image!");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(evt){
    image.src = evt.target.result;
    console.log(image.width, image.height)
    makeItMetalAF();
	}
}

captionEl.addEventListener('change', makeItMetalAF);
document.querySelector('#file').addEventListener('change', handleFile);
image.onload = makeItMetalAF;
image.src = 'kitten.jpg';
