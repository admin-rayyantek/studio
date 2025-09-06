import { config } from 'dotenv';
config();

import '@/ai/flows/predict-meal-orders.ts';
import '@/ai/flows/suggest-popular-meals.ts';
import '@/ai/flows/recommend-meals-to-students.ts';