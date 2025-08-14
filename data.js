
// Approx calories per 100g (or typical unit) for common Indian vegetarian foods.
// NOTE: Values are approximate; users can override amounts when logging.
const FOODS = [
  { name: 'Cooked White Rice', unit: '100 g', kcal: 130, protein: 2.4, carbs: 28, fat: 0.3 },
  { name: 'Roti (Wheat Chapati)', unit: '1 piece (40 g)', kcal: 120, protein: 3.0, carbs: 18, fat: 3.5 },
  { name: 'Dal (Lentil Curry)', unit: '100 g', kcal: 110, protein: 6.0, carbs: 16, fat: 2.0 },
  { name: 'Chickpeas (Boiled)', unit: '100 g', kcal: 164, protein: 9.0, carbs: 27, fat: 2.6 },
  { name: 'Rajma (Kidney Beans, cooked)', unit: '100 g', kcal: 127, protein: 8.7, carbs: 22, fat: 0.5 },
  { name: 'Paneer (Cottage Cheese)', unit: '100 g', kcal: 265, protein: 18.0, carbs: 6.0, fat: 20.0 },
  { name: 'Tofu (Firm)', unit: '100 g', kcal: 76, protein: 8.0, carbs: 2.0, fat: 4.8 },
  { name: 'Milk (Toned)', unit: '100 ml', kcal: 60, protein: 3.1, carbs: 4.8, fat: 3.3 },
  { name: 'Curd (Dahi)', unit: '100 g', kcal: 61, protein: 3.4, carbs: 4.7, fat: 3.3 },
  { name: 'Ghee', unit: '1 tsp (5 g)', kcal: 45, protein: 0, carbs: 0, fat: 5 },
  { name: 'Olive Oil', unit: '1 tsp (5 g)', kcal: 40, protein: 0, carbs: 0, fat: 4.5 },
  { name: 'Oats (Dry)', unit: '40 g', kcal: 150, protein: 5.0, carbs: 27, fat: 3.0 },
  { name: 'Banana (Medium)', unit: '1 piece (~118 g)', kcal: 105, protein: 1.3, carbs: 27, fat: 0.3 },
  { name: 'Apple (Medium)', unit: '1 piece (~182 g)', kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Mango (Medium slice 100 g)', unit: '100 g', kcal: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: 'Potato (Boiled)', unit: '100 g', kcal: 87, protein: 1.9, carbs: 20, fat: 0.1 },
  { name: 'Peanuts (Roasted, unsalted)', unit: '28 g (handful)', kcal: 166, protein: 7.0, carbs: 6.0, fat: 14.0 },
  { name: 'Almonds', unit: '28 g (23 nuts)', kcal: 164, protein: 6.0, carbs: 6.0, fat: 14.0 },
  { name: 'Idli', unit: '1 piece (~50 g)', kcal: 58, protein: 2.0, carbs: 12, fat: 0.4 },
  { name: 'Dosa (Plain)', unit: '1 piece (~80 g)', kcal: 168, protein: 3.0, carbs: 30, fat: 3.7 },
  { name: 'Sambar', unit: '100 g', kcal: 50, protein: 2.6, carbs: 7.0, fat: 1.2 },
  { name: 'Poha', unit: '100 g', kcal: 130, protein: 2.7, carbs: 25, fat: 2.5 },
  { name: 'Upma', unit: '100 g', kcal: 155, protein: 4.0, carbs: 25, fat: 4.5 },
  { name: 'Soybean (Boiled)', unit: '100 g', kcal: 173, protein: 16.6, carbs: 9.9, fat: 9.0 },
  { name: 'Yogurt (Greek, plain)', unit: '100 g', kcal: 59, protein: 10.0, carbs: 3.6, fat: 0.4 },
  { name: 'Sugar', unit: '1 tsp (4 g)', kcal: 16, protein: 0, carbs: 4.0, fat: 0 },
  { name: 'Tea with Milk & Sugar', unit: '1 cup (150 ml)', kcal: 60, protein: 1.0, carbs: 9.0, fat: 2.0 },
  { name: 'Coffee with Milk', unit: '1 cup (150 ml)', kcal: 45, protein: 1.5, carbs: 4.0, fat: 1.5 },
  { name: 'Coconut Chutney', unit: '1 tbsp (15 g)', kcal: 45, protein: 0.5, carbs: 1.5, fat: 4.0 },
  { name: 'Chutney (Coriander/Mint)', unit: '1 tbsp (15 g)', kcal: 10, protein: 0.2, carbs: 1.5, fat: 0.2 }
];

// Exercise library with rough MET values and simple instructions.
const EXERCISES = [
  { name:'Push-Up', body:'Upper', goal:'Strength', met:8, equipment:'None', difficulty:'Medium',
    steps:'Start in a high plank. Lower chest until it nearly touches the floor. Keep elbows ~45°. Push back up.' },
  { name:'Squat', body:'Lower', goal:'Strength', met:5.5, equipment:'None', difficulty:'Easy',
    steps:'Feet shoulder-width. Sit back and down, chest up, knees tracking over toes. Drive through heels to stand.' },
  { name:'Lunge', body:'Lower', goal:'Strength', met:6, equipment:'None', difficulty:'Medium',
    steps:'Step forward, lower back knee toward floor. Front knee over ankle. Push back to start. Alternate legs.' },
  { name:'Burpee', body:'Full', goal:'HIIT', met:10, equipment:'None', difficulty:'Hard',
    steps:'Squat down, hands to floor, jump to plank, push-up optional, jump feet in, jump up explosively.' },
  { name:'Jumping Jacks', body:'Full', goal:'Cardio', met:8, equipment:'None', difficulty:'Easy',
    steps:'Jump feet wide while raising arms overhead; jump feet back together while lowering arms.' },
  { name:'Mountain Climbers', body:'Core', goal:'HIIT', met:8.5, equipment:'None', difficulty:'Medium',
    steps:'From plank, drive knees toward chest alternately, maintaining braced core.' },
  { name:'Plank', body:'Core', goal:'Stability', met:3.3, equipment:'None', difficulty:'Easy',
    steps:'Elbows under shoulders, body in straight line, squeeze glutes, hold without sagging.' },
  { name:'Crunch', body:'Core', goal:'Strength', met:5, equipment:'None', difficulty:'Easy',
    steps:'Lie on back, knees bent. Curl shoulders up toward knees, exhale and squeeze abs. Lower slowly.' },
  { name:'Bicycle Crunch', body:'Core', goal:'Strength', met:7, equipment:'None', difficulty:'Medium',
    steps:'Hands by ears. Alternate elbow to opposite knee with a gentle twist, legs cycling in the air.' },
  { name:'Glute Bridge', body:'Lower', goal:'Strength', met:4, equipment:'None', difficulty:'Easy',
    steps:'Lie on back, knees bent. Drive hips up by squeezing glutes; avoid arching lower back.' },
  { name:'Skipping Rope', body:'Full', goal:'Cardio', met:12.3, equipment:'Rope', difficulty:'Medium',
    steps:'Turn rope from wrists, jump just high enough to clear. Land softly.' },
  { name:'Sun Salutation (Yoga)', body:'Full', goal:'Mobility', met:3.3, equipment:'Mat', difficulty:'Easy',
    steps:'Flow through poses: mountain, forward fold, plank, cobra, downward dog, return to stand.' }
];

