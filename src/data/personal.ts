export const personal = {
  name: "Anam",
  fullName: "Sheik Anam Milfer",
  tagline: "I build things that matter — in code, in rooms, in people.",
  bio: `Software engineer by trade, hotelier by ambition, talent manager by instinct. I build across domains because the interesting problems live at the intersections.

In tech, I build full-stack applications — from AI-powered document automation to real-time collaborative tools. In hospitality, I run The Anam Hotel Colombo, a boutique hotel where every detail is intentional. In talent management, I help digital creators turn content into careers through HUGOZBOR.

The common thread is craft: understanding systems, caring about details, and building things that work beautifully.`,
  email: "anam@example.com",
  location: "Melbourne, Australia",
  availability: "Open to opportunities" as const,
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/AnamGTR99",
    linkedin: "https://linkedin.com/in/anam",
  },
};

export type Availability = "Open to opportunities" | "Currently building";
