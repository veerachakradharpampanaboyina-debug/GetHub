
'use server';
/**
 * @fileOverview Generates a practice exam with a specified number of unique questions.
 *
 * - generatePracticeExam - A function that generates a practice exam.
 * - GeneratePracticeExamInput - The input type for the generatePracticeExam function.
 * - GeneratePracticeExamOutput - The return type for the generatePracticeexam function.
 */

import {ai} from '@/ai/genkit';
import { GeneratedQuestionSchema } from '@/lib/types';
import {z} from 'genkit';


const GeneratePracticeExamInputSchema = z.object({
  examTopic: z.string().describe('The topic of the exam (e.g., "UPSC Civil Services").'),
  numQuestions: z.number().min(1).max(50).describe('The number of questions to generate.'),
  seenQuestions: z.array(z.string()).optional().describe('A list of question texts that the user has already seen and should not be repeated.'),
});
export type GeneratePracticeExamInput = z.infer<typeof GeneratePracticeExamInputSchema>;

const GeneratePracticeExamOutputSchema = z.object({
  questions: z.array(GeneratedQuestionSchema).describe('An array of generated, unique exam questions.'),
});
export type GeneratePracticeExamOutput = z.infer<typeof GeneratePracticeExamOutputSchema>;

export async function generatePracticeExam(input: GeneratePracticeExamInput): Promise<GeneratePracticeExamOutput> {
  return generatePracticeExamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeExamPrompt',
  input: {schema: GeneratePracticeExamInputSchema},
  output: {schema: GeneratePracticeExamOutputSchema},
  prompt: `You are an expert question creator for competitive exams in India. You have deep knowledge of the syllabus and question patterns for various exams like UPSC, SSC, GATE, NEET, etc.

  Your task is to generate a set of {{numQuestions}} unique, non-repeating questions for a practice exam on the topic of "{{examTopic}}".

  The questions MUST be a balanced mix of the following types:
  - At least 40% should be "multipleChoice" questions (with exactly 4 options each).
  - At least 30% should be "trueFalse" questions (no options, answer is either "True" or "False").
  - At least 30% should be "freeText" questions (open-ended, no options, require a written answer).
  If the number of questions does not divide evenly, round up for multipleChoice, then trueFalse, then freeText.
  - Base the questions on the official syllabus and past question patterns for the "{{examTopic}}".
  - For "multipleChoice" questions, provide exactly 4 options.
  - For "trueFalse" questions, do not provide options.
  - For "freeText" questions, do not provide options.
  - Ensure the "correctAnswer" is one of the provided options for multiple choice questions, or "True"/"False" for trueFalse, or a model answer for freeText.
  - Assign pointsPossible for each question, for example 10 points for objective and 20 for free text.
  - Ensure every question has a unique questionId, like "q1", "q2", etc.

  {{#if seenQuestions}}
  Most importantly, DO NOT repeat any of the following questions that the user has already seen:
  {{#each seenQuestions}}
  - "{{this}}"
  {{/each}}
  {{/if}}

  Generate the questions now. Ensure the required mix of question types is present in the output.
  `,
});

const generatePracticeExamFlow = ai.defineFlow(
  {
    name: 'generatePracticeExamFlow',
    inputSchema: GeneratePracticeExamInputSchema,
    outputSchema: GeneratePracticeExamOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
