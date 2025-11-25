import t from 'tap'
import { posix, win32 } from 'node:path'

t.test('posix', async t => {
  const { commonAncestorPath: ancestor } = await t.mockImport<
    typeof import('../dist/esm/index.js')
  >('common-ancestor-path', { path: posix })
  t.equal(ancestor('/a/b/c/d', '/a/b/c/d/'), '/a/b/c/d')
  t.equal(ancestor('/a/b/c', '/a/b/d', '/a/x/y'), '/a')
  t.equal(ancestor('/a/b/', '/a/b/'), '/a/b/')
  t.equal(ancestor('/a', '/a/b/c'), '/a')
  t.equal(ancestor('/a/b/c', '/a'), '/a')
  t.equal(ancestor('/a/b/c'), '/a/b/c')
  t.equal(ancestor('/a/b/c', null), null)
})

t.test('win32', async t => {
  const { commonAncestorPath: ancestor } = await t.mockImport<
    typeof import('../dist/esm/index.js')
  >('common-ancestor-path', { path: win32 })
  t.equal(ancestor('c:\\a\\b\\c\\d', 'c:\\a\\b\\c\\d\\'), 'c:\\a\\b\\c\\d')
  t.equal(ancestor('c:\\a\\b\\c', 'c:\\a\\b\\d', 'c:\\a\\x\\y'), 'c:\\a')
  t.equal(ancestor('c:\\a\\b\\', 'c:\\a\\b\\'), 'c:\\a\\b\\')
  t.equal(ancestor('c:\\a\\b\\', 'd:\\a\\b\\'), null)
  t.equal(ancestor('c:\\a', 'c:\\a\\b\\c'), 'c:\\a')
  t.equal(ancestor('c:\\a\\b\\c'), 'c:\\a\\b\\c')
  t.equal(ancestor('c:\\a\\b\\c', null), null)
})
