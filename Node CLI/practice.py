import re
print(sum([int(x) for x in re.findall('[0-9]+',(open('webdata.txt', 'r')).read())]))