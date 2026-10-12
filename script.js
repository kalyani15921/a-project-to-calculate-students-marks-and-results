const form = document.getElementById('marksForm');
const inputs = [document.getElementById('subject1'), document.getElementById('subject2'), document.getElementById('subject3')];
const message = document.getElementById('formMessage');
const defaults = [70, 80, 90];

function toHex(value) {
  return `${Math.max(0, value).toString(16).toUpperCase().padStart(2, '0')}H`;
}

function readMarks() {
  const marks = inputs.map(input => input.value.trim() === '' ? NaN : Number(input.value));
  if (marks.some(mark => !Number.isInteger(mark) || mark < 0 || mark > 100)) {
    throw new Error('Please enter whole-number marks from 0 to 100 for all subjects.');
  }
  return marks;
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function calculate(marks) {
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const average = total / marks.length;
  const passed = marks.filter(mark => mark >= 35).length;
  const highest = Math.max(...marks);
  const lowest = Math.min(...marks);

  setText('totalResult', String(total));
  const totalSuffix = document.createElement('span');
  totalSuffix.textContent = ' / 300';
  document.getElementById('totalResult').appendChild(totalSuffix);

  setText('averageResult', average.toFixed(2));
  const averageSuffix = document.createElement('span');
  averageSuffix.textContent = ' / 100';
  document.getElementById('averageResult').appendChild(averageSuffix);

  document.getElementById('totalBar').style.width = `${(total / 300) * 100}%`;
  document.getElementById('averageBar').style.width = `${average}%`;

  marks.forEach((mark, index) => {
    setText(`chartValue${index + 1}`, mark);
    document.getElementById(`chartBar${index + 1}`).style.height = `${mark}%`;
  });
  setText('highestMark', highest);
  setText('lowestMark', lowest);
  document.getElementById('passedCount').innerHTML = `${passed} <small>/ 3</small>`;

  let title, description, tag;
  if (passed === 3 && average >= 75) {
    title = 'Excellent work!';
    description = `Your average is ${average.toFixed(2)}%. Keep up the good work!`;
    tag = 'EXCELLENT';
  } else if (passed === 3) {
    title = 'Results calculated successfully';
    description = `Your average is ${average.toFixed(2)}%. Keep working towards your goal.`;
    tag = 'PASSED';
  } else {
    title = 'A little more practice can help';
    description = `${passed} of 3 subjects meet the demo pass mark of 35.`;
    tag = 'REVIEW';
  }
  setText('gradeTitle', title);
  setText('gradeDescription', description);
  setText('gradeTag', tag);

  // The included basic assembly sample uses an 8-bit total (0–255).
  // Keep its memory examples aligned, but warn if this input exceeds that range.
  const totalFits = total <= 255;
  setText('mem1', `${toHex(marks[0])} (${marks[0]})`);
  setText('mem2', `${toHex(marks[1])} (${marks[1]})`);
  setText('mem3', `${toHex(marks[2])} (${marks[2]})`);
  setText('memTotal', totalFits ? `${toHex(total)} (${total})` : 'Exceeds 8-bit range');
  const quotient = Math.floor(total / 3);
  const remainder = total % 3;
  setText('memRemainder', `${toHex(remainder)} (${remainder})`);
  setText('memAverage', `${toHex(quotient)} (${quotient})`);

  if (totalFits) {
    message.textContent = 'Calculated. These inputs fit the 8-bit total used by the included assembly example.';
    message.style.color = '#159b6b';
  } else {
    message.textContent = 'Calculated in the web app. Total is above 255, so use a 16-bit 8085 version for these marks.';
    message.style.color = '#b7791f';
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    calculate(readMarks());
  } catch (error) {
    message.textContent = error.message;
    message.style.color = '#d34b65';
  }
});

inputs.forEach(input => {
  input.addEventListener('input', () => {
    // Recalculate live only while every field contains a valid value.
    try {
      const marks = readMarks();
      calculate(marks);
    } catch (_) {
      message.textContent = '';
    }
  });
});

document.getElementById('resetButton').addEventListener('click', () => {
  inputs.forEach((input, index) => input.value = defaults[index]);
  calculate(defaults);
});

document.getElementById('copyCodeButton').addEventListener('click', async () => {
  const code = document.getElementById('assemblyCode').textContent;
  const button = document.getElementById('copyCodeButton');
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = '✓ Copied!';
    setTimeout(() => button.textContent = '▣ Copy code', 1600);
  } catch (_) {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('assemblyCode'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = 'Select and copy';
  }
});

// Initial sample values shown when the page opens.
calculate(defaults);
