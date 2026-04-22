// lib/dsa-problems.js
// DSA problem bank for the Code Playground. Expand freely.
// Each problem includes starter code in multiple languages + visible test cases.

export const dsaProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    description:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    testCases: [
      { input: "2 7 11 15\n9", expected: "0 1" },
      { input: "3 2 4\n6", expected: "1 2" },
    ],
    starter: {
      python: `# Read input: first line is the array, second line is target
nums = list(map(int, input().split()))
target = int(input())

# Your solution here
def two_sum(nums, target):
    # TODO: implement
    pass

result = two_sum(nums, target)
if result:
    print(*result)`,
      javascript: `// Read input from stdin
const lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n');
const nums = lines[0].split(' ').map(Number);
const target = parseInt(lines[1]);

function twoSum(nums, target) {
  // TODO: implement
}

const result = twoSum(nums, target);
if (result) console.log(result.join(' '));`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: implement
    return {};
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> nums;
    int x;
    while (ss >> x) nums.push_back(x);
    int target;
    cin >> target;
    auto r = twoSum(nums, target);
    for (int i : r) cout << i << " ";
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // TODO: implement
        return new int[]{};
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int target = sc.nextInt();
        int[] r = twoSum(nums, target);
        for (int i : r) System.out.print(i + " ");
    }
}`,
    },
  },
  {
    id: "reverse-linked-list",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    description:
      "Given the head of a singly linked list (represented as space-separated numbers), reverse the list and print it.",
    examples: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1" },
      { input: "1 2", output: "2 1" },
    ],
    testCases: [
      { input: "1 2 3 4 5", expected: "5 4 3 2 1" },
      { input: "1 2", expected: "2 1" },
    ],
    starter: {
      python: `nums = list(map(int, input().split()))

def reverse(arr):
    # TODO: implement without using arr.reverse()
    pass

print(*reverse(nums))`,
      javascript: `const nums = require('fs').readFileSync(0,'utf8').trim().split(' ').map(Number);
function reverse(arr) {
  // TODO: implement
}
console.log(reverse(nums).join(' '));`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> nums; int x;
    while (cin >> x) nums.push_back(x);
    // TODO: reverse
    for (int i : nums) cout << i << " ";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        while (sc.hasNextInt()) nums.add(sc.nextInt());
        // TODO: reverse
        for (int n : nums) System.out.print(n + " ");
    }
}`,
    },
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    description:
      "Given a string containing '(', ')', '{', '}', '[' and ']', determine if the input is valid. Print 'true' or 'false'.",
    examples: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
    ],
    testCases: [
      { input: "()", expected: "true" },
      { input: "()[]{}", expected: "true" },
      { input: "(]", expected: "false" },
    ],
    starter: {
      python: `s = input().strip()

def is_valid(s):
    # TODO: use a stack
    pass

print("true" if is_valid(s) else "false")`,
      javascript: `const s = require('fs').readFileSync(0,'utf8').trim();
function isValid(s) { /* TODO */ }
console.log(isValid(s) ? "true" : "false");`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; /* TODO */ }`,
      java: `import java.util.*;
public class Main { public static void main(String[] a) { Scanner s = new Scanner(System.in); String in = s.nextLine(); /* TODO */ } }`,
    },
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Searching",
    description:
      "Given a sorted array and a target, return the index (0-based). Return -1 if not found. Must run in O(log n).",
    examples: [
      { input: "-1 0 3 5 9 12\n9", output: "4" },
      { input: "-1 0 3 5 9 12\n2", output: "-1" },
    ],
    testCases: [
      { input: "-1 0 3 5 9 12\n9", expected: "4" },
      { input: "-1 0 3 5 9 12\n2", expected: "-1" },
    ],
    starter: {
      python: `nums = list(map(int, input().split()))
target = int(input())

def search(nums, target):
    # TODO: binary search in O(log n)
    return -1

print(search(nums, target))`,
      javascript: `const L = require('fs').readFileSync(0,'utf8').trim().split('\\n');
const nums = L[0].split(' ').map(Number);
const target = parseInt(L[1]);
function search(nums, target) { /* TODO */ return -1; }
console.log(search(nums, target));`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() { /* TODO */ }`,
      java: `public class Main { public static void main(String[] a) { /* TODO */ } }`,
    },
  },
];

// Piston API language IDs / versions
export const languageConfig = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  cpp: { language: "cpp", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" },
};
