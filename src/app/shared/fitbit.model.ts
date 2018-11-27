interface IFitbitResponse{
    activities: IActivities[];
    goals: IGoals;
    summary: ISummary;
}
interface IActivities{
    activityId: number;
    activityParentId: number;
    calories: number;
    description: string;
    distance: number;
    duration: number;
    hasStartTime: boolean;
    isFavorite: boolean;
    logId: number;
    name: string;
    startTime: string;
    steps: number;
}
interface IGoals{
    activeMinutes: number;
    caloriesOut: number;
    distance: number;
    floors: number;
    steps: number;
}
interface ISummary{
    activeScore: number;
    activityCalories: number;
    caloriesBMR: number;
    caloriesOut: number;
    distances: IDistances[];
    elevation: number;
    fairlyActiveMinutes: number;
    floors: number;
    heartRateZones: IHeartRateZones[];
    lightlyActiveMinutes: number;
    marginalCalories: number;
    restingHeartRate: number;
    sedentaryMinutes: number;
    steps: number;
    veryActiveMinutes: number;
}
interface IDistances{
    activity: string;
    distance: number;
}
interface IHeartRateZones{
    caloriesOut: number;
    max: number;
    min: number;
    name: string;
}