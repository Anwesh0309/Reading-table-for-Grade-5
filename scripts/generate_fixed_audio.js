import fs from 'fs';
import path from 'path';

// Using the key provided by the user
const ELEVENLABS_API_KEY = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice

// Sleep helper for rate limiting (500ms)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'audio');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate an id from text to use as filename
function generateHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

const phrases = [
  { original: "Row 1: On Monday, it is 28°C and rain is No.", spoken: "Row 1: On Monday, it is 28 degrees Celsius and rain is No." },
  { original: "Row 2: On Tuesday, it is 30°C and rain is Yes.", spoken: "Row 2: On Tuesday, it is 30 degrees Celsius and rain is Yes." },
  { original: "Row 3: On Wednesday, it is 33°C and rain is No.", spoken: "Row 3: On Wednesday, it is 33 degrees Celsius and rain is No." },
];

async function generateAudio() {
  console.log(`Starting audio generation...`);
  for (const { original, spoken } of phrases) {
    const filename = `${generateHash(original)}.mp3`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      console.log(`Generating: "${spoken}" for key "${original}"`);
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: spoken,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`Saved to ${filepath}`);
      
      // Wait to respect rate limits
      await sleep(600); 
    } catch (err) {
      console.error(`Failed to generate audio for "${spoken}":`, err.message);
    }
  }
}

generateAudio();
