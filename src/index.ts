import { parse, sep, normalize as norm } from 'node:path'

function* commonArrayMembers(a: string[], b: string[]) {
  const [l, s] = a.length > b.length ? [a, b] : [b, a]
  for (const x of s) {
    if (x === l.shift()) yield x
    else break
  }
}

const cap = (a: string | null, b: string | null) => {
  if (a === b) return a
  if (!a || !b || parse(a).root !== parse(b).root) return null
  const root = parse(a).root
  const common = [
    ...commonArrayMembers(norm(a).split(sep), norm(b).split(sep)),
  ].join(sep)
  return common === root.slice(0, -1) ? root : common
}

export const commonAncestorPath = (...paths: (string | null)[]) =>
  paths.reduce(cap)
