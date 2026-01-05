export const estimateComplexity = (code) => {
    if (!code) return "O(1)";

    // Simple heuristic: count nested loops (for/while)
    const lines = code.split('\n');
    let maxNesting = 0;
    let currentNesting = 0;

    // Regex to detect loop starts and block braces
    // heavily simplified and assumes standard formatting or some braces

    for (const line of lines) {
        const trimmed = line.trim();

        // Check for loop starts
        if (trimmed.match(/\b(for|while)\b/) && !trimmed.startsWith('//')) {
            // If it's a one-liner loop without braces, we might count it as nesting but it resets next line
            // But let's assume braces style for better detection or indentation
        }

        // A more robust simple approach: Count indentation of lines with loops?
        // Or just count braces.

        // Let's try counting 'for'/'while' keywords inside the same block scope.
        // Actually, simply counting indentation-based nesting for lines with loops is a decent proxy.

        const indentation = line.search(/\S/);
        if (indentation === -1) continue; // empty line

        if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
            // Check nesting level based on indentation compared to previous
            // This is tricky without a proper parser.
        }
    }

    // Alternative Regex Approach:
    // Remove comments
    const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

    // Count max depth of nested loops
    // Logic: traverse characters, track braces depth, record execution of 'for'/'while' at depths.
    let depth = 0;
    let maxLoopDepth = 0;
    let loopDepths = [];

    // Tokenizer-light
    let i = 0;
    while (i < cleanCode.length) {
        if (cleanCode[i] === '{') depth++;
        else if (cleanCode[i] === '}') depth = Math.max(0, depth - 1);

        // Check for loop keyword
        if (cleanCode.substring(i).match(/^(for|while)\b/)) {
            // Found a loop at current depth
            // Check if this loop is nested inside another loop?
            // We need to track *loop* nesting specifically, not just block nesting.
            // But usually loop nesting == block nesting increases.

            // Let's simplified: If we see a loop, potential complexity increases.
            // Actually, let's just use strict block nesting for complexity upper bound?
            // No, 'if' also creates blocks.
        }
        i++;
    }

    // Let's stick to a simpler string-match heuristic for "Time Complexity" label
    // Count how many 'for' or 'while' are inside other 'for'/'while'

    const loops = (cleanCode.match(/\b(for|while)\b/g) || []).length;
    if (loops === 0) return "O(1)";
    if (loops === 1) return "O(N)";

    // Check for nesting
    // Convert code to lines
    const codeLines = cleanCode.split('\n');
    let maxIndent = 0;
    let currentLoops = []; // stack of indentations of active loops

    codeLines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Calculate indent (number of spaces)
        const indent = line.search(/\S/);

        // If we are less indented than the last loop, pop it
        while (currentLoops.length > 0 && indent <= currentLoops[currentLoops.length - 1]) {
            currentLoops.pop();
        }

        // If new loop
        if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
            currentLoops.push(indent);
            maxLoopDepth = Math.max(maxLoopDepth, currentLoops.length);
        }
    });

    if (maxLoopDepth <= 1) return "O(N)";
    if (maxLoopDepth === 2) return "O(N²)";
    if (maxLoopDepth === 3) return "O(N³)";
    return `O(N^${maxLoopDepth})`;
};

export const analyzeCode = (code) => {
    const suggestions = [];
    const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

    if (cleanCode.includes('console.log') || cleanCode.includes('print(')) {
        suggestions.push({
            type: 'warning',
            message: 'Remove print/console debugging statements before submission.'
        });
    }

    // Check for basic recursion without base case (hard to detect perfectly, but maybe check for function name inside itself?)
    // Skipping complex checks.

    if (cleanCode.split('\n').length > 50) {
        suggestions.push({
            type: 'info',
            message: 'Consider breaking down long functions into smaller helpers.'
        });
    }

    // Variable naming (very basic, e.g. single letters)
    //   if (cleanCode.match(/\b(?:let|var|const|int|float)\s+[a-z]\s*=/)) {
    //       suggestions.push({
    //           type: 'info', // generic advice
    //           message: 'Use descriptive variable names instead of single letters.'
    //       });
    //   }

    if (suggestions.length === 0) {
        suggestions.push({ type: 'success', message: 'Code looks clean!' });
    }

    return suggestions;
};
