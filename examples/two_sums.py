numbers = input().split(",")
numbers = [int(num) for num in numbers ]
target = int(input())

for i in range(len(numbers)):
    for j in range(i+1, len(numbers)):
        if(numbers[i] + numbers[j] == target):
            print("[",i,",",j,"]", sep="")