export interface IActivity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}
