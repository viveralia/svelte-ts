export interface Project {
  id: number;
  name: string;
  description: string;
  category: "design" | "marketing" | "programming";
  budget: number;
  dueDate: string;
}
