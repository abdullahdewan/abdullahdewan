export interface SkillItem {
  name: string;
  icon: string;
  category: string;
  description: string;
  url: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  skills: SkillItem[];
}
