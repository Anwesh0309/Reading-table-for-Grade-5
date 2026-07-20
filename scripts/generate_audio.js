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

// We define our phrases here.
// Wonder phase
// Story phase
// Simulate phase
// Play phase questions (10 per world = 100)
// Reflect phase
const phrases = [
  // Wonder
  "Ready to crack the code in every table?",
  "Hmm... I wonder...",
  "Which bus should Emma take to reach school by 7:45 am?",
  "What if two buses arrive at the same time?",
  "We might need to compare more than one column!",
  "Let's investigate!",

  // Story 1
  "Leo is planning a fun weekend. He looks at the weather table.",
  "He wants to go to the park, but he needs to find a sunny day.",
  "Which day has the highest temperature and no rain?",
  "Let's help Leo read the weather table!",

  // Simulate
  "Click any row to reveal a summary of that row's data.",
  "Click any column header to highlight that column across all rows.",
  "Use the slider to select a row and a column simultaneously.",
  "Tap the incorrect cell in the table to fix the mismatch.",
  "Cross-check needed!",
  "Great job spotting the error!",
  // Simulate dynamic
  "Row 1: On Monday, it is 28°C and rain is No.",
  "Row 2: On Tuesday, it is 30°C and rain is Yes.",
  "Row 3: On Wednesday, it is 33°C and rain is No.",
  "Player Column: Lists all the students participating.",
  "Points Column: Total points = 360.",
  "Rank Column: Lowest number means 1st place!",
  
  // Reflect
  "Journey Complete!",
  "Amazing! You've mastered reading tables.",
  
  // Carrier phrases for UI
  "Play Again",
  "Next",
  "Back",
  "That's right, keep it up!",
  "Not quite, try it in next questions.",
];

// Generate 100 questions (10 per world for 10 worlds)
const worldContexts = [
  "Weather Watch",
  "Score Board",
  "Price Tag Plaza",
  "Timetable Trail",
  "Library Ledger",
  "Fitness Log",
  "Bus Route Book",
  "Recipe Rack",
  "Concert Counter",
  "Grade Book Grove"
];

let qCount = 1;
worldContexts.forEach((world, wIdx) => {
  for(let i = 1; i <= 10; i++) {
    let questionText = `Question ${qCount}. Let's look at the ${world} table. `;
    if (i <= 3) questionText += `What is the value in row ${i} and column 2?`;
    else if (i <= 7) questionText += `Which row has the highest value?`;
    else questionText += `If we add the values from row 1 and row 2, what is the total?`;
    
    phrases.push(questionText);
    qCount++;
  }
});

const audioMap = {};

async function generateAudio() {
  console.log(`Starting audio generation for ${phrases.length} phrases...`);
  for (const text of phrases) {
    const filename = `${generateHash(text)}.mp3`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const audioUrlPath = `/assets/audio/${filename}`;
    
    audioMap[text] = audioUrlPath;

    if (fs.existsSync(filepath)) {
      console.log(`Skipping (already exists): "${text.substring(0, 30)}..."`);
      continue;
    }

    try {
      console.log(`Generating: "${text.substring(0, 30)}..."`);
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
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
      
      // Wait to respect rate limits
      await sleep(600); 
    } catch (err) {
      console.error(`Failed to generate audio for "${text}":`, err.message);
    }
  }

  // Write audio map
  const mapCode = `export const audioMap = ${JSON.stringify(audioMap, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'utils', 'audioMap.js'), mapCode);
  console.log("audioMap.js has been generated successfully.");
}

generateAudio();
