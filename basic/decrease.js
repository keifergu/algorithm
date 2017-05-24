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

/**
 * lomutoPartition 划分算法
 * @param  {Array} array 进行划分的数组
 * @return {Number}      首位数字的位置
 *
 * 1. 将数组的第一个数字作为划分的基准，小于该值的数在它前面，大于的在后面
 * 2. 扫描时，array[0] 作为基准不移动，仅移动索引 s
 * 3. 开始扫描，若一直小于 p，则仅增长 s，此时 s 与 i 增加相同，数组未移动
 * 4. 扫描到第一个大于 p 的数后，s 暂停增加，此时 i 继续增加
 * 5. 扫描到大于 p 的数后，又扫描的小于 p 的数，此时中值索引 s 加一，索引处为一大数，将扫描到的小数与其交换。
 */
function lomutoPartition(array) {
    var p = array[0]
    var s = 0
    var n = array.length
    for(var i = 1; i < n; i++) {
        if(array[i] < p) {
            s++
            swap(s, i, array)
        }
    }
    swap(0, s, array)
    return s
}

/**
 * quickSelect 快速选择算法，用于中值的计算
 * @param  {Array}  array 需要进行操作的数组
 * @param  {Number} k     需要找到第几小的数
 * @return {Number}       中值
 *
 * 1. 先以数组第一个数为基准进行划分，获得该数值是是第几小，并将数组进行相应的划分
 * 2. 如果 s == k - 1，例如需要找第 2 小，划分结果为 1。那么该值就是数组中排第 2 小的数，满足结果
 * 3. 划分结果比 k-1 大，说明需要找到数还在前面，那么递归对 [0,s] 的数继续进行快速选择
 * 4. 划分结果比 k-1 小，说明需要找的数在后面，那么对后面的数组进行快速选择算法
 *    例如需要找第 5 大，即 k 值为 5,则需要划分结果的位置为 4；
 *    若划分结果为 3,那么我们需要的是位置 4,即位置 3 之后的数组（不包括位置 3）的第 1 小的数
 *    即从 s+1 选择数组，需要第 k-1-s 小的数 
 */
function quickSelect(array, k) {
    var s = lomutoPartition(array)
    if (s == k - 1) return array[s]
    else if (s > k - 1) return quickSelect(array.slice(0, s), k)
    else return quickSelect(array.slice(s + 1), k - s - 1)
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
        // 获取 i 位置前一支队伍相对于 i 位置队伍的得分情况
        // 如果为 0,说明前一支队伍是输给了 i 的，此时交换两支队伍位置
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
