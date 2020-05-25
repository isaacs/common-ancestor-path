const t = require('tap')
const requireInject = require('require-inject')
const {posix, win32} = require('path')

t.test('posix', async t => {
  const ancestor = requireInject('../', { path: posix })
  t.equal(ancestor('/a/b/c/d', '/a/b/c/d/'), '/a/b/c/d')
  t.equal(ancestor('/a/b/c', '/a/b/d', '/a/x/y'), '/a')
  t.equal(ancestor('/a/b/', '/a/b/'), '/a/b/')
  t.equal(ancestor('/a', '/a/b/c'), '/a')
  t.equal(ancestor('/a/b/c', '/a'), '/a')
  t.equal(ancestor('/a/b/c'), '/a/b/c')
})

t.test('win32', async t => {
  const ancestor = requireInject('../', { path: win32 })
  t.equal(ancestor('c:\\a\\b\\c\\d', 'c:\\a\\b\\c\\d\\'), 'c:\\a\\b\\c\\d')
  t.equal(ancestor('c:\\a\\b\\c', 'c:\\a\\b\\d', 'c:\\a\\x\\y'), 'c:\\a')
  t.equal(ancestor('c:\\a\\b\\', 'c:\\a\\b\\'), 'c:\\a\\b\\')
  t.equal(ancestor('c:\\a\\b\\', 'd:\\a\\b\\'), null)
  t.equal(ancestor('c:\\a', 'c:\\a\\b\\c'), 'c:\\a')
  t.equal(ancestor('c:\\a\\b\\c'), 'c:\\a\\b\\c')
})
