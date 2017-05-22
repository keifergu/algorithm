// 分治法

/**
 * 归并排序
 * 输入：数组
 * 输出：将输入数组进行排序
 * 
 * var A = [3,2,1,4]
 * mergeSort(A)
 * console.log(A) //[1,2,3,4]
 * 
 */

function mergeSort(A) {
	var n = A.length
	if (n > 1) {
		var dn = Math.floor(n/2)
		var front = A.slice(0, dn)
		var back = A.slice(dn, n)
		mergeSort(front)
		mergeSort(back)
		merge(front, back, A)
	}
}

function merge(front, back, A) {
	var i = 0,
		j = 0,
		k = 0,
		p = front.length,
		q = back.length;
	while(i < p && j < q) {
		if (front[i] < back[j])
			A[k++] = front[i++]
		else
			A[k++] = back[j++]
	}
	if (i == p) A.splice(k, q, ...back.slice(j, q+1))
	else A.splice(k, p, ...front.slice(i, p+1))
}
