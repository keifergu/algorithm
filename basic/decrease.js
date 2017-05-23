// 减治法

var swap = function(n, m, a) {
    var t = a[n]
    a[n] = a[m]
    a[m] = t
}
/**
 * 全排列生成算法，HeapPermute 算法
 * @param  {Array} array 要进行全排列的数组
 * @return {Array}       数组的全排列
 */
function arrangement(array) {
    var result = []
    var heapPermute = function(n) {
        if (n == 0) result.push(array.concat())
        else {
            for (let i = 0; i < n; i++) {
                heapPermute(n - 1)
                if (n % 2 == 1) swap(0, n - 1, array)
                else swap(i, n - 1, array)
            }
        }
    }
    heapPermute(array.length)
    return result
}

/*
队伍排序：给定一个完全循环赛的比赛结果，其中 n 个队伍两两比赛一次。每场比赛以一方胜出或者平局结束。设计一个算法，把 n 个队伍排序，序列中每个队伍都不曾输给紧随气候的队。
 */

/**
 * 对队伍排序的算法
 * @param  {Array} 队伍的获胜情况矩阵
 * @return {Array} 队伍的排列顺序
 */
function teamSort(score) {
    var team = []
    var n = score.length
    // 生成一个表示队伍顺序的数组，初始为 [1,2,3...]
    for(let i = 0; i < n; i++) team[i] = i
    for(let i = 1; i < n; i++) {
        let j = i - 1
        while(j >= 0 && score[team[j]][team[j+1]] == 0) {
            swap(j, j+1, team)
            j--
        }
    }
    return team
}

// 队伍排序测试
// 1 代表胜利，0 代表平局或失败
var resMatrix = [
    [0,0,0,0], // 队伍 0 的比赛结果，全败
    [1,0,0,0], // 队伍 1 的比赛结果，只赢了队伍 0
    [1,1,0,0],
    [1,1,1,0]    
]

teamSort(resMatrix) // 结果为 [3,2,1,0]，满足条件
