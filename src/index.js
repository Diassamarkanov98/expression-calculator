function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {



    let calculator = {
        '+': function (a, b) {
            return +a + +b
        },
        '-': function (a, b) {
            return +a - +b
        },
        '*': function (a, b) {
            return +a * +b
        },
        '/': function (a, b) {
            if (b === 0) {
                throw new Error('TypeError: Division by zero.')
            }
            return +a / +b
        },
    }

    

    let arr = expr.trim().split('')
    let fst
    let snd
    let current
    let brackets = arr.map(item => {
        return item === '(' || item === ')' ? item : ''
    }).filter(item => item !== '').join('')
    for(let i = 0; i < brackets.length; i++) {
        if (brackets.includes('()')) {
            brackets = brackets.replace(/\(\)/g, '')
        }
        if (!brackets.includes('()') && brackets.length) {
            throw new Error('ExpressionError: Brackets must be paired')
        }
    }
    function math(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '*') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            } else if (arr[i] === '/') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '+') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            } else if (arr[i] === '-') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            }
        }
    }
    if (expr.includes(' ') && !expr.includes('(') && !expr.includes(')')) {
        fst = expr.split(' ').filter(item => item !== '')
        snd = fst.concat([])
        math(fst)
        return Number(fst.join(''))
    } else if (!expr.includes(' ') || !expr.includes('(') || !expr.includes(')')) {
        fst = expr.split('').filter(item => item !== ' ')
        snd = fst.concat([])
        math(fst)
        return Number(fst.join(''))
    } else {
        fst = expr.trim().split(' ').filter(item => item !== '');
        snd = fst.concat([]);
        let currentlength = snd.length
        function findBrackets() {
            fst = snd.concat([])
            let start
            let end
            for (let i = 0; i < fst.length; i++) {
                if (fst[i] === '(') {
                    start = i
                }
                for (let j = start; j < fst.length; j++) {
                    if (fst[j] === ')') {
                        end = j
                        break
                    }
                }
                if (!fst.includes('(') && !fst.includes(')')) {
                    math(fst)
                    return Number(fst.join(''))
                }
            }
            let seq = fst.splice(start + 1, end - start - 1)
            let seqLength = seq.length

            math(seq)

            snd.splice(start, seqLength + 2, seq.join(''))
        }
        for (let i = 0; i < currentlength; i++) {
            findBrackets()
        }
        return Number(fst.join(''))
    }
}
module.exports = {
    expressionCalculator
}
