n = int(input())
string_inp = input().split(" ")

data = [int(inp) for inp in string_inp]

max_diff = 0
for i in range(1, n):
    diff = abs(data[i] - data[i - 1])
    if diff > max_diff:
        max_diff = diff

print(max_diff)