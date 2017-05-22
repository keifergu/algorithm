/**
 * Euclid 算法求最大公约数
 */
function Euclid(m, n) {
	var r
	while(n != 0) {
		r = m % n
		m = n
		n = r
	}
	return m
}

/**
 * 平方根
 */
var sqrt = Math.sqrt

/**
 * 向下取整
 */
var floor = Math.floor

/**
 * Sieve of Eratosthens(埃拉托色尼筛选法) 算法求质数列
 * 输入： 数字 n
 * 输出： n 以内的质数列
 */
function Sieve(n) {
	let A = []
	for(let p = 2; p <= n; p++) A[p] = p;
	for(let p = 2; p <= floor(sqrt(n)); p++) {
		if(A[p] !== 0) {
			let j = p * p 	// 只需从 n * n 开始考虑，例如 5,2*5 和 3*5 已被 2 和 3 消除
			while(j <= n) {
				A[j] = 0
				j = j + p
			}
		}
	}
	let L = []
	let i = 0
	for(let p = 2; p <= n; p++) {
		if(A[p] !== 0) L[i++] = A[p]
	}
	return L
}