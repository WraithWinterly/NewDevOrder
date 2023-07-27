import * as fs from 'fs';
import * as path from 'path';

/**
 * Function to find all .tsx files in the specified directory and its subdirectories.
 * @param directory - The directory to search for .tsx files.
 * @returns An array of strings representing the paths to the found .tsx files.
 */
function findTsxFiles(directory: string): string[] {
  const files: string[] = [];

  /**
   * Recursive function to traverse the directory and its subdirectories,
   * and add the paths of .tsx files to the 'files' array.
   * @param dir - The directory to traverse.
   */
  function traverse(dir: string) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        traverse(fullPath);
      } else if (file.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
  }

  traverse(directory);
  return files;
}

// Set the output file name
const outputFilePath = 'combined_files.tsx';

// Specify the files to be combined
const filesToCombine = [
  'BountyList',
  'Home',
  'MyWallet',
  'Profile',
  'WelcomeSetupProfile',
];

// Find all specified files in the src directory and its subdirectories
const tsxFiles = findTsxFiles('src').filter(file =>
  filesToCombine.some(fileName => file.endsWith(`${fileName}.tsx`)),
);

// Combine all specified files into a single file with filename annotations
let outputFileContent = `/* Start of ${outputFilePath} */\n`;
tsxFiles.forEach(file => {
  outputFileContent += `/* Source file: ${file} */\n`;
  outputFileContent += fs.readFileSync(file, 'utf-8');
});
outputFileContent += `/* End of ${outputFilePath} */\n`;

// Write the combined content to the output file
fs.writeFileSync(outputFilePath, outputFileContent);

console.log(`Combined files: ${tsxFiles.join(', ')}`);
console.log(`Output file: ${outputFilePath}`);
