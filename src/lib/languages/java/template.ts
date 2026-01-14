const data = {
  title: 'Two Sum',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
    '\n' +
    'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
    '\n' +
    'You can return the answer in any order.',
  difficulty: 'EASY',
  tags: [ 'Array', 'Hash Table' ],
  constraints: '2 <= nums.length <= 10^4\n' +
    '-10^9 <= nums[i] <= 10^9\n' +
    '-10^9 <= target <= 10^9\n' +
    'Only one valid answer exists.',
  hints: "Think about using a hash map to store the numbers you've seen so far and their indices.",
  editorial: "The brute force approach would be to check every pair of numbers, which takes O(n^2) time. However, we can use a hash map to achieve O(n) time complexity. As we iterate through the array, we check if the complement (target - current number) exists in the hash map. If it does, we've found our answer. If not, we add the current number and its index to the hash map.",
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    },
    { input: 'nums = [3,3], target = 6', output: '[0,1]' }
  ],
  testCases: [
    { input: '[2,7,11,15]\n9', expected: '[0,1]' },
    { input: '[3,2,4]\n6', expected: '[1,2]' },
    { input: '[3,3]\n6', expected: '[0,1]' },
    { input: '[1,2,3,4,5]\n9', expected: '[3,4]' }
  ],
  codeSnippets: [
    {
      language: 'PYTHON',
      starterCode: 'def twoSum(nums: list[int], target: int) -> list[int]:\n' +
        '    # Write your solution here\n' +
        '    pass'
    },
    {
      language: 'JAVASCRIPT',
      starterCode: 'function twoSum(nums, target) {\n    // Write your solution here\n}'
    }
  ],
  solution: [
    {
      language: 'PYTHON',
      code: 'def twoSum(nums: list[int], target: int) -> list[int]:\n' +
        '    seen = {}\n' +
        '    for i, num in enumerate(nums):\n' +
        '        complement = target - num\n' +
        '        if complement in seen:\n' +
        '            return [seen[complement], i]\n' +
        '        seen[num] = i\n' +
        '    return []',
      explanation: 'We use a hash map to store each number and its index. For each number, we check if its complement exists in the map.'
    },
    {
      language: 'JAVASCRIPT',
      code: 'function twoSum(nums, target) {\n' +
        '    const seen = new Map();\n' +
        '    for (let i = 0; i < nums.length; i++) {\n' +
        '        const complement = target - nums[i];\n' +
        '        if (seen.has(complement)) {\n' +
        '            return [seen.get(complement), i];\n' +
        '        }\n' +
        '        seen.set(nums[i], i);\n' +
        '    }\n' +
        '    return [];\n' +
        '}',
      explanation: 'Same approach using JavaScript Map for O(1) lookups.'
    }
  ]
};