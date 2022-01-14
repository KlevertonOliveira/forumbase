export function calculateAnswerTitleValue(totalAnswers: number, currentSelectedPage: number, index: number){
  const correctValue = (totalAnswers / currentSelectedPage) - (index + currentSelectedPage - 1);
  return `${index + 1 < 10 && '0'}${correctValue}`
}

/* 
  Quick explanation about this function:
    What it does: Calculates correct number to be in the answer title. E.g.: "Answer 03"; 
    This is necessary for two reasons: 
      1) The main answers array is sorted based on the timestamp, which changes the order of elements (and thus their indexes);
      2) After that, the pagination takes place and slices the sorted array in 3 answers per page to be used to map over the answers, which also modifies the indexes for each element.*

  *(See pages/post/[id], lines 65-69)
*/