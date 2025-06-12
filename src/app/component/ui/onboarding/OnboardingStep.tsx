"use client";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/component/ui/card";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { Textarea } from "@/app/component/ui/textarea";
import { Badge } from "@/app/component/ui/badge";
import { Progress } from "@/app/component/ui/progress";
import { Separator } from "@/app/component/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/app/component/ui/radio-group";
import { Checkbox } from "@/app/component/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  Github,
  User,
  Code,
  Briefcase,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Plus,
  X,
  ExternalLink,
  Zap,
  Target,
  Award,
  BookOpen,
  Users as UsersIcon,
  Mail,
  Settings,
  Send,
  Tag,
} from "lucide-react";
import { supabase } from "@/app/lib/supbase";
import { Button } from "@/app/component/ui/button";

// Utility function to generate proper UUIDs
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface ProfileData {
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  bio: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Vue.js", "Angular", "TypeScript", "CSS", "HTML"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Java", "Go", "PHP", "Ruby"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
  },
];

const assessmentQuestions = [
  {
    id: "experience",
    question:
      "How many years of professional development experience do you have?",
    type: "radio",
    options: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
  },
  {
    id: "collaboration",
    question: "How comfortable are you with collaborative coding?",
    type: "radio",
    options: [
      "Very comfortable",
      "Somewhat comfortable",
      "Need improvement",
      "Prefer solo work",
    ],
  },
  {
    id: "learning",
    question: "What's your preferred learning style?",
    type: "checkbox",
    options: [
      "Hands-on projects",
      "Video tutorials",
      "Documentation",
      "Pair programming",
      "Mentorship",
    ],
  },
];

const onboardingSteps = [
  {
    id: 1,
    title: "Profile Setup",
    description: "Tell us about yourself",
    icon: User,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Skill Tree",
    description: "Map your technical competencies",
    icon: Code,
    color: "text-green-500",
  },
  {
    id: 3,
    title: "Portfolio Showcase",
    description: "Add your best work samples",
    icon: Briefcase,
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Readiness Assessment",
    description: "Help us understand your preferences",
    icon: Target,
    color: "text-orange-500",
  },
  {
    id: 5,
    title: "Completion",
    description: "Review and finish setup",
    icon: Award,
    color: "text-blue-500",
  },
];

