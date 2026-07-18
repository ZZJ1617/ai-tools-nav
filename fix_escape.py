import sys
f = '/root/content/tool-nav/index.html'
with open(f, 'r') as fh:
    c = fh.read()

# Count occurrences of potential double-escaped patterns
count_4bs = c.count('\\\\\\\\')
count_2bs_u = c.count('\\\\u{')

print(f"Found {count_4bs} occurrences of 4-backslash pattern")
print(f"Found {count_2bs_u} occurrences of double-escaped \\\\u{{")

# Fix: replace the literal \\u{ (two backslashes + u{) with \u{ (one backslash + u{)
# In raw file bytes, \\u{ is 4 bytes: 0x5C 0x5C 0x75 0x7B
# \u{ is 3 bytes: 0x5C 0x75 0x7B
old = '\\\\u{'
new = '\\u{'
c = c.replace(old, new)

# Verify
count_new = c.count('\\u{')
print(f"After fix: {count_new} occurrences of \\u{{")

start = c.find('const HOTSPOT')
end = c.find('];', start)
print("\nFixed hotspot section:")
print(c[start:end+2])

with open(f, 'w') as fh:
    fh.write(c)
print("\nDone")
