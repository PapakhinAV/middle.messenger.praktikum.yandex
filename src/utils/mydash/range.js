function range(start = 0, end, step = 1, isRight) {


    const result = []

    if(typeof end === 'undefined') end = start
    if(start === 0 && end === 0) return result
    if(end === start && start < 0) step = -1 * step
    if(step === 0) return Array(Math.abs(end-start)).fill(start)

    let from = start === end ? 0 : start

    const compare = (i)=>{
        if(step >= 0) return i < end
        return i > end;
    }

    for(i = from; compare(i); i += step){
        result.push(i)
    }
    if(isRight) result.reverse()

    return result
}