export default function DeveloperOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    bio: "",
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [assessmentAnswers, setAssessmentAnswers] = useState<
    Record<string, any>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const totalSteps = onboardingSteps.length;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        router.push("/login");
        return;
      }

      setUserId(session.user.id);
      setProfileData((prev) => ({
        ...prev,
        email: session.user.email || "",
      }));

      loadUserData(session.user.id);
    };

    checkSession();
  }, [router]);

  const loadUserData = async (userId: string) => {
    try {
      setIsLoading(true);

      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId);
      if (profileError) throw profileError;
      if (profileData && profileData.length > 0) {
        setProfileData(profileData[0]);
      }

      // Load skills
      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", userId);
      if (skillsError) throw skillsError;
      if (skillsData) {
        setSkills(skillsData);
      }

      // Load projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId);
      if (projectsError) throw projectsError;
      if (projectsData) {
        setProjects(projectsData);
      }

      // Load assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from("assessments")
        .select("*")
        .eq("user_id", userId);
      if (assessmentError) throw assessmentError;
      if (assessmentData && assessmentData.length > 0) {
        setAssessmentAnswers(assessmentData[0].answers || {});
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);

      // Save profile data
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: userId,
        ...profileData,
        updated_at: new Date().toISOString(),
      });
      if (profileError) throw profileError;

      // Save skills
      const { error: deleteSkillsError } = await supabase
        .from("skills")
        .delete()
        .eq("user_id", userId);
      if (deleteSkillsError) throw deleteSkillsError;

      if (skills.length > 0) {
        const skillsWithUserId = skills.map((skill) => ({
          ...skill,
          user_id: userId,
        }));

        const { error: skillsError } = await supabase
          .from("skills")
          .insert(skillsWithUserId);
        if (skillsError) throw skillsError;
      }

      // Save projects
      const { error: deleteProjectsError } = await supabase
        .from("projects")
        .delete()
        .eq("user_id", userId);
      if (deleteProjectsError) throw deleteProjectsError;

      if (projects.length > 0) {
        const projectsWithUserId = projects.map((project) => ({
          ...project,
          user_id: userId,
        }));

        const { error: projectsError } = await supabase
          .from("projects")
          .insert(projectsWithUserId);
        if (projectsError) throw projectsError;
      }

      // Save assessment answers
      const { error: assessmentError } = await supabase
        .from("assessments")
        .upsert({
          user_id: userId,
          answers: assessmentAnswers,
          updated_at: new Date().toISOString(),
        });
      if (assessmentError) throw assessmentError;
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const detectGitHubProfile = async (url: string) => {
    if (!url.includes("github.com")) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData = {
      name: "John Developer",
      bio: "Full-stack developer passionate about React and Node.js",
      suggestedSkills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    };

    setProfileData((prev) => ({
      ...prev,
      name: mockData.name,
      bio: mockData.bio,
    }));

    const newSkills = mockData.suggestedSkills.map((skillName) => ({
      id: generateUUID(),
      name: skillName,
      category:
        skillCategories.find((cat) => cat.skills.includes(skillName))?.name ||
        "Other",
      level: 3,
      maxLevel: 5,
    }));

    setSkills((prev) => [...prev, ...newSkills]);
    setIsLoading(false);
  };

  const addSkill = (skillName: string, category: string) => {
    const newSkill: Skill = {
      id: generateUUID(),
      name: skillName,
      category,
      level: 1,
      maxLevel: 5,
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  const updateSkillLevel = (skillId: string, level: number) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === skillId ? { ...skill, level } : skill))
    );
  };

  const removeSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const addProject = () => {
    const newProject: Project = {
      id: generateUUID(),
      title: "",
      description: "",
      url: "",
      technologies: [],
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (
    projectId: string,
    field: keyof Project,
    value: any
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const calculateReadinessScore = () => {
    let score = 0;

    if (profileData.name && profileData.email && profileData.bio) score += 20;
    score += Math.min(skills.length * 5, 30);
    score += Math.min(projects.length * 12.5, 25);
    score += Object.keys(assessmentAnswers).length * 8.33;

    return Math.round(score);
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      await saveData();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    await saveData();
    router.push("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 ">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold">Profile Setup</h2>
              <p className="text-muted-foreground">
                Let's start with your basic information
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <div className="flex gap-2">
                  <Input
                    id="github"
                    value={profileData.githubUrl}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        githubUrl: e.target.value,
                      }))
                    }
                    placeholder="https://github.com/username"
                  />
                  <Button
                    variant="outline"
                    onClick={() => detectGitHubProfile(profileData.githubUrl)}
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4" />
                    {isLoading ? "Detecting..." : "Auto-fill"}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={profileData.linkedinUrl}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      linkedinUrl: e.target.value,
                    }))
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Code className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold">Skill Tree</h2>
              <p className="text-muted-foreground">
                Map your technical competencies
              </p>
            </div>

            <div className="space-y-6">
              {skillCategories.map((category) => (
                <Card key={category.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.skills.map((skillName) => (
                        <Button
                          key={skillName}
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skillName, category.name)}
                          disabled={skills.some((s) => s.name === skillName)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skillName}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {skills
                        .filter((skill) => skill.category === category.name)
                        .map((skill) => (
                          <div
                            key={skill.id}
                            className="flex items-center gap-3 p-3 border rounded-lg"
                          >
                            <span className="font-medium min-w-0 flex-1">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                  key={level}
                                  onClick={() =>
                                    updateSkillLevel(skill.id, level)
                                  }
                                  className={`p-1 ${
                                    level <= skill.level
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                >
                                  <Star className="h-4 w-4 fill-current" />
                                </button>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold">Portfolio Showcase</h2>
              <p className="text-muted-foreground">
                Add your best work samples and projects
              </p>
            </div>

            <div className="space-y-4">
              <Button onClick={addProject} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>

              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-4">
                          <Input
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) =>
                              updateProject(project.id, "title", e.target.value)
                            }
                          />
                          <Textarea
                            placeholder="Project Description"
                            value={project.description}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "description",
                                e.target.value
                              )
                            }
                            rows={3}
                          />
                          <Input
                            placeholder="Project URL (GitHub, Live Demo, etc.)"
                            value={project.url}
                            onChange={(e) =>
                              updateProject(project.id, "url", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Technologies used (comma separated)"
                            value={project.technologies.join(", ")}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "technologies",
                                e.target.value.split(", ").filter(Boolean)
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {project.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold">Readiness Assessment</h2>
              <p className="text-muted-foreground">
                Help us understand your learning preferences
              </p>
            </div>

            <div className="space-y-6">
              {assessmentQuestions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-4">{question.question}</h3>

                    {question.type === "radio" && (
                      <RadioGroup
                        value={assessmentAnswers[question.id] || ""}
                        onValueChange={(value) =>
                          setAssessmentAnswers((prev) => ({
                            ...prev,
                            [question.id]: value,
                          }))
                        }
                      >
                        {question.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${question.id}-${option}`}
                            />
                            <Label htmlFor={`${question.id}-${option}`}>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === "checkbox" && (
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${question.id}-${option}`}
                              checked={(
                                assessmentAnswers[question.id] || []
                              ).includes(option)}
                              onCheckedChange={(checked) => {
                                const current =
                                  assessmentAnswers[question.id] || [];
                                const updated = checked
                                  ? [...current, option]
                                  : current.filter(
                                      (item: string) => item !== option
                                    );
                                setAssessmentAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: updated,
                                }));
                              }}
                            />
                            <Label htmlFor={`${question.id}-${option}`}>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        const readinessScore = calculateReadinessScore();
        const isReady = readinessScore >= 70;

        return (
          <div className="space-y-6">
            <div className="text-center">
              <Award className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold">Setup Complete!</h2>
              <p className="text-muted-foreground">
                Here's your readiness assessment
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">
                    {readinessScore}%
                  </div>
                  <div className="text-lg font-medium">Readiness Score</div>
                  <Progress value={readinessScore} className="w-full" />

                  <div
                    className={`p-4 rounded-lg ${
                      isReady
                        ? "bg-green-50 text-green-800"
                        : "bg-yellow-50 text-yellow-800"
                    }`}
                  >
                    {isReady ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Ready for Pod Participation!
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="h-5 w-5" />
                        <span className="font-medium">
                          Almost there! Complete your profile for better
                          matching.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span
                        className={
                          profileData.name ? "text-green-600" : "text-red-600"
                        }
                      >
                        {profileData.name ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span
                        className={
                          profileData.email ? "text-green-600" : "text-red-600"
                        }
                      >
                        {profileData.email ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bio:</span>
                      <span
                        className={
                          profileData.bio ? "text-green-600" : "text-red-600"
                        }
                      >
                        {profileData.bio ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Skills & Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className="font-medium">{skills.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-medium">{projects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assessment:</span>
                      <span className="font-medium">
                        {Object.keys(assessmentAnswers).length}/3
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                disabled={!isReady}
                onClick={handleComplete}
              >
                <UsersIcon className="h-4 w-4 mr-2" />
                Join Learning Pod
              </Button>
              <Button variant="outline" className="flex-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Resources
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-8">
            <Card className="z-10">
              <CardHeader>
                <CardTitle className="text-xl">Developer Onboarding</CardTitle>
                <CardDescription>
                  Step {currentStep} of {totalSteps}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex gap-4 items-start p-3 rounded-lg cursor-pointer transition-colors ${
                        currentStep === step.id
                          ? "bg-blue-50 border border-blue-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          currentStep === step.id
                            ? "bg-blue-100 text-blue-600"
                            : currentStep > step.id
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className={`h-5 w-5 ${step.color}`} />
                        )}
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            currentStep === step.id
                              ? "text-blue-600"
                              : currentStep > step.id
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {onboardingSteps[currentStep - 1]?.title}
                  </CardTitle>
                  <CardDescription>
                    {onboardingSteps[currentStep - 1]?.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Progress
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>

            <CardContent>{renderStepContent()}</CardContent>

            <Separator />

            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                >
                  {currentStep === totalSteps ? "Complete" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
