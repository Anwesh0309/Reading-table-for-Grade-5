export const generateQuestionsForWorld = (worldId, worldIndex) => {
  const questions = [];
  const startNum = worldIndex * 10 + 1;
  const worldNames = [
    "Weather Watch", "Score Board", "Price Tag Plaza", "Timetable Trail", 
    "Library Ledger", "Fitness Log", "Bus Route Book", "Recipe Rack", 
    "Concert Counter", "Grade Book Grove"
  ];
  const worldName = worldNames[worldIndex];

  // For the MVP, we create a generic table for each world based on its topic
  const cols = ["Category", "Mon", "Tue", "Wed"];
  const rows = [
    { cat: "A", mon: 10 + worldIndex, tue: 15, wed: 12 },
    { cat: "B", mon: 20, tue: 25 + worldIndex, wed: 22 },
    { cat: "C", mon: 5, tue: 8, wed: 30 + worldIndex },
  ];

  for (let i = 0; i < 10; i++) {
    const qNum = startNum + i;
    
    // We already generated these exact strings in generate_audio.js
    let audioText = `Question ${qNum}. Let's look at the ${worldName} table. `;
    let questionText = "";
    let correctAns = "";
    
    if (i < 3) {
      questionText = `What is the value in row ${i + 1} and column 2 (Mon)?`;
      audioText += `What is the value in row ${i + 1} and column 2?`;
      correctAns = rows[i].mon.toString();
    } else if (i < 7) {
      questionText = `Which row has the highest value?`;
      audioText += `Which row has the highest value?`;
      correctAns = "Row 3 (C)"; // 30+ is highest usually in our mock data
    } else {
      questionText = `If we add the values from row 1 and row 2 (Mon), what is the total?`;
      audioText += `If we add the values from row 1 and row 2, what is the total?`;
      correctAns = (rows[0].mon + rows[1].mon).toString();
    }

    // Generate random distractors
    const options = [correctAns];
    while(options.length < 4) {
      let dStr = "";
      if (correctAns.includes("Row")) {
        const rIdx = Math.floor(Math.random() * 4); // 0, 1, 2, 3
        const cats = ["A", "B", "C", "D"];
        dStr = `Row ${rIdx + 1} (${cats[rIdx]})`;
      } else {
        const distractor = (parseInt(correctAns) || 10) + Math.floor(Math.random() * 20) - 10;
        dStr = distractor.toString();
      }
      if (!options.includes(dStr)) options.push(dStr);
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    questions.push({
      id: qNum,
      audioText,
      questionText,
      options,
      correctIndex: options.indexOf(correctAns),
      tableData: { cols, rows }
    });
  }

  return questions;
};
