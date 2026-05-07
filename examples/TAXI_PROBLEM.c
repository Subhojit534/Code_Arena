#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a, count[5] = {0};

    // Count groups
    for (int i = 0; i < n; i++) {
        scanf("%d", &a);
        count[a]++;
    }

    int taxis = 0;

    // Groups of 4
    taxis += count[4];

    // Groups of 3 (pair with 1 if possible)
    taxis += count[3];
    if (count[1] >= count[3]) {
        count[1] -= count[3];
    } else {
        count[1] = 0;
    }

    // Groups of 2
    taxis += count[2] / 2;
    if (count[2] % 2) {
        taxis += 1;
        if (count[1] >= 2) {
            count[1] -= 2;
        } else {
            count[1] = 0;
        }
    }

    // Remaining groups of 1
    if (count[1] > 0) {
        taxis += (count[1] + 3) / 4;
    }

    printf("%d\n", taxis);

    return 0;
}