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

/**
 * 随机打乱题库和题库中所有的选择题中的项目
 * @param arr
 * @returns {*}
 */
function shuffleArray(arr) {
    // 随机打乱数组排序
    arr.sort(() => Math.random() - 0.5);

    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 如果当前元素包含options属性
        if (arr[i]["options"]) {
            // 随机打乱options数组排序
            arr[i]["options"].sort(() => Math.random() - 0.5);
        }
    }

    // 返回打乱随机之后的数组
    return arr;
}

/**
 * 通过计算返回答题进度，供进度条使用
 * @param a 当前答题进度数值
 * @param b 题库总数
 * @returns {number} 返回百分数的分子值
 */
function percentToNumerator(a, b) {
    return Math.round((a / b) * 100);  // 返回百分数的分子值
}

export {checkAnswer, shuffleArray, percentToNumerator}