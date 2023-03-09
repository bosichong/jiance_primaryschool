/**
 * 多选题判断，用户答案是否和给出的答案相同
 * @param userAnswer
 * @param correctAnswer
 * @returns {boolean}
 */
const checkAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer.length !== correctAnswer.length) {
        return false;
    }
    for (let i = 0; i < userAnswer.length; i++) {
        if (!correctAnswer.includes(userAnswer[i])) {
            return false;
        }
    }
    return true;
}


export { checkAnswer }