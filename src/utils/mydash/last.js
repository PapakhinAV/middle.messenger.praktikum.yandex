export function last(list) {

    if(!list || !Array.isArray(list) || list.length=== 0) return;

    return list.at(-1)

}
