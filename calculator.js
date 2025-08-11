// Metric: kg, cm. Imperial: lbs, ft+in
export function kg_from_lbs(lbs){return lbs*0.45359237;}
export function cm_from_ft_in(ft,inches){return (ft*30.48)+(inches*2.54);}
export function mifflin_sejor(weightKg, heightCm, age, sex){ // sex: 'male'|'female'
  const s = (sex==='male')?5:-161;
  return Math.round((10*weightKg)+(6.25*heightCm)-(5*age)+s);
}
export function tdee(bmr, activity){ // activity: sedentary/light/moderate/active
  const map = {sedentary:1.2, light:1.375, moderate:1.55, active:1.725};
  return Math.round(bmr * (map[activity]||1.2));
}
export function calories_for_goal(tdee, goalType, kgPerWeek){ // goalType: maintain, lose, gain
  if(goalType==='maintain') return tdee;
  // 1 kg fat ~ 7700 kcal. For weight change per week:
  const change = Math.round((kgPerWeek*7700)/7); // daily deficit/surplus
  return (goalType==='lose')? tdee - change : tdee + change;
}
export function macros_from_cal(calories, proteinPerc=0.25, carbPerc=0.50, fatPerc=0.25){
  const proteinCals = calories * proteinPerc;
  const carbCals = calories * carbPerc;
  const fatCals = calories * fatPerc;
  return {
    protein_g: Math.round(proteinCals/4),
    carbs_g: Math.round(carbCals/4),
    fats_g: Math.round(fatCals/9)
  };
}
