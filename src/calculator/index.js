/**
 * 
 * @param {string} s 计算的表达式 
 */
function calculator(s) {
    function wrong(err, s = '') {
        let e = err + s
        throw e
    }
    // 合法的字符 
    // 0-9 >> 1 
    // */-= >> 2
    // ( >> 3
    // ) >> 4
    const rule = {
        '0': 1,
        '1': 1,
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1,
        '7': 1,
        '8': 1,
        '9': 1,
        '*': 2,
        '/': 2,
        '+': 2,
        '-': 2,
        '(': 3,
        ')': 4
    }

    let esLegal = false
    let isRemoveEmpty = false
    /**
     * 
     * @param {string} s 计算的表达式 
     * @param {number} l 第0个索引
     * @param {number} r 最后一个索引
     */
    const calc = function(s, l, r) {
        s = s.replace(' ', '')
        let op = -1 // 权限最小符号的索引
        let curPre = 0 // 当前的数值
        let pre = 1000 // 储存的数值
        let temp = 0 // 每个 ) or ( 加100

        // 解决空格问题
        if(!isRemoveEmpty) {
            isRemoveEmpty = true
            let t = []
            for(let i=0; i< s.length; i++) {
                if(s[i] !== ' ') {
                    t.push(s[i])
                } else {
                    // 33 3 * 2 >>  这种情况不合法
                    if(i > l && i < r) {
                        let f = rule[s[i-1]]
                        let a = rule[s[i+1]]
                        if(f === 1 && a === 1) wrong('error ', i)
                    }
                }
            }
            if(t.length < s.length) {
                s = t.join('')
                // 去掉后空格的表达式
                return calc(s, 0, s.length - 1)
            }
        }
        for(let i = l; i <= r; i++) {
            let str = s[i]
            if(str === ' ') continue
            // 判断表达式是否合法
            if(!esLegal) {
                let ruleStr = rule[str]
                if(!ruleStr) wrong('error')
                const ruleStrFuns = {
                    // 0-9
                    '1': ()=> {
                        if(i > l && s[i-1] === ')' ) wrong('error 1 ' , s[i-1])
                        if(i < r && s[i+1] === '(') wrong('error 1 ' , s[i+1])
                    },
                    // */-+
                    '2': ()=> {
                        if(!(i > l && (rule[s[i-1]] === 1 || rule[s[i-1]] === 4))) wrong('error 2 ', str)
                        if(!(i < r && (rule[s[i+1]] === 1 || rule[s[i+1]] === 3))) wrong('error 2 ', str)
                    },
                    // （
                    '3': ()=> {
                        if(i > l ) {
                            if(rule[s[i-1]] !== 2) {
                                wrong('error 3 1 ', str)
                            }
                        } 
                        if(!(i < r && rule[s[i+1]] === 1)) wrong('error 3 2 ', str)
                    },
                    // ）
                    '4': ()=> {
                        if(!(i > l && rule[s[i-1]] === 1)) wrong('error 4 1 ', str)
                        if(i < r ) {
                            if(rule[s[i+1]] === 2) {
                                wrong('error 4 2 ', str)
                            }
                        } 
                    },
                }
                let fn =ruleStrFuns[ruleStr]
                fn()
            }
            curPre = 0
            switch(str) {
                case '+':
                case '-': 
                    curPre = 1 + curPre + temp; break
                case '*':
                case '/':
                    curPre = 2 + curPre + temp; break
                case '(':
                    temp += 100; break
                case ')':
                    temp -= 100; break
            }
            // 有权限更小的符号
            if(curPre > 0 && curPre < pre) {
                pre = curPre
                op = i
            }
        }
        if(!esLegal) esLegal = true
        // 没有符号 字符串转数字 例： ‘123’ << 123
        if(op === -1) {
            let num = 0
            // 不做处理的
            let continues = {
                ' ': true,
                '(': true,
                ')': true
            }
            for(let i = l; i <= r; i++) {
                let str = s.charAt(i)
                if(continues[str]) continue;
                num = num * 10 +  parseInt(str)
            }
            return num
        }
        // 二叉树 >> 分治思想 从权限最小的符号中间切开
        // 左
        let a = calc(s, l, op - 1)
        // 右
        let b = calc(s, op + 1, r)

        const calcs = {
            '-': (a, b)=> a - b,
            '+': (a, b)=> a + b,
            '*': (a, b)=> a * b,
            '/': (a, b)=> a / b
        }

        let sign = s[op]
        return calcs[sign](a, b)
    }
    return calc(s, 0, s.length - 1)
}
let str = '2 * (2 + 333)'
let total = calculator(str)
console.log(total)