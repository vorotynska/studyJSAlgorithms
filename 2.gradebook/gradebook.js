// Grade Book

function getAverage(scores) {
    //get average
    let sum = 0;
  
    for (const score of scores) {
      sum += score;
    }
  
    return sum / scores.length;
  }

  //Now the teacher needs your help converting the student score to a letter grade.
  function getGrade(score) {
    if (score === 100) {
      return "A++";
    } else if (score >= 90) {
      return "A";
    } else if (score >= 80) {
      return "B";
    } else if (score >= 70) {
      return "C";
    } else if (score >= 60) {
      return "D";
    } else {
      return "F";
    }
  }

  function hasPassingGrade(score) {
    return getGrade(score) !== "F";
  }

  function studentMsg(totalScores, studentScore) {
    const average = getAverage(totalScores);
    const grade = getGrade(studentScore);
    const passOrFail = hasPassingGrade(studentScore) ? "You passed the course." : "You failed the course.";
    
    return `Class average: ${average.toFixed(2)}. Your grade: ${grade}. ${passOrFail}`;
  }
  console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
  console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100))


